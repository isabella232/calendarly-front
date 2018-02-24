import * as CalendarActions from './calendar.actions';

export interface State {
    posts: any[];
    attachments:any[]
}

export var initialState: State = {
    posts: [],
    attachments:[]
}

export function CalendarReducer(state = initialState, action: CalendarActions.CalendarActions) {

    switch (action.type) {
        case CalendarActions.CREATE_POST:
            return { ...state, posts: [...state.posts, action.payload] };

        case CalendarActions.ADD_POSTS_TO_STORE:
            return { ...state, posts: [...action.payload] };

        case CalendarActions.DELETE_POST:
        const id=action.payload
        var posts=state.posts.filter(o=>o.id!==id)
            return { ...state, posts: posts };

        case CalendarActions.DRAG_POST:
        var data=action.payload;
        var posts=state.posts.slice();
        posts.forEach(o=>{
            if(o.id===data.id)
            {
               o.status=data.status; 
               o.status_extra_info=data.status_extra_info
            }
        })

        return {
            ...state,posts:posts
        }
        default:
        return {...state}
    }

}