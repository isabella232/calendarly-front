import { FullcalendarComponent } from './fullcalendar.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';



@NgModule ({
    declarations: [
        FullcalendarComponent
    ],
    imports: [
        CommonModule
    ],
    exports:[FullcalendarComponent]
})

export class FullcalendarModule {  }