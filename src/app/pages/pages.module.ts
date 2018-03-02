import { CoreModule } from './../core/core.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PagesRoutingModule } from './pages.routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule ({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        PagesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot()
    ]
})

export class PagesModule {  }