// import { Workspace } from "../models/workspace.js";
import { title } from "node:process";
import { Board } from "../models/board.js";
import { Workspace } from "../models/workspace.js";
import { type Request, type Response } from "express";
import mongoose, {type HydratedDocument, Types} from "mongoose";
import type { IBoard, IBoardDTO, IBoardDetails } from "../util/ProjMGRTypes.js";
import Logger from "../util/logger.js";

// interface IBoard {
//   title: string;
//   workspaceId: Types.ObjectId;
//   lists: Types.ObjectId[];
// }

// interface IListTask {
//   title: string;
//   id: Types.ObjectId;
//   dueDate: Date
// }


// interface IBoardList {
//   title: string;
//   id: Types.ObjectId;
//   tasks: IListTask[];
// }


// interface IBoardDetais {
//   title: string;
//   workspaceId: Types.ObjectId;
//   lists: IBoardList[];
// }


// interface IProjMgrDBError {
//     statusCode: number;
//     message:string;
// }


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

        const board = new Board({title:title, workspaceId: new Types.ObjectId(workspaceId)});
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

export const getBoardDetailsByBoardId = async (req: Request, res:Response) => {

    const {id} = req.params;
    const boardObjId = new Types.ObjectId(id as string);
    Logger.info(`GET /board/${id} accessed.`)
    try {
        const result = await getBoardDetails(boardObjId)
        if(result.boardDTO) {
            res.status(result.statusCode).json({message: result.message, boards: result.boardDTO})
        } else {
            res.status(result.statusCode).json({message: result.message})
        }
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


export const  getBoardsByWspIdResult = async (workspaceId:Types.ObjectId) => {
    
    try {
        // const boards = await Board.find({workspaceId: workspaceId}).populate({
        //     path:'lists',
        //     populate: "tasks"
        // })
        // .exec();

        const boards = await Board.find({workspaceId: workspaceId})

        return {boards,statusCode:201, message:"bords for workspace " + workspaceId + " retrieved successfully" }

    }  catch(err: any) {
        
        return {statusCode:400, message:err.message}
    }
}

export const  getBoardDetails = async (boardId:Types.ObjectId) => {
    
    try {
       

        const board : IBoardDetails | null = await Board.findOne({_id: boardId}).populate({
            path:'lists',
            options: {sort: {position:1}},
            populate: {
                path:"tasks",
                model: "Task",
                options: {sort: {position:1}}
            }
        }).lean<IBoardDetails>()

        // console.log("found board details: ", board)


        const boardDTO: IBoardDTO | null = board ? {
            id: board._id.toString(),
            title: board.title,
            workspaceId: board.workspaceId.toString(),
            lists:board.lists.map((list) => ({
                id: list._id.toString(),
                title:list.title,
                tasks:list.tasks.map((task) => ({
                    id:task._id.toString(),
                    title: task.title,
                    dueDate: task.dueDate?.toUTCString()
                }))
            }))
        } : null;

        return {boardDTO,statusCode:201, message:"details of board id " + boardId + " retrieved successfully" }

    }  catch(err: any) {
        
        return {statusCode:400, message:err.message}
    }
}