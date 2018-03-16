import { PostService } from './../post/post.service';
import { config } from './../providers/config';
import * as CalendarActions from './../calendar/store/calendar.actions';
import { Store } from '@ngrx/store';
import { AppState } from './../store/app.reducers';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { EventsService } from '../providers/events.service';
declare var swal:any;


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
    private dragulaService: DragulaService,private eventService:EventsService,
    private postService:PostService,private router:Router) { }
    statuses=[];
    images=config.images;
    addPost()
    {
      this.eventService.openPostSubject.next();
    }

    editPost(id)
    {
      this.router.navigate(['/','post',id])
    }
    
    deletePost(id)
    {
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then(result=>{
        if(result.value)
        {
          this.store.dispatch(new CalendarActions.DeletePost(id));
        }
      })
    }

    ngOnInit()
    {
      this.store.select('calendar').subscribe(state=>{
        console.log(state,'state')
        this.statuses=state.statuses;
      })

      // this.dragulaService.drag.subscribe((value) => {
      //   // console.log(`drag: ${v}`);
      //   console.log
      //   // this.onDrag(value.slice(1));
      // });

      this.dragulaService.drop.subscribe(res=>{
        var id=Number(res[1].id)
        var order=Number(res[2].children[0].id)
        this.postService.getPost(id).subscribe(post=>{
          console.log(post,'post');

          if(post.status!==order)
          {
            this.postService.updatePost({
              id:post.id,
              status:order,
              version:post.version
            }).subscribe(res=>{
              console.log(res);
            })
          }
         
        })
      
      })
    }
}