import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { KanbanService } from './kanban.service';
import { KanbanComponent } from './kanban.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {DragulaModule} from 'ng2-dragula';

const Calendar_ROUTES = [
    { path: '', component: KanbanComponent }
];

@NgModule ({
    declarations: [
        KanbanComponent,
        // AddUserComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(Calendar_ROUTES),
        BsDropdownModule.forRoot(),
        FormsModule,
        DragulaModule
    ],
    providers:[KanbanService]
})

export class KanbanModule {  }