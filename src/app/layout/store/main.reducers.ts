import * as MainActions from './main.actions';

export interface State
{
    appId:string;
    authHeader:string;
    appState:string;
    isAuthenticated:boolean;
    cypheredToken:string;
    auth_code:string;
    user:any;
}

export const initialState={
    appId:'c3887fac-fd46-11e7-b129-0a1830b7532a',
    authHeader:'Bearer',
    isAuthenticated:false,
    cypheredToken:null,
    auth_code:null,
    appState:'random-state',
    user:{}
}

export function MainReducers(state=initialState,action:MainActions.MainActions)
{

    switch(action.type)
    {
        case MainActions.AUTHENTICATE_USER:
        return {
            ...state,
            isAuthenticated:action.payload.isAuthenticated,
            user:action.payload.user
        }

        case MainActions.USER_UPDATED:
        return {
            ...state,
            user:action.payload
        }

        case MainActions.SET_TOKEN:
        window[this.container.storageStrategy].setItem('cypheredToken',action.payload);
        return {
            ...state,
            cypheredToken:action.payload
        }
    }

}