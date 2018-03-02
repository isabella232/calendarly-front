import { LayoutResolveGuard } from './layout-resolve.guard';
import { KanbanResolveGuard } from './../kanban/kanban-resolve.guard';
import { CalendarResolveGuard } from './../calendar/calendar-resolve.guard';
import { ProfileComponent } from './../profile/profile.component';
import { PostViewComponent } from './../post/post-view/post-view.component';
import { AuthGuard } from './../providers/auth.guard';
import { CalendarComponent } from './../calendar/calendar.component';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const LAYOUT_ROUTES: Routes = [
    {
        path: '', component: LayoutComponent,
        canActivate: [AuthGuard], 
        resolve:{
            layout:LayoutResolveGuard
        },
        children: [

            { path: '', redirectTo: 'calendar', pathMatch: 'full' },
            {
                path: 'calendar', loadChildren: '../calendar/calendar.module#CalendarModule',
            },
            {
                path: 'kanban', loadChildren: '../kanban/kanban.module#KanbanModule'},
            {
                path: 'post',
                children: [{
                    path: ':id',
                    component: PostViewComponent
                }]
            }
        ]

    },
    {
        path: 'pages', loadChildren: '../pages/pages.module#PagesModule' 
    },
    {
        path: '**', redirectTo: 'calendar', pathMatch: 'full'
    }
];

export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);