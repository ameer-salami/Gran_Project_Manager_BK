
import { Schema, model, type InferSchemaType, Types } from 'mongoose';

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
