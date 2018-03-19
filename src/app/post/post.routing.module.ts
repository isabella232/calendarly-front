import { PostViewComponent } from './post-view/post-view.component';
import {NgModule}     from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostViewResolveGuard } from './post-view/post-view-resolve.guard';


export const PostRoutes:Routes=
    [
        {
            path: ':id',
            component: PostViewComponent,
            resolve:PostViewResolveGuard
        }
    ]
