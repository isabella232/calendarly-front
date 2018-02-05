import { PostModule } from './../post/post.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CalendarService } from './calendar.service';
import { CalendarComponent } from './calendar.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const Calendar_ROUTES = [
    { path: '', component: CalendarComponent }
];

@NgModule ({
    declarations: [
        CalendarComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(Calendar_ROUTES),
        ModalModule.forRoot(),
        PostModule
    ],
    providers:[CalendarService]
})

export class CalendarModule {  }