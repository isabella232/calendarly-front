import { SharedService } from '../../providers/shared.service';
import { PostService } from '../../post/post.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
@Injectable()
export class PostViewResolveGuard implements Resolve<any> {
  constructor(private postService:PostService,private sharedService:SharedService){}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log('hello',route)
    var observables=[];
    var watchers=[];
    var postId=route.params.id;
    var post;
    var comments;
   return this.postService.getPost(postId)
  .mergeMap(p=>{
       console.log(p)
       post=p;
       p.watchers.forEach(id=>{
        observables.push(this.sharedService.getUserDetails(id))
      })
    return forkJoin(observables);
   }).mergeMap(results=>{
    watchers=results;
    return this.postService.getComments(post.id)
   }).map(c=>{
       comments=c;
       return {
           data:{
               post:post,
               comments:comments,
               watchers:watchers
           }
       }
   })

  }
}
