import * as CalendarActions from './pages/calendar/store/calendar.actions';
import { AppState } from './store/app.reducers';
import { PostService } from './pages/post/post.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
@Injectable()
export class AppInitGuard implements CanActivate {
  constructor(private postService:PostService,private store:Store<AppState>){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return Observable.create(observer=>{
        this.postService.getPosts().subscribe(posts=>{
          console.log(posts)
          this.store.dispatch(new CalendarActions.AddPostsToStore(posts));
          observer.next(true);
          observer.complete();
        })
      })
  }
}
