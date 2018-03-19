import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import * as moment from 'moment';
declare var $:any;

@Component({
  selector: 'fullcalendar',
  templateUrl: './fullcalendar.component.html',
  styleUrls: ['./fullcalendar.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FullcalendarComponent implements OnInit {

  constructor() { }
  @Input() posts=[];
  @Input() date;  
  @Output() showCreatePost:EventEmitter<any> = new EventEmitter();;
  @Output() navigateToPost:EventEmitter<any> = new EventEmitter();;

  fullCalendar;

  ngOnInit() {
    this.initCalendar(this.posts);
  }

  initCalendar(posts?:any[]) {
    $('#calendar').fullCalendar('destroy');
    var height;
    if(window.innerWidth>600)
    {
      height=undefined;
    }
    else{
      height=650;
    }
    this.fullCalendar=$('#calendar')
    
    this.fullCalendar.fullCalendar({
      header: {
          right: '',
          center: 'prev, title, next',
          left: ''
      },
      eventLimit: true,
      height:height,
      theme: true, //Do not remove this as it ruin the design
      selectable: true,
      selectHelper: true,
      editable: true,
      defaultDate:moment(this.date),
      events: posts?posts:[],
      eventClick: (calEvent, jsEvent, view)=> {
        this.navigateToPost.emit(calEvent._id)
      },
      select: (start, end, allDay) =>{
        this.showCreatePost.emit();
      },
      dayClick: (date, jsEvent, view)=> {
          this.date=date.toDate();
      $(this).css('background-color', 'red');

        }
      });
  }

  ngOnChanges(change)
  {
    console.log(change);
   if(change.posts)
   {
     this.posts=change.posts.currentValue;
   }
  }

}
