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
  constructor(private calendarService: KanbanService,
    private container: ContainerService, private router: Router,
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
        console.log(res);
      })
    }
}