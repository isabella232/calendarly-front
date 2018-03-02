import { AuthService } from './auth.service';
import { ContainerService } from './container.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private container:ContainerService,private authService:AuthService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log(state)
      return Observable.create(observer=>{
        this.authService.getToken().subscribe(res=>{
        console.log(res)
        observer.next(true);
        observer.complete();
      },er=>{
        this.authService.handleError(er);
        observer.next(false);
        observer.complete();
      })
      })
  }
}
