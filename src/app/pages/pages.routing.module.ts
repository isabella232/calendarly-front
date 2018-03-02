import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Routes, RouterModule } from '@angular/router';


const PagesRoutes: Routes = [
    {
        path: '', 
        children: [
            {
                path: 'login', 
                component:LoginComponent
            },
            {
                path: 'signup', 
                component:SignupComponent
            },   
    ]
    }
];

@NgModule({
    imports: [
      RouterModule.forChild(PagesRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class PagesRoutingModule { }

