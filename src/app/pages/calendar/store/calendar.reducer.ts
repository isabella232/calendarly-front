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
    }

}