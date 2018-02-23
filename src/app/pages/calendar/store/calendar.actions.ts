import { Action } from '@ngrx/store';
export const ADD_POSTS_TO_STORE = 'ADD_POSTS_TO_STORE';
export const CREATE_POST = 'CREATE_POST';

export class AddPostsToStore implements Action {
    readonly type = ADD_POSTS_TO_STORE;
    constructor(public payload) { }
}

export class CreatePost implements Action {
    readonly type = CREATE_POST;
    constructor(public payload) { }
}

export type CalendarActions = AddPostsToStore | CreatePost;