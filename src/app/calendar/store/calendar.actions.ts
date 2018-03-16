import { Action } from '@ngrx/store';
export const ADD_POSTS_TO_STORE = 'ADD_POSTS_TO_STORE';

export const CREATE_POST = 'CREATE_POST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';

export const CREATE_TOPIC='CREATE_TOPIC';
export const CREATE_TOPIC_SUCCESS='CREATE_TOPIC_SUCCESS';

export const DELETE_POST_SUCCESS='DELETE_POST_SUCCESS'
export const DELETE_POST='DELETE_POST'

export const DRAG_POST='DRAG_POST'
export const GET_POSTS='GET_POSTS'
export const GET_POSTS_SUCCESS='GET_SUCCESS'
export const GET_POSTS_ERROR='GET_POSTS_ERROR'
export const DRAG_POST_SUCCESS='DRAG_POST_SUCCESS';
export const SET_CURRENT_POST='SET_CURRENT_POST'
export const SET_CURRENT_STATUS='SET_CURRENT_STATUS'
export const SET_STATUSES='SET_STATUSES';
export const SET_POSTS='SET_POSTS';

export class GetPosts implements Action {
    readonly type = GET_POSTS;
    // constructor(public payload) { }
}

export class GetPostsSuccess implements Action {
    readonly type = GET_POSTS_SUCCESS;
    constructor(public payload) { }
}


export class SetStatuses implements Action {
    readonly type = SET_STATUSES;
    constructor(public payload) { }
}

export class CreateTopic implements Action {
    readonly type = CREATE_TOPIC;
    constructor(public payload) { }
}

export class CreateTopicSuccess implements Action {
    readonly type = CREATE_TOPIC_SUCCESS;
    constructor(public payload) { }
}


export class GetPostsError implements Action {
    readonly type = GET_POSTS_ERROR;
    constructor(public payload) { }
}

export class SetPosts implements Action {
    readonly type = SET_POSTS;
    constructor(public payload) { }
}

export class CreatePost implements Action {
    readonly type = CREATE_POST;
    constructor(public payload) { }
}

export class CreatePostSuccess implements Action {
    readonly type = CREATE_POST_SUCCESS;
    constructor(public payload) { }
}

export class DeletePostSuccess implements Action {
    readonly type = DELETE_POST_SUCCESS;
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

export type CalendarActions = GetPosts | GetPostsSuccess | 
GetPostsError | SetPosts | CreatePost | CreatePostSuccess | 
DeletePost | DragPost | CreateTopic | 
CreateTopicSuccess | SetCurrentPost | SetCurrentStatus | 
DragPost | SetStatuses
 | DragPostSuccess | DeletePostSuccess