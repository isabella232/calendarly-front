import { ContainerService } from './../../providers/container.service';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
declare var $:any;
import * as moment from 'moment';
import * as _ from 'underscore';
import { CalendarService } from '../../calendar/calendar.service';
declare var swal:any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent  {

  constructor(private fb:FormBuilder,private container:ContainerService,private calendarService:CalendarService) { }
  @Input() roles;
  // user:any={};
  role;
  username;
  ngOnInit()
  {}  

  addMember()
  {
    // this.user.role=Number(this.user.role)
    console.log(this.role)
    console.log(this.username)
      this.calendarService.addMember({project:this.container.projectId,role:this.role,username:this.username}).subscribe(res=>{
        console.log(res)
      })
  }

}
