import { Action } from "@ngrx/store";

export const AUTHENTICATE_USER='AUTHENTICATE_USER';
export const SIGN_OUT_USER='SIGN_OUT';
export const FORGOT_PASSWORD='FORGOT_PASSWORD';
export const USER_UPDATED='USER_UPDATED';
export const SET_TOKEN='SET_TOKEN';

export class AuthenticateUser implements Action
{
    readonly type=AUTHENTICATE_USER;
    constructor(public payload){}
}

export class SignOutUser implements Action
{
    readonly type=SIGN_OUT_USER;
    constructor(public payload){}
}

export class ForgotPassword implements Action
{
    readonly type=FORGOT_PASSWORD;
    constructor(public payload){}
}

export class UserUpdated implements Action
{
    readonly type=USER_UPDATED;
    constructor(public payload){}
}

export class SetToken implements Action
{
    readonly type=SET_TOKEN;
    constructor(public payload){}
}


export type MainActions = AuthenticateUser | SignOutUser | ForgotPassword
| UserUpdated | SetToken
;