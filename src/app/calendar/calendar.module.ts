import { FullcalendarComponent } from './fullcalendar/fullcalendar.component';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from './../core/core.module';
import { CalendarResolveGuard } from './calendar-resolve.guard';
import { CalendarRoutes, CalendarRoutingModule } from './calendar.routing.module';
import { FormsModule } from '@angular/forms';
import { PostModule } from './../post/post.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CalendarService } from './calendar.service';
import { CalendarComponent } from './calendar.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { reducer } from './store/calendar.reducer';


@NgModule ({
    declarations: [
        CalendarComponent,
        FullcalendarComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        // StoreModule.forFeature('calendar',reducer),
        CalendarRoutingModule
    ],
    providers:[CalendarService,CalendarResolveGuard],
    exports:[]
})

export class CalendarModule {  }