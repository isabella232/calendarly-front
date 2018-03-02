import { NgModule } from '@angular/core';
import { KanbanComponent } from './kanban.component';
import { KanbanResolveGuard } from './kanban-resolve.guard';

import { Routes, RouterModule } from '@angular/router';



export const KanbanRoutes:Routes=[
    {
        path: '',
        component: KanbanComponent,
        resolve:{
            kanban:KanbanResolveGuard
        }
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