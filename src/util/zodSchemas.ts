import { z } from 'zod';
import mongoose from 'mongoose';
import { List } from '../models/list.js';
import { Workspace } from '../models/workspace.js';
import { Board } from '../models/board.js';


export const newTaskRequestSchema = z.object({
 
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

export const getWorkspaceBoardsSchema = z.object({
  query:z.object({

    workspaceId:z.string().refine( async (val) => {
          if(mongoose.Types.ObjectId.isValid(val)) {
              const isWorkspaceFound = await Workspace.exists({_id:val})
              return isWorkspaceFound;
          }
  
          return false
      }, {message: "Invalid workspace id"}),
  })
})

export const getBoardDetailsSchema = z.object({
  params:z.object({

    id:z.string().refine( async (val) => {
          if(mongoose.Types.ObjectId.isValid(val)) {
              const isBoardExists = await Board.exists({_id:val})
              return isBoardExists;
          }
  
          return false
      }, {message: "Invalid board id"}),
  })
})