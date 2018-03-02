import * as KanbanActions from './kanban-actions';

export interface State
{
statuses:any[];
posts:any[],
curentPost:any,
currentStatus:any
}

export const initialState={
statuses:[],
posts:[]
}

export function KanbanReducers(state=initialState,action:KanbanActions.KanbanActions)
{
    switch(action.type)
    {
        case KanbanActions.DRAG_POST_SUCCESS:
        var post=action.payload;
        var index;
        var posts=state.posts.slice();
        posts.forEach((p,i)=>{
            if(p.id===post.id)
            {
                index=i;
            }
        })
        posts[index]=post;
    
        return {
            ...state,
            posts:posts,
            curentPost:post

        }

    }
}