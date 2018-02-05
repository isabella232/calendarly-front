import { ProfileComponent } from './../pages/profile/profile.component';
// import { ProfileComponent } from './../shared/components/widgets/profile/profile.component';
import { PostViewComponent } from './../pages/post/post-view/post-view.component';
import { AuthGuard } from './../providers/auth.guard';
import { CalendarComponent } from './../pages/calendar/calendar.component';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const LAYOUT_ROUTES: Routes = [
    { path: '', component: LayoutComponent, 
    canActivate:[AuthGuard],children: [
        //Home
        { path: '', redirectTo: 'calendar', pathMatch: 'full' },
        { path: 'calendar', loadChildren: '../pages/calendar/calendar.module#CalendarModule' },
        {path:'profile',children:[
            {path:'',component:ProfileComponent}
        ]},
        {
            path:'post',
            children:[{
                path:':id',
                component:PostViewComponent
            }]
        }
        ]
            
        },
        {
            path:'pages',
            children:[        
            { path: 'login', loadChildren: '../pages/pages/login/login.module#LoginModule' },
            { path: 'signup', loadChildren: '../pages/pages/signup/signup.module#SignupModule' },]
        },
        

        // Sample Pages'
        // { path: 'sample-pages', loadChildren: '../pages/sample-pages/sample-pages.module#SamplePagesModule' }
        ];

export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);