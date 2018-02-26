import { EventsService } from './../../providers/events.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PostService } from './../../pages/post/post.service';
import { ContainerService } from './../../providers/container.service';
import { CalendarService } from './../../pages/calendar/calendar.service';
import { SharedService } from './../../providers/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'underscore';
declare var $:any
declare var swal:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss'
  ]
})
export class HeaderComponent implements OnInit {
  messagesData: Array<any>;
  tasksData: Array<any>;
  maThemeModel: string = 'green';

  setTheme() {
    this.sharedService.setTheme(this.maThemeModel)
  }

  submitForm(post)
  {
    console.log(post,'post')
     //  var post=this.createPost.value;
     // this.createPost.value.description=this.postDescription;
      // console.log(post);

     this.postService.createPost(post).subscribe(res=>{
         console.log(res)
         _.extend(post,res);
         this.addPost(post);
     },er=>{ 
       console.log(er)
     })


      
  }
  @ViewChild('createPost') createPost:ModalDirective
  @ViewChild('createTopic') createTopic:ModalDirective

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

  // searchtext(text)
  // {
  //   this.sharedService.searchtext(text).subscribe(res=>{
  //     console.log(res);
  //   })
  // }

  createItem(type){
    console.log(type);
    if(type==='post')
    {
      this.sharedService.createPostSubject.next();
    }

    if(type=='topic')
    {
      this.sharedService.createTopicSubject.next();
    }
  }
  exit()
  {
    this.createPost.hide();
  }
  addMember()
  {
    this.user.role=Number(this.user.role)
    console.log(this.user)
      this.calendarService.addMember({project:this.container.projectId,...this.user}).subscribe(res=>{
        this.sharedService.notify('Member added Successfully')
        console.log(res)
      })
  }
  date=new Date();

  constructor(private postService:PostService,private sharedService: SharedService,private calendarService:CalendarService,
  private container:ContainerService,private eventsService:EventsService) {
    sharedService.maThemeSubject.subscribe((value) => {
      this.maThemeModel = value
    })

    this.messagesData = [
      {
        image: './assets/demo/img/profile-pics/1.jpg',
        name: 'David Belle',
        message: 'Cum sociis natoque penatibus et magnis dis parturient montes',
        date: '12:01 PM'
      },
      {
        image: './assets/demo/img/profile-pics/2.jpg',
        name: 'Jonathan Morris',
        message: 'Nunc quis diam diamurabitur at dolor elementum, dictum turpis vel',
        date: '02:45 PM'
      },
      {
        image: './assets/demo/img/profile-pics/6.jpg',
        name: 'Fredric Mitchell Jr.',
        message: 'Phasellus a ante et est ornare accumsan at vel magnauis blandit turpis at augue ultricies',
        date: '08:21 PM'
      },
      {
        image: './assets/demo/img/profile-pics/4.jpg',
        name: 'Glenn Jecobs',
        message: 'Ut vitae lacus sem ellentesque maximus, nunc sit amet varius dignissim, dui est consectetur neque',
        date: '08:43 PM'
      },
      {
        image: './assets/demo/img/profile-pics/5.jpg',
        name: 'Bill Phillips',
        message: 'Proin laoreet commodo eros id faucibus. Donec ligula quam, imperdiet vel ante placerat',
        date: '11:32 PM'
      }
    ];

    this.tasksData = [
      {
        name: 'HTML5 Validation Report',
        completed: 95,
        color: ''
      },{
        name: 'Google Chrome Extension',
        completed: '80',
        color: 'success'
      },{
        name: 'Social Intranet Projects',
        completed: '20',
        color: 'warning'
      },{
        name: 'Bootstrap Admin Template',
        completed: '60',
        color: 'danger'
      },{
        name: 'Youtube Client App',
        completed: '80',
        color: 'info'
      }
    ]
  }
  roles=[];
  user:any={};
  ngOnInit() {
    this.sharedService.getProjectTemplate().subscribe(template=>{
      this.container.projectTemplate=template[1];
      this.eventsService.getProjectTemplate.next(template)
      this.roles=template.roles;
      this.user.role=this.roles[0];
    })
  }
}