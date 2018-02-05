import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from "./login.component";

const LOGIN_PAGES_ROUTES = [
    { path: '', component: LoginComponent }
];

@NgModule ({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(LOGIN_PAGES_ROUTES),
        FormsModule,
        ReactiveFormsModule
    ]
})

export class LoginModule {  }