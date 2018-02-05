import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'fullcalendar',
  templateUrl: './fullcalendar.html'
})
export class FullcalendarComponent implements OnInit {
  date;
  
  constructor(private router:Router) { }
  initCalendar()
  {
      console.log('initing calendar')
     // $(document).ready(function() {
       var date = new Date();
       var d = date.getDate();
       var m = date.getMonth();
       var y = date.getFullYear();

       var cId = $('#calendar'); //Change the name if you want. I'm also using thsi add button for more actions
 
       //Generate the Calendar
       cId.fullCalendar({
           header: {
               right: '',
               center: 'prev, title, next',
               left: ''
           },
 
           theme: true, //Do not remove this as it ruin the design
           selectable: true,
           selectHelper: true,
           editable: true,
 
           //Add Events
           events: [
            {
              title: 'All Day Event',
              start: '2016-09-01'
            },
            {
              title: 'Long Event',
              start: '2016-09-07',
              end: '2016-09-10'
            },
            {
              id: 999,
              title: 'Repeating Event',
              start: '2016-09-09T16:00:00'
            },
            {
              id: 999,
              title: 'Repeating Event',
              start: '2016-09-16T16:00:00'
            },
            {
              title: 'Conference',
              start: '2016-09-11',
              end: '2016-09-13'
            },
            {
              title: 'Meeting',
              start: '2016-09-12T10:30:00',
              end: '2016-09-12T12:30:00'
            },
            {
              title: 'Lunch',
              start: '2016-09-12T12:00:00'
            },
            {
              title: 'Meeting',
              start: '2016-09-12T14:30:00'
            },
            {
              title: 'Happy Hour',
              start: '2016-09-12T17:30:00'
            },
            {
              title: 'Dinner',
              start: '2016-09-12T20:00:00'
            },
            {
              title: 'Birthday Party',
              start: '2016-09-13T07:00:00'
            },
            {
              title: 'Click for Google',
              url: 'http://google.com/',
              start: '2016-09-28'
            }
          ],
           eventClick: (calEvent, jsEvent, view)=> {
               this.router.navigate(['/','post',calEvent._id])
           },
            
           //On Day Select
           select: (start, end, allDay) =>{
              //  $('#addNew-event').modal('show');   
               $('#addNew-event input:text').val('');
               $('#getStart').val(start);
               $('#getEnd').val(end);
           },
           dayClick: (date, jsEvent, view)=> {
               console.log(date)
               this.date=date.toDate();
              //  this.isEditMode=false;
     $(this).css('background-color', 'red');

             }
           });

       var actionMenu = '<ul class="actions actions-alt" id="fc-actions">' +
                           '<li class="dropdown">' +
                               '<a href="" data-toggle="dropdown"><i class="md md-more-vert"></i></a>' +
                               '<ul class="dropdown-menu dropdown-menu-right">' +
                                   '<li class="active">' +
                                       '<a data-view="month" href="">Month View</a>' +
                                   '</li>' +
                                   '<li>' +
                                       '<a data-view="basicWeek" href="">Week View</a>' +
                                   '</li>' +
                                   '<li>' +
                                       '<a data-view="agendaWeek" href="">Agenda Week View</a>' +
                                   '</li>' +
                                   '<li>' +
                                       '<a data-view="basicDay" href="">Day View</a>' +
                                   '</li>' +
                                   '<li>' +
                                       '<a data-view="agendaDay" href="">Agenda Day View</a>' +
                                   '</li>' +
                               '</ul>' +
                           '</div>' +
                       '</li>';
 
 
       cId.find('.fc-toolbar').append(actionMenu);
       
       //Event Tag Selector
       (function(){
           $('body').on('click', '.event-tag > span', function(){
               $('.event-tag > span').removeClass('selected');
               $(this).addClass('selected');
           });
       })();
       $('body').on('click', '#fc-actions [data-view]', function(e){
           e.preventDefault();
           var dataView = $(this).attr('data-view');
           
           $('#fc-actions li').removeClass('active');
           $(this).parent().addClass('active');
           cId.fullCalendar('changeView', dataView);  
       }); 
  }

  ngOnInit() {
    this.initCalendar();
  }

}
