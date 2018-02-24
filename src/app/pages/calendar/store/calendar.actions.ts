import { Action } from '@ngrx/store';
export const ADD_POSTS_TO_STORE = 'ADD_POSTS_TO_STORE';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST='DELETE_POST'
export const DRAG_POST='DRAG_POST'

export class AddPostsToStore implements Action {
    readonly type = ADD_POSTS_TO_STORE;
    constructor(public payload) { }
}

export class CreatePost implements Action {
    readonly type = CREATE_POST;
    constructor(public payload) { }
}

export class DeletePost implements Action {
    readonly type = DELETE_POST;
    constructor(public payload) { }
}

export class DragPost implements Action {
    readonly type = DRAG_POST;
    constructor(public payload) { }
}

export type CalendarActions = AddPostsToStore | CreatePost | DeletePost | DragPost;