import * as CalendarActions from './calendar.actions';

export interface State {
    posts: any[];
    attachments: any[],
    currentStatus:any,
    currentPost:any,
    statuses:any[]
}

export var initialState: State = {
    posts: [],
    attachments: [],
    currentStatus:null,
    currentPost:null,
    statuses:[]
}

export function CalendarReducer(state = initialState, action: CalendarActions.CalendarActions) {

    switch (action.type) {
        case CalendarActions.CREATE_POST_SUCCESS:
            return { ...state, posts: [...state.posts, action.payload] };

        case CalendarActions.GET_POSTS_SUCCESS:
            return { ...state, posts:action.payload};

        case CalendarActions.SET_POSTS:
            return { ...state, posts: [...action.payload] };

        case CalendarActions.DELETE_POST:
            const id = action.payload
            var posts = state.posts.filter(o => o.id !== id)
            return { ...state, posts: posts };

        case CalendarActions.SET_STATUSES:
        return {
            ...state,statuses:action.payload
        }

        case CalendarActions.DRAG_POST_SUCCESS:
            var post = action.payload;
            var statuses=state.statuses.slice();
            var index;
            statuses.forEach((o,i)=>{
                o.data.forEach(d=>{
                    if(d.id===post.id)
                    {
                        index=i;
                    }     
                })
               
            })

            statuses[index]=post;
        
            return {
                ...state,statuses:statuses
            }
        default:
            return { ...state }
    }

}