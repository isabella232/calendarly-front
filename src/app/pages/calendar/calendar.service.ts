import { PostService } from './../post/post.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CalendarService {

  constructor(private postService:PostService) { }

  posts=[];

  mapPostToCalendar(post)
  {
    post.start=post.date;
    post.comments=[];
    // post.title=post.name;
    post.fullDay=true;
    post._id=Date.now();
    post.saved=true;

    return {...post}

  }

  // deletePost(post)
  // {
  //   this.postService.posts.forEach((e,index)=>{
  //     if(e._id===post._id)
  //     {
  //       this.postService.posts.splice(index,1);
  //     }
  //   })
  // }

  // deleteComment(comment)
  // {
    
  // }

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
    this.postService.posts.push(event)
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
