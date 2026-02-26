
import { Schema, model, type InferSchemaType, Types } from 'mongoose';


interface IList {
  title: string;
  position: number;
  boardId: Types.ObjectId;
  tasks: Types.ObjectId[];
}

const listSchema = new Schema<IList>({
    title: { type: String, required: true,  unique: true },
    position: Number,
    boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
}, { timestamps: true });

export const List = model<IList>('List', listSchema)
