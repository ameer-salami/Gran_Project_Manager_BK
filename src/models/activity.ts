/*
     actorId   String ----------> User  --------------  TODO
   taskId    String ------------->  Task
    boardId   String  -----------> Board
  type      String
  data      Json
  createdAt DateTime @default(now())


*/

// import  mongoose from 'mongoose';
import { Schema, model, type InferSchemaType, Types } from 'mongoose';

// 1. Create an interface for your document
interface IActivity {
  
  taskId: Types.ObjectId;
  boardId: Types.ObjectId;
  type: String;
  data: Record<string, any>;
}

const ActivitySchema = new Schema<IActivity>({
    
    type: { 
        type: String, 
        required: true, 
        enum: [
        'USER_REGISTERED','USER_LOGGED_IN','PASSWORD_CHANGED',
        'PROFILE_UPDATED',
        ] 
    },
    data: {type: Schema.Types.Mixed, default: {}},
    taskId: {type: Schema.Types.ObjectId, ref:"Task"},
    boardId: {type: Schema.Types.ObjectId, ref:"Board"},
}, { timestamps: true } );

export const Activity = model<IActivity>('Activity', ActivitySchema)
