import { Schema, model, type InferSchemaType, Types } from 'mongoose';

interface IWorkspace {
  name: string;
  boards: Types.ObjectId[];
}

const workspaceSchema = new Schema<IWorkspace>({
  name: { type: String, required: true,  unique: true },
    boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }]
}, { timestamps: true } );

export const Workspace = model<IWorkspace>('Workspace', workspaceSchema)
