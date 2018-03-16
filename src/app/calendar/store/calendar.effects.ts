import { forkJoin } from 'rxjs/observable/forkJoin';
import { DELETE_POST } from './../../kanban/store/kanban-actions';
import { SharedService } from './../../providers/shared.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from './../../post/post.service';
import * as CalendarActions from './calendar.actions';
import {Actions,Effect} from '@ngrx/effects';

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';

@Injectable()
export class CalendarEffects
{
    constructor(private actions:Actions,private postService:PostService,
        private sharedService:SharedService,private router:Router){}

    @Effect() getPosts$=this.actions
    .ofType(CalendarActions.GET_POSTS)
    .switchMap((action:CalendarActions.GetPosts)=>{
    return this.postService.getPosts()
    })
    .map(posts=>{
      return {
            type:CalendarActions.GET_POSTS_SUCCESS,
            payload:posts
        }
    })


    @Effect() createPost=this.actions.ofType(CalendarActions.CREATE_POST).map((action:CalendarActions.CreatePost)=>action.payload)
    .mergeMap(postData=>{
        console.log(postData,'postdata')
        return this.postService.createPost(postData)
    }).map(post=>{
        console.log(post,'aasd')
        this.sharedService.notify('Post Created Successfully')
            return {
                type:CalendarActions.CREATE_POST_SUCCESS,
                payload:this.postService.mapPostResponse(post)
            }
    })

    @Effect() deletePost=this.actions.ofType(CalendarActions.DELETE_POST).map((action:CalendarActions.CreatePost)=>action.payload)
    .mergeMap(postId=>{
        console.log(postId,'postdata')
        return forkJoin([this.postService.deletePost(postId),Observable.of(postId)])
    }).map(results=>{
        var postId=results[1];
        this.sharedService.notify('Post Deleted Successfully');
        this.router.navigate(['/','calendar'])
            return {
                type:CalendarActions.DELETE_POST_SUCCESS,
                payload:postId
            }
    })

    @Effect() createTopic=this.actions.ofType(CalendarActions.CREATE_TOPIC).map((action:CalendarActions.CreateTopic)=>action.payload)
    .mergeMap(topicData=>{
        return this.postService.createTopic(topicData)
    }).map(post=>{
        this.sharedService.notify('Topic Created Successfully')
        console.log(post,'aasd')
            return {
                type:CalendarActions.CREATE_TOPIC_SUCCESS,
                payload:post
            }
    })

    @Effect() dragPost=this.actions.ofType(CalendarActions.DRAG_POST)
.switchMap((action:CalendarActions.DragPost)=>{
    return this.postService.editBoard(action.payload.id,action.payload.data)
}).map(post=>{
    console.log(post)
    return {
        type:CalendarActions.DRAG_POST_SUCCESS,
        payload:post
    }
})

}