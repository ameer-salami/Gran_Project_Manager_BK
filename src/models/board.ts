/*
 id           String     @id @default(cuid())
  title        String
  workspace    Workspace  @relation(fields: [workspaceId], references: [id])
  workspaceId  String
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  lists: [List]

  /workspaces/tasks
*/

// import  mongoose from 'mongoose';
import { Schema, model, type InferSchemaType, Types } from 'mongoose';

// 1. Create an interface for your document
interface IBoard {
  title: string;
  workspaceId: Types.ObjectId;
  lists: Types.ObjectId[];
}

const boardSchema = new Schema<IBoard>({
    title: { type: String, required: true,  unique: true },
    workspaceId: { type: Schema.Types.ObjectId, ref: 'Workspace' },
    lists: [{ type: Schema.Types.ObjectId, ref: 'List' }]
}, { timestamps: true });

export const Board = model<IBoard>('Board', boardSchema)
