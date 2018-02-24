import * as CalendarActions from './../../calendar/store/calendar.actions';
import { AppState } from './../../../store/app.reducers';
import { Store } from '@ngrx/store';
import { ContainerService } from './../../../providers/container.service';
import { config } from './../../../providers/config';
import { EventsService } from './../../../providers/events.service';
import { PostService } from './../post.service';
import { CalendarService } from './../../calendar/calendar.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../providers/shared.service';
declare var $:any;
declare var swal:any;
@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent  {
    images=config.images;
  constructor(private route:ActivatedRoute,private router:Router,private eventsService:EventsService,
  private postService:PostService,private container:ContainerService,private sharedService:SharedService,
private store:Store<AppState>) { }
  post:any;
  date;
  time;
  comments=[];
  watchers=[];
  commentBody;
  user:any;
  ngOnInit() {
    this.user=this.container.user;
    this.route.params.subscribe(param=>{
      console.log(param)
    this.postService.getPost(Number(param.id)).subscribe(post=>{
      this.post=post;
      this.post.watchers.forEach(id=>{
        this.sharedService.getUserDetails(id).subscribe(user=>{
          this.watchers.push(user);
        })
      })
      this.getComments(this.post.id)
      // this.date=post.start.toDate()
      this.time=post.date.toDate();
      this.date=post.time.toDate();
      console.log(this.post);
     },er=>{
       console.log(er)
     });
    })


    // this.store.select('calendar').subscribe(state=>{

    // })
  }


  watchPost()
  {
    this.postService.toggleWatchPost(this.post.id,!this.post.is_watcher).subscribe(res=>{
      this.post.is_watcher=!this.post.is_watcher
      console.log(res);
      // this.watchPost
    })
  }
  isCommentOpen=false;
  currentComments=[];
  toggleComments()
  {
    this.isCommentOpen=!this.isCommentOpen;
    if(this.isCommentOpen)
    {
      this.currentComments=this.comments;
    }
    else{
      this.currentComments=this.visibleComments;
    }
  }

  getComments(postId)
  {
    this.postService.getComments(postId).subscribe(comments=>{
      this.currentComments=this.comments;
      this.comments=comments;
      if(this.comments.length>2)
      {
        // this.visibleComments[0]=this.comments[this.comments.length-2];
        // this.visibleComments[1]=this.comments[this.comments.length-1];
        var len=this.comments.length;
        this.visibleComments=this.comments.slice(len-2,len-1)
        // this.visibleComments=this.comments.slice(len-1)
        this.currentComments=this.visibleComments;
      }

      console.log(comments)
    },er=>{
      console.log(er)
    })
  }

  visibleComments=[];
  postComment(body)
  {
    if(body)
    {
      console.log(this.comments)
      this.postService.updatePost({comment:body,version:1,id:this.post.id}).subscribe(res=>{
        console.log(res)
        this.visibleComments.push({
          comment:body,
          user:this.user
        })
      },er=>{
        console.log(er)
      })
    }
 
  }

  deletePost(post)
  {
      swal({
         title: 'Are you sure?',
         text: "You will not be able to recover this post",
         type: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Delete'
       }).then((result) => {
         if (result.value) {
           swal(
             'Deleted!',
             'The post has been removed from your calendar',
             'success'
           ).then(()=>{
            this.postService.deletePost(post.id).subscribe(res=>{
              console.log(res);
              this.store.dispatch(new CalendarActions.DeletePost(post.id));
            });
            this.router.navigate(['/','calendar'])
           })
         }
       })

      
  }

  updateForm(post)
  {
    console.log(post)
    this.postService.updatePost(post).subscribe(res=>{
      console.log(res)
    })
  }

}
