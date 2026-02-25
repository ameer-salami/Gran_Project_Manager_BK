// import  mongoose from 'mongoose';
import { Schema, model, type InferSchemaType, Types } from 'mongoose';

// 1. Create an interface for your document
interface IWorkspace {
  name: string;
  boards: Types.ObjectId[];
}

/*
 id          String       @id @default(cuid())
  name        String
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
 boards : [Board]

*/

const workspaceSchema = new Schema<IWorkspace>({
  name: { type: String, required: true,  unique: true },
    boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }]
}, { timestamps: true } );

export const Workspace = model<IWorkspace>('Workspace', workspaceSchema)
