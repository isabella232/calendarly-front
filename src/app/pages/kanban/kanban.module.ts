import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { KanbanService } from './kanban.service';
import { KanbanComponent } from './kanban.component';
import { AddUserComponent } from './../../components/add-user/add-user.component';
import { FormsModule } from '@angular/forms';
import { PostModule } from './../post/post.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
        ModalModule.forRoot(),
        BsDropdownModule.forRoot(),
        FormsModule
    ],
    providers:[KanbanService]
})

export class KanbanModule {  }