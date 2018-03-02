import { NgModule } from '@angular/core';
import { KanbanComponent } from './kanban.component';

import { Routes, RouterModule } from '@angular/router';



export const KanbanRoutes:Routes=[
    {
        path: '',
        component: KanbanComponent
    }
]


@NgModule({
    imports: [
      RouterModule.forChild(KanbanRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class KanbanRoutingModule { }