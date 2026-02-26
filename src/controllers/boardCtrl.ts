// import { Workspace } from "../models/workspace.js";
import { Board } from "../models/board.js";
import { Workspace } from "../models/workspace.js";
import { type Request, type Response } from "express";
import mongoose, {type HydratedDocument, Schema, Types} from "mongoose";

interface IBoard {
  title: string;
  workspaceId: Types.ObjectId;
  lists: Types.ObjectId[];
}

interface IProjMgrDBError {
    statusCode: number;
    message:string;
}


export const createBoard = async (req: Request, res:Response) => {
    const {title, } = req.body;
    const {workspaceId} = req.params as {workspaceId: string}

    try {

          if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
            return res.status(400).json({ message: "Invalid workspace id" });
         }

         if(typeof title !== "string") {
            res.status(500).json({result:"Invalid Input!"});
         }

        const board:HydratedDocument<IBoard> = new Board({title:title, workspaceId: workspaceId});
        const result = await board.save();

        const workspaceUpdResult = await addNewBoard(new Types.ObjectId(workspaceId), board._id)

        if(workspaceUpdResult.statusCode === 400) {
            throw new Error(workspaceUpdResult.message);
        }
        res.status(200).json(result);
    } catch(err: any) {
        res.status(400).json({ error: err.message})
    }
}

export const addNewBoard = async (workspaceId:Types.ObjectId, boardId:Types.ObjectId) => {
    // const {boardId} = req.body;

     try {
          if (!mongoose.Types.ObjectId.isValid(boardId.toString())) {
                const isBoardFound = await Board.exists({_id:boardId})
                const isWorkspaceFound = await Workspace.exists({_id:workspaceId})

                if(!(isBoardFound && isWorkspaceFound)) {

                    // return res.status(400).json({ message: "Invalid board id" });
                    return {statusCode:400, message:"Invalid workspace or board Id"}
                }
            }

            await Workspace.findByIdAndUpdate(workspaceId, {$addToSet:{boards:boardId}})
            return {statusCode:201, message:"workspace updated successfully"}
        
    } catch(err: any) {
        // res.status(400).json({ error: err.message})
        return {statusCode:400, message:err.message}
    }

}

export const getBoardsByWspId = async (req: Request, res:Response) => {
    const {workspaceId} = req.query;
    const workspaceIdObj = new Types.ObjectId(workspaceId as string);

    try {
        const result = await getBoardsByWspIdResult(workspaceIdObj)
        if(result.boards) {
            res.status(result.statusCode).json({message: result.message, boards: result.boards})
        } else {
            res.status(result.statusCode).json({message: result.message})
        }
    } catch(err: any) {
        res.status(400).json({ error: err.message})
    }
}

export const  getBoardsByWspIdResult = async (workspaceId:Types.ObjectId) => {
    
    try {
        const boards = await Board.find({workspaceId: workspaceId}).populate({
            path:'lists',
            populate: "tasks"
        })
        .exec();

        return {boards,statusCode:201, message:"bords for workspace " + workspaceId + " retrieved successfully" }

    }  catch(err: any) {
        
        return {statusCode:400, message:err.message}
    }
}