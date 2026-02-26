import { Workspace } from "../models/workspace.js";

import { type Request, type Response } from "express";
import mongoose, {type HydratedDocument, Types} from "mongoose";

interface IWorkspace {
  name: string;
  boards: Types.ObjectId[];
}


export const createWorkspace = async (req: Request, res:Response) => {
    const {name} = req.body;

    try {
         if(typeof name !== "string" && name.length > 0) {
            res.status(500).json({result:"Invalid workspace Input!"});
        }

        const workspace:HydratedDocument<IWorkspace> = new Workspace({name:name});
        const result = await workspace.save();
        res.status(200).json(result);
        
    } catch(err: any) {
        res.status(400).json({ error: err.message})
    }
}

