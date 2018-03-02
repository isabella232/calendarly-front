import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { CalendarResolveGuard } from './calendar-resolve.guard';
import { Routes, RouterModule } from '@angular/router';



export const CalendarRoutes:Routes=[
    {
        path: '',
        component: CalendarComponent,
        resolve:{
            calendar:CalendarResolveGuard
        }
    }
]

@NgModule({
    imports: [
      RouterModule.forChild(CalendarRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class CalendarRoutingModule { }