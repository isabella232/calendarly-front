import * as CalendarActions from './../calendar/store/calendar.actions';
import { Store } from '@ngrx/store';
import { AppState } from './../store/app.reducers';
import { SharedService } from './../providers/shared.service';
import { ContainerService } from './../providers/container.service';
import { PostService } from './../post/post.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
@Injectable()
export class LayoutResolveGuard implements Resolve<any> {
  constructor(private postService:PostService,private container:ContainerService,
  private sharedService:SharedService,private store:Store<AppState>){}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log('hello')
    var observables=[];
    observables[0]=this.postService.getPosts()
    observables[1]=this.postService.getCustomAttributes();
    observables[2]=this.sharedService.getKanbanLayout();
    return forkJoin([...observables]).map((results:any[])=>{
      this.store.dispatch(new CalendarActions.AddPostsToStore(results[0]));
      this.container.posts=results[0];
      this.container.customAttributes=results[1];
      this.container.kanbanBoard=results[2]
      return {
        posts:results[0],
        customAttributes:results[1],
        kanbanBoard:results[2]
      }
    });
  }
}
