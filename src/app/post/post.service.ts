import { ContainerService } from './../providers/container.service';
import { config } from './../providers/config';
import { SharedService } from './../providers/shared.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'underscore';
import * as moment from 'moment';
import { isArray } from 'util';
import { catchError } from 'rxjs/operators/catchError';
@Injectable()
export class PostService {

  constructor(private http:HttpClient,private container:ContainerService,
  private router:Router,private sharedService:SharedService) { }

  createPost(data)
  {
    return this.http.post(config.url+'/api/v1/userstories',data)
    .pipe(catchError(this.sharedService.handleError));
  }

  editBoard(id,data)
    {
      return this.http.patch(config.url+'/api/v1/userstories/'+id,data)
      .pipe(catchError(this.sharedService.handleError));
    }
    
  createTopic(topic)
  {
    return this.http.post(config.url+'/api/v1/epics',topic)
  }

  deleteComment(postId,commentId)
  {
    return this.http.post(config.url+`/api/v1/history/userstory/${postId}/delete_comment?id=${commentId}`,{}).pipe(catchError(this.sharedService.handleError));
  }

  updatePost(data:any)
  {
    var id=data.id;
    delete data.id;
    return this.http.patch(config.url+'/api/v1/userstories/'+id,data)
    .pipe(catchError(this.sharedService.handleError));
  }

  getComments(postId)
  {
    return this.http.get(config.url+'/api/v1/history/userstory/'+postId).pipe(catchError(this.sharedService.handleError));
  }

  getCustomAttributes()
  {
    return this.http
    .get(config.url+'/api/v1/userstory-custom-attributes?project='+this.container.projectId)
    .pipe(catchError(this.sharedService.handleError));
  }

  addCustomAttributesToPost(data)
  {
    let This=this;
    var container=this.container;
    var attribute_values={
      [container.customAttributes.date.id]:data.date,
      [container.customAttributes.time.id]:data.time,
      [container.customAttributes.socialMedia.id]:data.socialMedia
    }
    return this.http.patch(config.url+'/api/v1/userstories/custom-attributes-values/'+data.postId,{
      "attributes_values":attribute_values,
      version:1
    }).pipe(catchError(this.sharedService.handleError));  }

    createAttachment(data)
    {
      return this.http.post(config.url+'/api/v1/userstories/attachments',data)
      .pipe(catchError(this.sharedService.handleError));

    }

    deleteAttachment(file)
    {
      return this.http.delete(config.url+'/api/v1/userstories/attachments/'+file.id)
      .pipe(catchError(this.sharedService.handleError));

    }

    deletePost(postId)
    {
      return this.http.delete(config.url+'/api/v1/userstories/'+postId)
      .pipe(catchError(this.sharedService.handleError));

    }

    getAttachments(post)
    {

      return this.http.get(config.url+`/api/v1/userstories/attachments?object_id=${post.id}\&project=${post.project}`)
      .pipe(catchError(this.sharedService.handleError));
    }


  mapPostToCalendarly(post)
  {
    console.log(post)
    post.start=post.date;
    post.project=this.container.projectId;
    post.subject=post.title;
    post.assigned_to=this.container.user.id;
    post.description_html=post.description;
    post.kanban_order=moment(post.date).toDate().getTime();
    post.backlog_order=moment(post.date).toDate().getTime();
    post=_.pick(post,'project','subject','assigned_to','description_html',
    'kanban_order','backlog_order','id','version','tags','profiles','topics')
    
    return {...post};
  }
  
  mapPostToTaiga(post)
  {
    console.log(post,'posta')
    post.kanban_order=post.date.toDate().getTime();
    post.backlog_order=post.time.toDate().getTime();
    post.subject=post.title;
    post.description_html=post.description;
    return {...post}
  }

  toggleWatchPost(postId,isWatch)
  {
    return this.http.post(config.url+'/api/v1/userstories/'+postId+'/'+(isWatch?'watch':'unwatch'),null)
    .pipe(catchError(this.sharedService.handleError));
  }

  mapPostResponse(postData:any)
  {
    if(isArray(postData))
    {
      postData.forEach(post=>{
        post.title=post.subject;
        post.tags=_.compact(_.flatten(post.tags)).join(',')
        post.socialMedia=_.compact(_.flatten(post.socialMedia)).join(',')
        post.topics=_.compact(_.flatten(post.topics)).join(',')
        post.start=moment(post.kanban_order)
        post.time=moment(post.backlog_order)
      })
  
    }
    else{
      postData.title=postData.subject;
      postData.tags=_.compact(_.flatten(postData.tags)).join(',')
        postData.start=moment(postData.kanban_order)  
        postData.date=moment(postData.kanban_order)  
        postData.time=moment(postData.backlog_order)  
        
    }
    return postData;
    

  } 
  posts:any[]=[];

  getPost(postId)
  {
    return this.http.get(config.url+'/api/v1/userstories/'+postId).map(post=>{
      return this.mapPostResponse(post)
    }).pipe(catchError(this.sharedService.handleError));
  }

  
  updateAttachment(file)
  {
    return this.http.patch(config.url+'/api/v1/userstories/attachments/'+file.id,file)
    .pipe(catchError(this.sharedService.handleError));

  }

  getPosts()
  {
    return this.http.get(config.url+'/api/v1/userstories').map((posts:any[])=>{
      // console.log(posts)
      this.posts=this.mapPostResponse(posts)
      this.container.posts=this.posts;
      console.log(this.posts)
      return this.posts;
    }).pipe(catchError(this.sharedService.handleError));
  }
}
