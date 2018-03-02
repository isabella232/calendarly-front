import * as CalendarReducer from "../calendar/store/calendar.reducer";
import { ActionReducerMap } from "@ngrx/store";
import * as MainReducers from "../layout/store/main.reducers";

export interface AppState{
    calendar:CalendarReducer.State,
    main:MainReducers.State
}

export var AppReducers:ActionReducerMap<AppState>={
calendar:CalendarReducer.CalendarReducer,
main:MainReducers.MainReducers
}