import { SharedService } from './shared.service';
import { Router } from '@angular/router';
import { EventsService } from './events.service';
import { Observable } from 'rxjs/Observable';
import { ContainerService } from './container.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {config} from './config';
import 'rxjs';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class AuthService {

  constructor(private http:HttpClient,private container:ContainerService,
    private eventService:EventsService,private eventsService:EventsService,
  private router:Router,private sharedService:SharedService) { }

  authenticateUser(data)
  {
    this.container.authHeader='Bearer'
    return this.http.post(config.url+'/api/v1/auth',data).flatMap((res:any)=>{
      console.log(res)
    window[this.container.storageStrategy].setItem('authToken',res.auth_token);
    this.container.isAuthenticated=true;
    this.eventService.userUpdated.next(res);    
    return this.getToken();
    }).pipe(catchError(this.sharedService.handleError));
  }

  forgotPassword(userInfo)
  {
    return this.http.post(config.url+'/api/v1/users/password_recovery',{username:userInfo})
    .map(res=>{
      console.log(res)
      return res;
    }).pipe(catchError(this.sharedService.handleError));
  }

  signupUser(data)
  {
    return this.http.post(config.url+'/api/v1/auth/register',data).map((res:any)=>{
      console.log(res)
    window[this.container.storageStrategy].setItem('authToken',res.auth_token);
    this.container.isAuthenticated=true;
    this.eventService.userUpdated.next(res);
    this.container.user=res;
    return res;
    }).pipe(catchError(this.sharedService.handleError));
  }
  


  getToken()
  {
    var data={
      "application": this.container.appId,
      "state": this.container.appState
              }
    return this.http.post(config.url+`/api/v1/application-tokens/authorize`,data).flatMap((res:any)=>{
      console.log(res)
    window[this.container.storageStrategy].setItem('auth_code',res.auth_code);
    this.container.auth_code=res.auth_code;
    this.container.isAuthenticated=true;
    // this.eventService.userUpdated.next(res);
    
    return this.validateToken();
    }).pipe(catchError(this.sharedService.handleError));
  }

  validateToken()
  {
    var authCode=window[this.container.storageStrategy].getItem('auth_code')
    var data={
      "application": this.container.appId,
      "auth_code": authCode,
      "state": this.container.appState
  }
  console.log(data)
    return this.http.post(config.url+`/api/v1/application-tokens/validate`,data).map((res:any)=>{
      console.log(res)
    window[this.container.storageStrategy].setItem('cypheredToken',res.token);
    this.container.cypheredToken=res.token;
    this.container.authHeader='Application';
    // return this.getUserDetails();
    return res;
    }).pipe(catchError(this.sharedService.handleError));
  }

  getUserDetails()
  {
    return this.http.get(config.url+`/api/v1/users/me`).map((res:any)=>{
      this.eventService.userUpdated.next(res);
      this.container.user=res;
      console.log(res);
      return res;
    }).pipe(catchError(this.sharedService.handleError));
  }

  handleError(er)
  {
    console.log(er)
    if(er.status===401)
    {
      this.router.navigate(['/','pages','login']);
      window[this.container.storageStrategy].removeItem('authToken');
      window[this.container.storageStrategy].removeItem('auth_code');
    }
  }

}
