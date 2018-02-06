import { ContainerService } from './../../providers/container.service';
import { EventsService } from './../../providers/events.service';
import { config } from './../../providers/config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'profile1',
  templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {
  images=config.images;
  constructor(private eventsService:EventsService,private container:ContainerService) { }
  data=[];
  ngOnInit() {
    this.user=this.container.user;
    this.userUpdated();
  }
  user;
  userUpdated()
  {

    this.eventsService.userUpdated.subscribe(user=>{
      this.user=user;
    })

  }

}
