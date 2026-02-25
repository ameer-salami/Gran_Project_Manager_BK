/*
   title       String
  description String?
  position    Int
  listId      String   -----> List
  assignees   TaskAssignee[] ---------        TODO
  comments    Comment[]      ---------        TODO
  attachments Attachment[]  ---------        TODO
  labels      TaskLabel[]   ---------         TODO
  dueDate     DateTime?
  createdById ----------> User  ------------         TODO
  activities  Activity[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

*/

// import  mongoose from 'mongoose';
import { Schema, model, type InferSchemaType, Types } from 'mongoose';

// 1. Create an interface for your document
interface ITask {
  title: string;
  description?: string;
  position: number;
  listId: Types.ObjectId;
  dueDate: Date;
  activities: Types.ObjectId[]
}

const TaskSchema = new Schema<ITask>({
    title: { type: String, required: true,  unique: true },
    description: {type: String, required: false},
    position: Number,
    listId: { type: Schema.Types.ObjectId, ref: 'List' },
    dueDate: Date,
    activities: [{type: Schema.Types.ObjectId, ref: 'Activity'}]
    
}, { timestamps: true } );

export const Task = model<ITask>('Task', TaskSchema)
