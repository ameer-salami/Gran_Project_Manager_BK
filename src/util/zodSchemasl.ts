import { z } from 'zod';
import mongoose from 'mongoose';
// import { Workspace } from '../models/workspace.js';
import { List } from '../models/list.js';
// import { title } from 'node:process';

// Import your database client
// import { db } from './db'; 


/*
 title: string;
  description?: string;
  position: number;
  listId: Types.ObjectId;
  dueDate: Date;
  activities: Types.ObjectId[]
*/

export const newTaskRequestSchema = z.object({
  // params: z.object({
  //   workspaceId: z.string().refine( async (val) => {
  //       if(mongoose.Types.ObjectId.isValid(val)) {
  //           const isWorkspaceFound = await Workspace.exists({_id:val})
  //           return isWorkspaceFound;
  //       }
  //   }, {message: "Invalid workspace id"}),
  // }),
  body: z.object({
    title: z.string().min(3),
    description: z.string().min(1).optional(),
    listId:  z.string().refine( async (val) => {
        if(mongoose.Types.ObjectId.isValid(val)) {
            const isListFound = await List.exists({_id:val})
            return isListFound;
        }

        return false
    }, {message: "Invalid list id"}),
    dueDate: z.coerce.date().min(new Date(), {message: "Invalid due date : must be after today"}),
  }),
});