import { SharedService } from './../providers/shared.service';
import { config } from './../providers/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { catchError } from 'rxjs/operators/catchError';
@Injectable()
export class KanbanService {

  constructor(private http:HttpClient,
  private sharedService:SharedService) { }

    editBoard(id,data)
    {
      return this.http.patch(config.url+'/api/v1/userstories/'+id,data)
      .pipe(catchError(this.sharedService.handleError));
    }

}
