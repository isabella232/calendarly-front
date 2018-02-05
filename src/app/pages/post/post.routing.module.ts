import { PostViewComponent } from './post-view/post-view.component';
import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';



@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: ':id',
                component: PostViewComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class PostRoutingModule {
}