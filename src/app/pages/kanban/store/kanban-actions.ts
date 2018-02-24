import { Action } from '@ngrx/store';
export const ADD_POST='ADD_POST';
export const DELETE_POST='DELETE_POST';
export const DRAG_POST='DRAG_POST';

export class AddPost implements Action
{
readonly type=ADD_POST;
}

export class DeletePost implements Action
{
readonly type=DELETE_POST;
}

export class DragPost implements Action
{
readonly type=DRAG_POST;
}

export type KanbanActions=AddPost | DeletePost | DragPost;