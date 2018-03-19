import { AppState } from './../../store/app.reducers';
import { SharedService } from './../../providers/shared.service';
import { config } from './../../providers/config';
import { ContainerService } from './../../providers/container.service';
import * as CalendarActions from './../../calendar/store/calendar.actions';
import { Store } from '@ngrx/store';
import { PostService } from './../post.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var swal:any;
@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent  {
    images=config.images;
  constructor(private route:ActivatedRoute,private router:Router,
  private postService:PostService,private container:ContainerService,private sharedService:SharedService,
private store:Store<AppState>) { }
  post:any;
  date;
  time;
  comments=[];
  watchers=[];
  lessComments=[]
  commentBody;
  user:any;
  isCommentOpen=false;
  currentComments=[];
  isViewLess=true;
  visibleComments=[];

  editComment(post,comment)
  {
    comment.isEditMode=true;
      this.postService.editComment(post.id,comment.id,{comment:comment.comment}).subscribe(res=>{
        console.log(res,'comments')
        comment.isEditMode=false;
      })
  }

  ngOnInit() {
    this.user=this.container.user;

    this.route.data.subscribe(data=>
    {
      console.log(data,'data');
      this.comments=data.post.comments;
      this.watchers=data.post.watchers;
      this.post=data.post.post;
      this.date=this.post.date.toDate();
      this.time=this.post.time.toDate();
    })

  }


  watchPost()
  {
    this.postService.toggleWatchPost(this.post.id,!this.post.is_watcher).subscribe(res=>{
      this.post.is_watcher=!this.post.is_watcher;
      if(this.post.is_watcher)
      {
        this.watchers.unshift(this.user);
      }
      else{
        this.watchers=this.watchers.filter(o=>o.id!==this.user.id);
      }
      console.log(res);
    })
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
          this.store.dispatch(new CalendarActions.DeletePost(post.id));

        }
       })
  }
  deleteComment(data)
  {
    console.log(data,'data')
    var post=data.post;
    var comment=data.comment;
    var index=data.index;
    
    this.postService.deleteComment(this.post.id,comment.id).subscribe(res=>{
      console.log(res,'deletecomment');
      this.comments.splice(index,1)
      this.sharedService.notify('Comment Deleted!')
 });
  }

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
          comment:body
        })   
        this.commentBody=''
        console.log(this.comments,'asd')
      },er=>{
        console.log(er)
      })
    }
 
  }

}
