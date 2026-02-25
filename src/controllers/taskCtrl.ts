
import { Board } from "../models/board.js";
import { Workspace } from "../models/workspace.js";
import { List } from "../models/list.js";

import { type Request, type Response } from "express";
import mongoose, {type HydratedDocument, Schema, Types} from "mongoose";
import { Task } from "../models/task.js";

/*
 title: string;
  description?: string;
  position: number;
  listId: Types.ObjectId;
  dueDate: Date;
  activities: Types.ObjectId[]
  */
 
interface ITask {
     title: string;
     description?: string;
     position: number;
    listId: Types.ObjectId;
    dueDate: Date;
    activities: Types.ObjectId[];
}

interface IList {
  title: string;
  position: number;
  boardId: Types.ObjectId;
  tasks: Types.ObjectId[];
}


interface IProjMgrDBError {
    statusCode: number;
    message:string;
}


export const createTask = async (req: Request, res:Response) => {
    const {title, description="N/A", listId, dueDate} = req.body;

    try {


        const list:IList = await List.findById(listId) as IList

        const lastPos:number = list.tasks.length

        const task:HydratedDocument<ITask> = new Task({title:title, listId: listId, discription:description, position:lastPos, dueDate: dueDate});
        const result = await task.save();

        const listUpdResult = await addNewTask(new Types.ObjectId(listId), task._id)

        if(listUpdResult.statusCode === 400) {
            throw new Error(listUpdResult.message);
        }
        res.status(200).json(result);
    } catch(err: any) {
        res.status(400).json({ error: err.message})
    }
}

export const addNewTask = async (listId:Types.ObjectId, taskId:Types.ObjectId) => {

     try {
          if (!mongoose.Types.ObjectId.isValid(listId.toString())) {
                const isListFound = await List.exists({_id:listId})

                if(!isListFound) {

                    return {statusCode:400, message:"Invalid list Id"}
                }
            }

            await List.findByIdAndUpdate(listId, {$addToSet:{tasks:taskId}})
            return {statusCode:201, message:"list updated successfully"}
        
    } catch(err: any) {
        // res.status(400).json({ error: err.message})
        return {statusCode:400, message:err.message}
    }

}