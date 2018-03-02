import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { Routes, RouterModule } from '@angular/router';



export const CalendarRoutes:Routes=[
    {
        path: '',
        component: CalendarComponent
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