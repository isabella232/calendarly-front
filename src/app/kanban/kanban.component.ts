import { PostService } from './../post/post.service';
import * as CalendarActions from './../calendar/store/calendar.actions';
import { Store } from '@ngrx/store';
import { AppState } from './../store/app.reducers';
import { ModalDirective } from 'ngx-bootstrap/modal';
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
    private store:Store<AppState>,private postService:PostService) { }
    statuses=[];

    deletePost(id)
    {
      this.store.dispatch(new CalendarActions.DeletePost(id));
    }

    ngOnInit()
    {
      this.store.select('calendar').subscribe(state=>{
        console.log(state,'state')
        this.statuses=state.statuses;
      })
   
    }

    onDrag(data)
    {
      var id=data.id;
      var order=data.order;
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
    }    
}