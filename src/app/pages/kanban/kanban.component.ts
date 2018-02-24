import * as CalendarActions from './../calendar/store/calendar.actions';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/app.reducers';
import { Observable } from 'rxjs';
import { EventsService } from './../../providers/events.service';
import { SharedService } from './../../providers/shared.service';
import { PostService } from './../post/post.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { KanbanService } from './kanban.service';
import { Component, OnInit, ViewChild } from '@angular/core';
declare var $: any;
declare var swal: any;
import * as _ from 'underscore';
import { ContainerService } from '../../providers/container.service';
import { DragulaService } from 'ng2-dragula';
@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent {
  @ViewChild('createPost') createPost: ModalDirective
  @ViewChild('createTopic') createTopic: ModalDirective
  constructor(private kanbanService: KanbanService,
    private container: ContainerService, private router: Router,
    private store:Store<AppState>,
    private postService: PostService, private sharedService: SharedService,
    private eventsService: EventsService,private route:ActivatedRoute,
    private dragulaService: DragulaService) { }
    kanbanBoard=[];

    ngOnInit()
    {
      this.route.data.subscribe(routeData=>{
        console.log(routeData)
        this.kanbanBoard=routeData.kanban.data;
      })

      this.dragulaService.drop.subscribe(res=>{
        var id=Number(res[1].id)
        var order=Number(res[2].children[0].id)
        console.log(res);

       var status= this.container.statuses.filter(o=>o.id===order)[0];

       var post= this.container.posts.filter(o=>o.id===id)[0]
        
      this.kanbanService.editBoard(id,{status:status.id,status_extra_info:status,version:post.version}).subscribe(res=>{
          console.log(res)
        this.store.dispatch(new CalendarActions.DragPost({
          id:Number(id),
          order:Number(order)
        }))
        })
      })
    }
}