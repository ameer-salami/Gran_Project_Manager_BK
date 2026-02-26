
import { Schema, model, type InferSchemaType, Types } from 'mongoose';

// 1. Create an interface for your document
export interface IBoard {
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
