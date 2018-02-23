import { PostService } from './../post/post.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
@Injectable()
export class CalendarResolveGuard implements Resolve<any> {
  constructor(private postService:PostService){}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log('hello')
    var observables=[];
    observables[0]=this.postService.getPosts()
    observables[1]=this.postService.getCustomAttributes();

    return forkJoin([...observables]).map(results=>{
      return {
        posts:results[0],
        customAttributes:results[1]
      }
    });
  }
}
