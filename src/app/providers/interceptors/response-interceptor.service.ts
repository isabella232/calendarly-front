import { ContainerService } from './../container.service';
import { EventsService } from './../events.service';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpEvent,HttpErrorResponse, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { HttpResponse } from '@angular/common/http/src/response';

import 'rxjs/add/operator/do';

@Injectable()
export class ResponseInterceptorService  implements HttpInterceptor {
  constructor(private container:ContainerService,private eventsService:EventsService){};
  
  intercept(res: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(res)
  
    return next.handle(res)
      .do(event=>{
      console.log(event)
      if(event instanceof HttpErrorResponse)
      {
        console.log(event)
        if(event.status===401)
        {
          this.eventsService.exitUser.next();
        }
      }
    });
  
  }
}
