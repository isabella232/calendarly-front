import { AuthService } from './../../providers/auth.service';
import { EventsService } from './../../providers/events.service';
import { Component, OnInit, trigger, state, style, transition, animate} from '@angular/core';
import { SharedService } from "../../shared/services/shared.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    animations: [
        trigger('toggleHeight', [
            state('inactive', style({
                height: '0',
                opacity: '0'
            })),
            state('active', style({
                height: '*',
                opacity: '1'
            })),
            transition('inactive => active', animate('200ms ease-in')),
            transition('active => inactive', animate('200ms ease-out'))
        ])
    ]
})


export class NavigationComponent implements OnInit {
    sidebarVisible: boolean;

    getUser()
    {
      this.authService.getUserDetails().subscribe(user=>{
        this.user=user;
      })
    }
    // Sub menu visibilities
    navigationSubState:any = {
        Tables: 'inactive',
        Forms: 'inactive',
        SamplePages: 'inactive',
        UserInterface: 'inactive',
        Components: 'inactive',
        Charts: 'inactive',
    };

    // Toggle sub menu
    toggleNavigationSub(menu, event) {
        event.preventDefault();
        this.navigationSubState[menu] = (this.navigationSubState[menu] === 'inactive' ? 'active' : 'inactive');
    }

    constructor(private sharedService: SharedService,private router:Router,
        private authService:AuthService,
    private eventsService:EventsService) {
        sharedService.sidebarVisibilitySubject.subscribe((value) => {
            this.sidebarVisible = value
        })
    }
    user;

  logout()
  {
      this.eventsService.exitUser.next();
      
  }

  userUpdated()
  {
    this.eventsService.userUpdated.subscribe(user=>{
      console.log(user)
      this.user=user;
    })
  }
 


    ngOnInit() {
        this.getUser();

    }
}
