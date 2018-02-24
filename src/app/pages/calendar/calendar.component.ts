import * as CalendarActions from './store/calendar.actions';
import { AppState } from './../../store/app.reducers';
import { SharedService } from './../../providers/shared.service';
import { PostService } from './../post/post.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { CalendarService } from './calendar.service';
import { Component, OnInit, ViewChild } from '@angular/core';
declare var $:any;
declare var swal:any;
import * as _ from 'underscore';
import { ContainerService } from '../../providers/container.service';
import { Store } from '@ngrx/store';
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
  private store:Store<AppState>,private route: ActivatedRoute) { }
  date:Date;
  currentPost;
  roles=[];
  showCalendar=false;
  fullCalendar;
  user:any={};
    addMember()
    {
      this.user.role=Number(this.user.role)
      console.log(this.user)
        this.calendarService.addMember({project:this.container.projectId,...this.user}).subscribe(res=>{
          console.log(res)
        })
    }

  initCalendar(posts?:any[]) {
    this.fullCalendar=$('#calendar')
    
    this.fullCalendar.fullCalendar({
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
      events: posts?posts:[],
      eventClick: (calEvent, jsEvent, view)=> {
          this.router.navigate(['/','post',calEvent._id])
      },
       
      //On Day Select
      select: (start, end, allDay) =>{
        this.createPost.show();
          // $('#addNew-event').modal('show');   
          // $('#addNew-event input:text').val('');
          // $('#getStart').val(start);
          // $('#getEnd').val(end);
      },
      dayClick: (date, jsEvent, view)=> {
          // console.log(date)
          this.date=date.toDate();
          // this.isEditMode=false;
$(this).css('background-color', 'red');

        }
      });

  }

  addPost(post)
  {

    var mappedPost=this.calendarService.mapPostToCalendar(post);
    console.log(mappedPost)
     swal('Post Added','Post has been added to your calendar','success').then(()=>{
         this.calendarService.addPost(mappedPost);
         $("#calendar").fullCalendar( 'renderEvent', mappedPost ,true);            
        //  $('.modal').modal('hide');
         this.createPost.hide();
         // this.createPost.reset();
         // this.createPost.markAsUntouched();
         
     })
     
  }

  updatePost()
  {
     swal({
         title: 'Are you sure?',
         text: "You want to update this post",
         type: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, update it!'
       }).then((res)=>{
           if(res.value)
           {
             this.calendarService.updatePost(this.currentPost);
             $("#calendar").fullCalendar( 'updateEvent', this.currentPost);   
           }
       })
  }

  deletePost(post)
  {
      this.postService.deletePost(post);
      swal({
         title: 'Are you sure?',
         text: "You want to delete this post",
         type: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, delete it!'
       }).then((result) => {
         if (result.value) {
           swal(
             'Deleted!',
             'The post has been removed from the calendar',
             'success'
           ).then(()=>{
               console.log(post)
             $("#calendar").fullCalendar( 'removeEvents', post._id );
             $('.modal').modal('hide');
             
           })
         }
       })    
  }
  
  submitForm(post)
  {
    console.log(post,'post')
     this.postService.createPost(post).subscribe(res=>{
         console.log(res)
         _.extend(post,res);
         this.addPost(post);
         this.store.dispatch(new CalendarActions.CreatePost(post));
     },er=>{ 
       console.log(er)
     })
  }
  subscription;
  posts=[];
  ngOnInit()
  {
    this.subscription=this.store.select('calendar').subscribe(state=>{
      console.log(state);
      this.initCalendar( state.posts );
      this.showCalendar=true
    })
  this.container.customAttributes.forEach(obj=>{
    this.container.customAttributes[obj.name]=obj;
  })
  this.sharedService.createTopicSubject.subscribe(()=>{
      this.createTopic.show();
    })
  }
  
  exit()
  {
    this.createPost.hide();
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
    this.showCalendar=false

  }


}
