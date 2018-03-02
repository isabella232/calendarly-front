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


@NgModule ({
    declarations: [
        CalendarComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        // ModalModule.forRoot(),
        // PostModule,
        // FormsModule,
        CalendarRoutingModule
    ],
    providers:[CalendarService,CalendarResolveGuard],
    exports:[]
})

export class CalendarModule {  }