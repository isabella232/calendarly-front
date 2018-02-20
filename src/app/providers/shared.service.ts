import { catchError } from 'rxjs/operators/catchError';
import { Observable } from 'rxjs/Observable';
import { ContainerService } from './container.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from './config';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { element } from 'protractor';
import { EventsService } from './events.service';

// import {catchError}
@Injectable()
export class SharedService {

    // Sidebar visibility
    sidebarVisible: boolean
    sidebarVisibilitySubject: Subject<boolean> = new Subject<boolean>()
    createPostSubject: Subject<boolean> = new Subject<boolean>();
    createTopicSubject: Subject<boolean> = new Subject<boolean>();
    
    toggleSidebarVisibilty() {
        this.sidebarVisible = !this.sidebarVisible
        this.sidebarVisibilitySubject.next(this.sidebarVisible)
    }

    addMember(data)
  {
    return this.http.post(config.url+'/api/v1/memberships',data)
  }

    // Theming
    maTheme: string
    maThemeSubject: Subject<string> = new Subject<string>()

    setTheme(color) {
        this.maTheme = color
        this.maThemeSubject.next(this.maTheme)
    }

    getProjectTemplate()
    {
        var token=this.container.cypheredToken;
        var headers=new HttpHeaders();
        headers.append('Application',token)
        return this.http.get(config.url+'/api/v1/project-templates').map(res=>{
            this.container.projectTemplate=res[0];
            return res[0];
        })
    }

    searchtext(text)
    {
        return this.http.get(config.url+`/api/v1/search?project=${this.container.projectId}\&text=`+text)
    }

    constructor(private http:HttpClient,private container:ContainerService,
    private eventsService:EventsService)  {
        // Hidden the sidebar by default
        this.sidebarVisible = false

        // Set default theme as green
        this.maTheme = 'green'
    }

    handleError(er)
    {
        return Observable.throw(er || 'Server error')
    }


  getUserDetails(id)
  {
    return this.http.get(config.url+`/api/v1/users/`+id).map((res:any)=>{
      this.eventsService.userUpdated.next(res);
      this.container.user=res;
      console.log(res);
      return res;
    }).pipe(catchError(this.handleError));
  }


}