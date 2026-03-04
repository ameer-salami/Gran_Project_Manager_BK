/*
{
workspaceId: 1,
boardId: 1,
title: "new theme",
lists:
 [
    {
      id: 'list-1',
      title: 'To Do',
      tasks: [
        { id: 'task-1', content: 'Task 1' },
        { id: 'task-2', content: 'Task 2' }
      ]
    },
    {
      id: 'list-2',
      title: 'In Progress',
      tasks: [
        { id: 'task-3', content: 'Task 3' }
      ]
    },
]
}


*/

import Types from 'mongoose'

export interface IBoard {
  _id: Types.ObjectId;
  title: string;
  workspaceId: Types.ObjectId;
  lists: Types.ObjectId[];
}


export interface IListTask {
  title: string;
  _id: Types.ObjectId;
  position?: number;
  dueDate: Date;
}


export interface IBoardList {
  title: string;
  _id: Types.ObjectId;
  position?: number;
  tasks: IListTask[];
}


export interface IBoardDetails {
  _id:Types.ObjectId;
  title: string;
  workspaceId: Types.ObjectId;
  lists: IBoardList[];
}


export interface IProjMgrDBError {
    statusCode: number;
    message:string;
}


export interface IBoardDTO {
    id:string;
    workspaceId:string;
    title:string;
    lists: {
        id:string;
        title:string;
        tasks: {
            id:string;
            title: string;
            dueDate: string;
        }[]
    }[]

}