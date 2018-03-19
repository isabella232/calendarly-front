import { ActionReducerMap } from '@ngrx/store';
import * as CalendarActions from './calendar.actions';

// export interface FeatureState
// {
//     calendar:State
// }

export interface State {
    posts: any[];
    attachments: any[],
    currentStatus:any,
    currentPost:any,
    statuses:any[],
    comments:any[]
}

export var initialState: State = {
    posts: [],
    attachments: [],
    currentStatus:null,
    currentPost:null,
    statuses:[],
    comments:[]
}

export const reducer:ActionReducerMap<any>={
    calendar:CalendarReducer
}

export function CalendarReducer(state = initialState, action: CalendarActions.CalendarActions) {

    switch (action.type) {
        case CalendarActions.CREATE_POST_SUCCESS:
        var statuses=[...state.statuses];
        var post=action.payload;
        statuses.forEach(o=>{
          if(o.id===post.status)
          {
              o.data.push(post)
          }
      })
        return { ...state, posts: [...state.posts, post],statuses:statuses };

        case CalendarActions.GET_POSTS_SUCCESS:
            return { ...state, posts:action.payload};

        case CalendarActions.SET_POSTS:
            return { ...state, posts: [...action.payload] };

        case CalendarActions.DELETE_POST_SUCCESS:
            const id = action.payload
            var posts = [...state.posts];
            var statuses=[...state.statuses];

            posts.forEach((p,i)=>{
                if(p.id===id)
                {
                    posts.splice(i,1)
                }
            })

            statuses.forEach((s)=>{
              s.data.forEach((p,i)=>{
                  if(p.id===id)
                  {
                      s.data.splice(i,1)
                  }
              })
            })
            return { ...state, posts: posts ,statuses:statuses};

        case CalendarActions.SET_STATUSES:
        return {
            ...state,statuses:action.payload
        }

        case CalendarActions.ADD_COMMENT:
        return {
            ...state,
            comments:[...state.comments,action.payload]
        }

        case CalendarActions.DELETE_COMMENT:
        var comments=[...state.comments];
        comments.splice(action.payload,1);
        return {
            ...state,
            comments:comments
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

            case CalendarActions.ADD_COMMENT_SUCCESS:

            return {
                ...state,
                comments:[...state.comments,action.payload]
            }


        default:
            return { ...state }
    }

}