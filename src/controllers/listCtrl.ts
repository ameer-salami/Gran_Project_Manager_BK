
import { Board } from "../models/board.js";
import { Workspace } from "../models/workspace.js";
import { List } from "../models/list.js";

import { type Request, type Response } from "express";
import mongoose, {type HydratedDocument, Schema, Types} from "mongoose";

interface IList {
  title: string;
  position: number;
  boardId: Types.ObjectId;
  tasks: Types.ObjectId[];
}

interface IBoard {
  title: string;
  workspaceId: Types.ObjectId;
  lists: Types.ObjectId[];
}

interface IProjMgrDBError {
    statusCode: number;
    message:string;
}


export const createList = async (req: Request, res:Response) => {
    const {title, boardId} = req.body;
    const {workspaceId} = req.params as {workspaceId: string}

    try {

          if (!(mongoose.Types.ObjectId.isValid(workspaceId) && mongoose.Types.ObjectId.isValid(boardId))) {
            return res.status(400).json({ message: "Invalid workspace or board id" });
         }

         if(typeof title !== "string") {
            res.status(500).json({result:"Invalid title Input!"});
         }

        const board:IBoard = await Board.findById(boardId) as IBoard

        const lastPos:number = board.lists.length

        const list:HydratedDocument<IList> = new List({title:title, boardId: boardId, position:lastPos});
        const result = await list.save();

        const boardUpdResult = await addNewList(new Types.ObjectId(boardId), list._id)

        if(boardUpdResult.statusCode === 400) {
            throw new Error(boardUpdResult.message);
        }
        res.status(200).json(result);
    } catch(err: any) {
        res.status(400).json({ error: err.message})
    }
}

export const addNewList = async (boardId:Types.ObjectId, listId:Types.ObjectId) => {

     try {
          if (!mongoose.Types.ObjectId.isValid(boardId.toString())) {
                const isBoardFound = await Board.exists({_id:boardId})

                if(!isBoardFound) {

                    return {statusCode:400, message:"Invalid board Id"}
                }
            }

            await Board.findByIdAndUpdate(boardId, {$addToSet:{lists:listId}})
            return {statusCode:201, message:"board updated successfully"}
        
    } catch(err: any) {
        // res.status(400).json({ error: err.message})
        return {statusCode:400, message:err.message}
    }

}