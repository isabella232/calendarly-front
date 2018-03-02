import { AppState } from './../../store/app.reducers';
import { SharedService } from './../../providers/shared.service';
import { EventsService } from './../../providers/events.service';
import { config } from './../../providers/config';
import { ContainerService } from './../../providers/container.service';
import * as CalendarActions from './../../calendar/store/calendar.actions';
import { Store } from '@ngrx/store';
import { PostService } from './../post.service';
import { CalendarService } from './../../calendar/calendar.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { Component, OnInit } from '@angular/core';
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
  isViewLess=true;
  toggleComments()
  {
   this.isViewLess=!this.isViewLess;
  }

  getComments(postId)
  {
    this.postService.getComments(postId).subscribe(comments=>{
      this.comments=comments;
      if(this.comments.length>=2)
      {
        this.lessComments=[this.comments[0],this.comments[1]]
      }
      else{
        this.lessComments=this.comments;
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
        this.comments.push({
          user:{
          name:res.assigned_to_extra_info.username,
          photo:res.owner_extra_info.photo
          },
          comment:this.commentBody
        })   
        this.commentBody=''
        console.log(this.comments,'asd')
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
  lessComments=[]
  deleteComment(post,comment,index)
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
          this.postService.deleteComment(post.id,comment.id).subscribe(res=>{
            console.log(res,'deletecomment');
            this.comments.splice(index,1)
            this.sharedService.notify('Comment Deleted!')
       });
         
         }
       })
  }

  updateForm(post)
  {
    // console.log(post)
    // this.postService.updatePost(post).subscribe(res=>{
    //   console.log(res)
    // })
  }

}
