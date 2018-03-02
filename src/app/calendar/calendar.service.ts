import { SharedService } from './../providers/shared.service';
import { config } from './../providers/config';
import { HttpClient } from '@angular/common/http';
import { PostService } from './../post/post.service';
import { Injectable } from '@angular/core';
// import 'rxjs/operators';
// import 'rxjs'
import { catchError } from 'rxjs/operators/catchError';
@Injectable()
export class CalendarService {

  constructor(private postService:PostService,private http:HttpClient,
  private sharedService:SharedService) { }

  posts=[];

  mapPostToCalendar(post)
  {
    post.start=post.date;
    post.comments=[];
    post.fullDay=true;
    post._id=Date.now();
    post.saved=true;

    return {...post}

  }

  addMember(data)
  {
    return this.http.post(config.url+'/api/v1/memberships',data).pipe(catchError(this.sharedService.handleError));
  }

  savePost(post)
  {
    var index;
    this.postService.posts.forEach((p,i)=>{
      if(p._id===post._id)
      {
        index=i;
      } 
    })

    this.postService.posts[index]=post;
    
  }

  addPost(event)
  {
    this.postService.posts.push(event);
  }


  updatePost(post)
  {
    var postIndex;
    this.postService.posts.forEach((obj,index)=>{

     postIndex=index;

    })
      console.log(postIndex)
    this.postService.posts[postIndex]=post;

    console.log(this.posts)
  }

}
