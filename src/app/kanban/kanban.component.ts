import * as CalendarActions from './../calendar/store/calendar.actions';
import { Store } from '@ngrx/store';
import { AppState } from './../store/app.reducers';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {  ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent {
  @ViewChild('createPost') createPost: ModalDirective
  @ViewChild('createTopic') createTopic: ModalDirective
  constructor(
    private store:Store<AppState>,
    private dragulaService: DragulaService) { }
    statuses=[];
    ngOnInit()
    {
      this.store.select('calendar').subscribe(state=>{
        console.log(state,'state')
        this.statuses=state.statuses;
      })

      this.dragulaService.drop.subscribe(res=>{
        var id=Number(res[1].id)
        var order=Number(res[2].children[0].id)
      })
    }
}