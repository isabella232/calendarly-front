import { SharedService } from './providers/shared.service';
// import { SharedService } from "./shared/services/shared.service";
import { Router,NavigationStart,NavigationEnd } from '@angular/router';
import { Component, state } from '@angular/core';
import { EventsService } from './providers/events.service';
import { ContainerService } from './providers/container.service';
import { RouteConfigLoadStart, RouteConfigLoadEnd } from "@angular/router";
import { Spinkit } from 'ng-http-loader/spinkits';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.scss']
})

export class AppComponent {
   spinkit = Spinkit;
  title = 'app';

  constructor(private eventsService:EventsService,private sharedService:SharedService,private router:Router,private container:ContainerService){}

  ngOnInit() {
    this.exitUser();
    this.showLoader();
    
  }

  showLoader()
  {
    this.router.events.subscribe(e=>{
      if(e instanceof NavigationStart)
      {
        // this.loading=true;
      }
      if(e instanceof NavigationEnd)
      {
        // this.loading=false;
        this.sharedService.sidebarVisibilitySubject.next(false);
      }
    })

    // this.eventsService.showLoader.subscribe(show=>{
    //   this.loading=show;
    // })
  }

  loading=false;
  exitUser()
  {
    this.eventsService.exitUser.subscribe(()=>{
      this.router.navigate(['/','pages','login']);
      window[this.container.storageStrategy].removeItem('cypheredToken')
      window[this.container.storageStrategy].removeItem('authToken');
      window[this.container.storageStrategy].removeItem('auth_code')
      this.sharedService.notify('You were logged out')
    })
  }

}

