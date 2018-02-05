import { ContainerService } from './../container.service';
import { EventsService } from './../events.service';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {HttpEvent,HttpClient,HttpErrorResponse, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import 'rxjs/add/operator/do';


@Injectable()
export class RequestInterceptorService  implements HttpInterceptor {
  constructor(private container:ContainerService){};
  

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    console.log(req)
    var token=window[this.container.storageStrategy].getItem('authToken');
    let authReq;
    if(token)
    {
      if(this.container.authHeader==='Application')
      {
        token=window[this.container.storageStrategy].getItem('cypheredToken');
      }
       authReq = req.clone({headers: req.headers.set('Authorization', `${this.container.authHeader} ${token}`)});      
    }
    else
    {
      authReq = req.clone();      
    }
    return next.handle(authReq)
  }
}


