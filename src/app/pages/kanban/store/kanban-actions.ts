import { Action } from '@ngrx/store';
export const ADD_POST='ADD_POST';
export const DELETE_POST='DELETE_POST';
export const DRAG_POST='DRAG_POST';
export const DRAG_POST_SUCCESS='DRAG_POST_SUCCESS';
export const SET_CURRENT_POST='SET_CURRENT_POST';
export const SET_CURRENT_STATUS='SET_CURRENT_STATUS';

export class AddPost implements Action
{
readonly type=ADD_POST;
constructor(public payload){}
}

export class DeletePost implements Action
{
    constructor(public payload){}
    readonly type=DELETE_POST;
}

export class DragPost implements Action
{
readonly type=DRAG_POST;
constructor(public payload){}
}

export class DragPostSuccess implements Action
{
readonly type=DRAG_POST_SUCCESS;
constructor(public payload){}
}

export class SetCurrentPost implements Action
{
readonly type=SET_CURRENT_POST;
constructor(public payload){}
}

export class SetCurrentStatus implements Action
{
readonly type=SET_CURRENT_STATUS;
constructor(public payload){}
}

export type KanbanActions=AddPost | DeletePost | DragPost | DragPostSuccess | SetCurrentPost | SetCurrentStatus;