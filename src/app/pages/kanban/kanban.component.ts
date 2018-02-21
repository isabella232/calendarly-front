import { Observable } from 'rxjs';
import { EventsService } from './../../providers/events.service';
import { SharedService } from './../../providers/shared.service';
import { PostService } from './../post/post.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { KanbanService } from './kanban.service';
import { Component, OnInit, ViewChild } from '@angular/core';
declare var $:any;
declare var swal:any;
import * as _ from 'underscore';
import { ContainerService } from '../../providers/container.service';
@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls:['./kanban.component.scss']
})
export class KanbanComponent  {
  @ViewChild('createPost') createPost:ModalDirective
  @ViewChild('createTopic') createTopic:ModalDirective
  constructor(private calendarService:KanbanService,
    private container:ContainerService,private router:Router,
    private postService:PostService,private sharedService:SharedService,
  private eventsService:EventsService) { }

 
    kanbanBoard:Observable<any>=this.sharedService.getKanbanLayout();
    // kanbanBoard=[
    //   {
    //     title:'To Be Groomed',
    //     index:0,
    //     data:[
    //       {
    //         title:'As a user...',
    //         body:'#16As a User, I would like to send an invite (SHARE Button) to a Stakeholder to get his/her feedback without enforcing registration. '
    //       },
    //       {
    //         title:'As a user...',
    //         body:'#16As a User, I would like to send an invite (SHARE Button) to a Stakeholder to get his/her feedback without enforcing registration. '
    //       },
    //       {
    //         title:'As a user...',
    //         body:'#16As a User, I would like to send an invite (SHARE Button) to a Stakeholder to get his/her feedback without enforcing registration. '
    //       }
    //     ]
    //   },
    //   {
    //     title:'Grooming',
    //     index:1,
    //     data:[
    //       {
    //         title:'As a user...',
    //         body:'#16As a User, I would like to send an invite (SHARE Button) to a Stakeholder to get his/her feedback without enforcing registration. '
    //       }
    //     ]
    //   },
    //   {
    //     title:'To Develop',
    //     index:4,
    //     data:[]
    //   },
    //   {
    //     title:'To Be Groomed',
    //     index:0,
    //     data:[
    //       {
    //         title:'As a user...',
    //         body:'#16As a User, I would like to send an invite (SHARE Button) to a Stakeholder to get his/her feedback without enforcing registration. '
    //       },
    //       {
    //         title:'As a user...',
    //         body:'#16As a User, I would like to send an invite (SHARE Button) to a Stakeholder to get his/her feedback without enforcing registration. '
    //       },
    //       {
    //         title:'As a user...',
    //         body:'#16As a User, I would like to send an invite (SHARE Button) to a Stakeholder to get his/her feedback without enforcing registration. '
    //       }
    //     ]
    //   },
    //   {
    //     title:'To Be Groomed',
    //     index:0,
    //     data:[
    //       {
    //         title:'As a user...',
    //         body:'#16As a User, I would like to send an invite (SHARE Button) to a Stakeholder to get his/her feedback without enforcing registration. '
    //       },
    //       {
    //         title:'As a user...',
    //         body:'#16As a User, I would like to send an invite (SHARE Button) to a Stakeholder to get his/her feedback without enforcing registration. '
    //       },
    //       {
    //         title:'As a user...',
    //         body:'#16As a User, I would like to send an invite (SHARE Button) to a Stakeholder to get his/her feedback without enforcing registration. '
    //       }
    //     ]
    //   },
    //   {
    //     title:'To Be Groomed',
    //     index:0,
    //     data:[
    //       {
    //         title:'As a user...',
    //         body:'#16As a User, I would like to send an invite (SHARE Button) to a Stakeholder to get his/her feedback without enforcing registration. '
    //       },
    //       {
    //         title:'As a user...',
    //         body:'#16As a User, I would like to send an invite (SHARE Button) to a Stakeholder to get his/her feedback without enforcing registration. '
    //       },
    //       {
    //         title:'As a user...',
    //         body:'#16As a User, I would like to send an invite (SHARE Button) to a Stakeholder to get his/her feedback without enforcing registration. '
    //       }
    //     ]
    //   }
    // ]

  }