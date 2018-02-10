import { ContainerService } from './container.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from './config';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {

    // Sidebar visibility
    sidebarVisible: boolean
    sidebarVisibilitySubject: Subject<boolean> = new Subject<boolean>()

    toggleSidebarVisibilty() {
        this.sidebarVisible = !this.sidebarVisible
        this.sidebarVisibilitySubject.next(this.sidebarVisible)
    }

    // Theming
    maTheme: string
    maThemeSubject: Subject<string> = new Subject<string>()

    setTheme(color) {
        this.maTheme = color
        this.maThemeSubject.next(this.maTheme)
    }

    // getProjectTemplate()
    // {
    //     var token=this.container.cypheredToken;
    //     var headers=new HttpHeaders();
    //     headers.append('Application',token)
    //     return this.http.get(config.url+'/api/v1/project-templates').map(res=>{
    //         this.container.projectTemplate=res[0];
    //         return res[0];
    //     })
    // }

    constructor(private http:HttpClient)  {
        // Hidden the sidebar by default
        this.sidebarVisible = false

        // Set default theme as green
        this.maTheme = 'green'
    }


}