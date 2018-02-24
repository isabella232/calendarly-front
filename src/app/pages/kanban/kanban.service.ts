import { ContainerService } from './../../providers/container.service';
import { SharedService } from './../../providers/shared.service';
import { config } from './../../providers/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostService } from './../post/post.service';
import { Injectable } from '@angular/core';
// import 'rxjs/operators';
// import 'rxjs'
import { catchError } from 'rxjs/operators/catchError';
@Injectable()
export class KanbanService {

  constructor(private postService:PostService,private http:HttpClient,
  private sharedService:SharedService,private container:ContainerService) { }

    editBoard(id,data)
    {
      var headers=new HttpHeaders().append('Authorization','Application '+this.container.cypheredToken);
      return this.http.patch(config.url+'/api/v1/userstories/'+id,data,{headers:headers})
      .pipe(catchError(this.sharedService.handleError));
    }

}
