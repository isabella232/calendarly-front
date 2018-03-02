import { Router } from '@angular/router';
import { ContainerService } from './../container.service';
import { EventsService } from './../events.service';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {HttpEvent,HttpClient,HttpErrorResponse, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import 'rxjs/add/operator/do';


@Injectable()
export class AuthInterceptor  implements HttpInterceptor {
  constructor(private container:ContainerService,private router:Router){};
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq;
    var token
   
      if(this.container.authHeader==='Application')
      {
        token=window[this.container.storageStrategy].getItem('cypheredToken');
      }
      else if(this.container.authHeader==='Bearer'){
         token=window[this.container.storageStrategy].getItem('authToken');
      }
      if(token)
      {
        authReq = req.clone({headers: req.headers.set('Authorization', `${this.container.authHeader} ${token}`)});      
      }
      else{
        authReq=req.clone()
      }
  
    return next.handle(authReq)

  }
}


