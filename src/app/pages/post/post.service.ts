import { SharedService } from './../../providers/shared.service';
import { Router } from '@angular/router';
import { config } from './../../providers/config';
import { ContainerService } from './../../providers/container.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from '@angular/common/http';
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
    // var token=window[this.container.storageStrategy].getItem('authToken');
    return this.http.post(config.url+'/api/v1/userstories',data,{
      headers:new HttpHeaders().set('Authorization','Application '+this.container.cypheredToken)
    }).flatMap((res:any)=>{
      var obj:any={}
     Object.keys(this.container.customAttributes).forEach(key=>{
          obj[key]=data[key];
      })
      obj.postId=res.id;
      return this.addCustomAttributesToPost(obj)
    }).pipe(catchError(this.sharedService.handleError));
  }

  deleteComment(postId,commentId)
  {
    return this.http.post(config.url+`/api/v1/history/userstory/${postId}/delete_comment?id=${commentId}`,{
      headers:new HttpHeaders().set('Authorization','Application '+this.container.cypheredToken)
    }).pipe(catchError(this.sharedService.handleError));
  }

  updatePost(data:any)
  {
    return this.http.patch(config.url+'/api/v1/userstories/'+data.id,data,{
      headers:new HttpHeaders().set('Authorization','Application '+this.container.cypheredToken)
    }).flatMap((res:any)=>{
      var obj:any={}
     Object.keys(this.container.customAttributes).forEach(key=>{
          obj[key]=data[key];
      })
      obj.postId=res.id;
      return this.addCustomAttributesToPost(obj)
    }).pipe(catchError(this.sharedService.handleError));
  }

  getComments(postId)
  {
    return this.http.get(config.url+'/api/v1/history/userstory/'+postId,{
      headers:new HttpHeaders().set('Authorization','Application '+this.container.cypheredToken)
    }).pipe(catchError(this.sharedService.handleError));
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
    },{
      headers:new HttpHeaders().set('Authorization','Application '+this.container.cypheredToken)
    }).pipe(catchError(this.sharedService.handleError));  }

    createAttachment(data)
    {
      var token=window[this.container.storageStrategy].getItem('cypheredToken');

      var headers=new HttpHeaders()
      headers.append('Authorization','Application '+token)
      return this.http.post(config.url+'/api/v1/userstories/attachments',data,{headers:new HttpHeaders().set('Authorization','Application '+this.container.cypheredToken)})
      .pipe(catchError(this.sharedService.handleError));

    }

    deleteAttachment(file)
    {
      var token=window[this.container.storageStrategy].getItem('cypheredToken');

      var headers=new HttpHeaders()
      headers.append('Authorization','Application '+token)
      return this.http.delete(config.url+'/api/v1/userstories/attachments/'+file.id,{headers:new HttpHeaders().set('Authorization','Application '+this.container.cypheredToken)})
      .pipe(catchError(this.sharedService.handleError));

    }

    deletePost(postId)
    {
      var token=window[this.container.storageStrategy].getItem('cypheredToken');
      var headers=new HttpHeaders()
      headers.append('Authorization','Application '+token)
      return this.http.delete(config.url+'/api/v1/userstories/'+postId,{headers:new HttpHeaders().set('Authorization','Application '+this.container.cypheredToken)})
      .pipe(catchError(this.sharedService.handleError));

    }

    getAttachments(post)
    {
      var token=window[this.container.storageStrategy].getItem('cypheredToken');

      var headers=new HttpHeaders()
      headers.append('Authorization','Application '+token)
      return this.http.get(config.url+`/api/v1/userstories/attachments?object_id=${post.id}\&project=${post.project}`,{headers:new HttpHeaders().set('Authorization','Application '+this.container.cypheredToken)})
      .pipe(catchError(this.sharedService.handleError));
    }


  mapPostToCalendarly(post)
  {
    console.log(post)
    post.start=post.date;
    post.socialMedia=post.socialMedia.join(',')
    // post.tags=post.tags.split(',');
    post.project=this.container.projectId;
    post.subject=post.title;
    post.assigned_to=this.container.user.id;
    post.description_html=post.description;
    post.kanban_order=post.date.getTime();
    post.backlog_order=post.date.getTime();
    
    return {...post};
  }
  
  mapPostToTaiga(post)
  {
    post.kanban_order=post.date.toDate().getTime();
    post.backlog_order=post.time.toDate().getTime();
    return {...post}
  }

  toggleWatchPost(postId,isWatch)
  {
    var token=window[this.container.storageStrategy].getItem('cypheredToken');
    return this.http.post(config.url+'/api/v1/userstories/'+postId+'/'+(isWatch?'watch':'unwatch'),null,{
      headers:new HttpHeaders().set('Authorization','Application '+token)
    }).pipe(catchError(this.sharedService.handleError));
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
        // post.start=new Date(post.kanban_order);
        post.start=moment(post.kanban_order)
        post.time=moment(post.backlog_order)
      })
  
    }
    else{
      postData.title=postData.subject;
      postData.tags=_.compact(_.flatten(postData.tags)).join(',')
        // post.start=new Date(post.kanban_order);
        postData.start=moment(postData.kanban_order)  
        postData.date=moment(postData.kanban_order)  
        postData.time=moment(postData.backlog_order)  
        
    }
    return postData;
    

  } 
  posts:any[]=[];

  getPost(postId)
  {
    var token=window[this.container.storageStrategy].getItem('authToken');
    return this.http.get(config.url+'/api/v1/userstories/'+postId).map(post=>{
      return this.mapPostResponse(post)
    }).pipe(catchError(this.sharedService.handleError));
  }

  
  updateAttachment(file)
  {
    var token=window[this.container.storageStrategy].getItem('cypheredToken');
    var headers=new HttpHeaders()
    headers.append('Authorization','Application '+token)
    return this.http.patch(config.url+'/api/v1/userstories/attachments/'+file.id,file,{headers:new HttpHeaders().set('Authorization','Application '+this.container.cypheredToken)})
    .pipe(catchError(this.sharedService.handleError));

  }

  getPosts()
  {
    var token=window[this.container.storageStrategy].getItem('authToken');
    return this.http.get(config.url+'/api/v1/userstories').map((posts:any[])=>{
      // console.log(posts)
      this.posts=this.mapPostResponse(posts)
      console.log(this.posts)
      return this.posts;
    }).pipe(catchError(this.sharedService.handleError));
  }
}
