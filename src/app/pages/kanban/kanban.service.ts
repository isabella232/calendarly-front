import { SharedService } from './../../providers/shared.service';
import { config } from './../../providers/config';
import { HttpClient } from '@angular/common/http';
import { PostService } from './../post/post.service';
import { Injectable } from '@angular/core';
// import 'rxjs/operators';
// import 'rxjs'
import { catchError } from 'rxjs/operators/catchError';
@Injectable()
export class KanbanService {

  constructor(private postService:PostService,private http:HttpClient,
  private sharedService:SharedService) { }

}
