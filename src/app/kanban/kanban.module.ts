import { CoreModule } from './../core/core.module';
import { KanbanResolveGuard } from './kanban-resolve.guard';
import { KanbanRoutes, KanbanRoutingModule } from './kanban.routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { KanbanService } from './kanban.service';
import { KanbanComponent } from './kanban.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {DragulaModule} from 'ng2-dragula';


@NgModule ({
    declarations: [
        KanbanComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        // BsDropdownModule.forRoot(),
        // FormsModule,
        // DragulaModule,
        KanbanRoutingModule
    ],
    providers:[KanbanService,KanbanResolveGuard],
    exports:[]
})

export class KanbanModule {  }