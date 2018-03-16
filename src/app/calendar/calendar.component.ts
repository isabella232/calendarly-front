import * as CalendarActions from './store/calendar.actions';
import { AppState } from './../store/app.reducers';
import { SharedService } from './../providers/shared.service';
import { PostService } from './../post/post.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { CalendarService } from './calendar.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ContainerService } from '../providers/container.service';
import { Store } from '@ngrx/store';
import * as moment from 'moment'

declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls:['./calendar.component.scss']
})
export class CalendarComponent  {
  @ViewChild('createPost') createPost:ModalDirective
  @ViewChild('createTopic') createTopic:ModalDirective
  constructor(private calendarService:CalendarService,
    private container:ContainerService,private router:Router,
    private postService:PostService,private sharedService:SharedService,
  private store:Store<AppState>) { }
  
  date:Date;
  currentPost;
  showCalendar=false;
  fullCalendar;
  subscription;
  posts=[];

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
          this.router.navigate(['/','post',calEvent._id])
      },
      select: (start, end, allDay) =>{
        this.createPost.show();
      },
      dayClick: (date, jsEvent, view)=> {
          this.date=date.toDate();
$(this).css('background-color', 'red');

        }
      });

  }

  navigateToPost(id)
  {
    this.router.navigate(['/','post',id]);
  }

  addPost(post)
  {

    var mappedPost=this.calendarService.mapPostToCalendar(post);
    console.log(mappedPost)
     swal('Post Added','Post has been added to your calendar','success').then(()=>{
         this.calendarService.addPost(mappedPost);
         $("#calendar").fullCalendar( 'renderEvent', mappedPost ,true);            
         this.createPost.hide();  
     })
     
  }

  // updatePost()
  // {
  //    swal({
  //        title: 'Are you sure?',
  //        text: "You want to update this post",
  //        type: 'warning',
  //        buttonIcons:{
  //         next:'a-  fa fa-chevron-circle-right a-' ,
  //         prev:'a-  fa fa-chevron-circle-left a-'
  //        },
  //        showCancelButton: true,
  //        confirmButtonColor: '#3085d6',
  //        cancelButtonColor: '#d33',
  //        confirmButtonText: 'Yes, update it!'
  //      }).then((res)=>{
  //          if(res.value)
  //          {
  //            this.calendarService.updatePost(this.currentPost);
  //            $("#calendar").fullCalendar( 'updateEvent', this.currentPost);   
  //          }
  //      })
  // }

  // deletePost(post)
  // {
  //     this.postService.deletePost(post);
  //     swal({
  //        title: 'Are you sure?',
  //        text: "You want to delete this post",
  //        type: 'warning',
  //        showCancelButton: true,
  //        confirmButtonColor: '#3085d6',
  //        cancelButtonColor: '#d33',
  //        confirmButtonText: 'Yes, delete it!'
  //      }).then((result) => {
  //        if (result.value) {
  //          swal(
  //            'Deleted!',
  //            'The post has been removed from the calendar',
  //            'success'
  //          ).then(()=>{
  //              console.log(post)
  //            $("#calendar").fullCalendar( 'removeEvents', post._id );
  //            $('.modal').modal('hide');
             
  //          })
  //        }
  //      })    
  // }
  
  // submitPost(post)
  // {
  //   console.log(post,'post')
  //   this.store.dispatch(new CalendarActions.CreatePost(post));
  // } 
  ngOnInit()
  {
    this.sharedService.notify('Welcome to Calendarly');
    this.subscription=this.store.select('calendar').subscribe(state=>{
      this.posts=state.posts
      console.log(state);
      this.initCalendar(state.posts);
      this.createPost.hide(); // remaining to handle on error!
    })
  }
  
  exit()
  {
    this.createPost.hide();
  }


}
