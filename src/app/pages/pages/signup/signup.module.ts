import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SignupComponent } from "./signup.component";

const SIGNUP_PAGES_ROUTES = [
    { path: '', component: SignupComponent }
];

@NgModule ({
    declarations: [
        SignupComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(SIGNUP_PAGES_ROUTES),
        FormsModule,
        ReactiveFormsModule
    ]
})

export class SignupModule {  }