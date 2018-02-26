import { CalendarResolveGuard } from './calendar-resolve.guard';
import { AddUserComponent } from './../../components/add-user/add-user.component';
import { FormsModule } from '@angular/forms';
import { PostModule } from './../post/post.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CalendarService } from './calendar.service';
import { CalendarComponent } from './calendar.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';

const Calendar_ROUTES = [
    { path: '', component: CalendarComponent }
];

@NgModule ({
    declarations: [
        CalendarComponent,
        // AddUserComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(Calendar_ROUTES),
        ModalModule.forRoot(),
        PostModule,
        FormsModule,
        FlexLayoutModule
    ],
    providers:[CalendarService]
})

export class CalendarModule {  }