import { config } from './../../providers/config';
import { AppState } from './../../store/app.reducers';
import { SharedService } from './../../providers/shared.service';
import { EventsService } from './../../providers/events.service';
import { ContainerService } from './../../providers/container.service';
import * as CalendarActions from './../../calendar/store/calendar.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { PostService } from './../post.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
declare var $:any;
import * as moment from 'moment';
import * as _ from 'underscore';
declare var swal:any;

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(private fb:FormBuilder,private container:ContainerService,private postService:PostService,
    private eventsService:EventsService,private sharedService:SharedService,
    private store:Store<AppState>,
    private router:Router
) { }
  createPost:FormGroup;
  editMode=false;
  isSubmitClicked=false;
  images=config.images;
  todayDate=new Date()
  minDate = new Date(2017, 5, 10);
  dateMask=[/[1-9]/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  maxDate = new Date(2018, 9, 15);
  files=[];
  @Output() exit = new EventEmitter();
  @Output() formSubmitted=new EventEmitter();
  @Output() formUpdated=new EventEmitter();
  @Input() date;
  @Input() time;
    submitForm()
    {
        this.createPost.patchValue({
            description:$('.html-editor').summernote('code'),
            date:this.date,
            time:this.time,
            tags:this.tags,
            socialMedia:this.profiles,
            topics:this.topics
        })

        console.log(this.createPost.value)
        this.isSubmitClicked=true;
        if(this.createPost.valid)
        {
            this.store.dispatch(new CalendarActions.CreatePost(this.postService.mapPostToCalendarly(this.createPost.value)));
        }
    }

    suggestedTopics=[];
    suggestTopics(e?:any,topic?:any)
    {
        console.log(e)

        if(e.keyCode===13)
        {
            this.suggestedTopics=[];

           this.topics.push(this.topic);
           return this.topic=''
        }
        else{
            this.sharedService.searchtext(this.topic).subscribe((res:any)=>{
                console.log(res);
                this.suggestedTopics=res.epics;
            })
        }
       
    }

    toggleVisibility(file)
    {
        file.isVisible=!file.isVisible;
        this.postService.updateAttachment({isVisible:file.isVisible,id:file.id}).subscribe(res=>{
            console.log(res)
        },er=>console.log(er))
    }

    cancel()
    {
        this.exit.emit(null);
    }

    deleteFile(file,index)
    {
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            swal.showLoading()
            if (result.value) {
                this.postService.deleteAttachment(file).subscribe(res=>{
                    swal.hideLoading()
                    console.log(res)
                    this.files.splice(index,1);
                    swal(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                },er=>{
                    console.log(er)
                })
            }
          })
  
    }
  @Input() postData;
  initJqueryData()
  {

    if(this.postData)
    {
        $('.html-editor').summernote('code',this.postData.description,{
            height:150
        });
    }
    else{
        $('#editor').trumbowyg();
    }


   $('file-images').hover(()=>{
       $(this).next().css({'display':'none'})
   })
    
  }    
  
  initDatetimePicker()
  {
      var dp=$('.date-picker1').datetimepicker({
          format: 'MM/DD/YYYY',
          defaultDate:new Date()
      }).on('dp.change',(e)=>
      {
          console.log(e)
          this.createPost.patchValue({
              date:e.date.toDate()
          })
      });

      var tp=$('.time-picker1').datetimepicker({
          format: 'LT',
          defaultDate:new Date()
      });

      $('.date-picker1').on('dp.change',(e)=>
      {
          console.log(e)
          this.createPost.patchValue({
              date:e.date.toDate()
          })
      })

      $('.time-picker1').on('dp.change',(e)=>
      {
          console.log(e)
          this.createPost.patchValue({
              time:e.date.toDate()
          })        })

  }


  private initForm()
  {
     this.createPost=this.fb.group({
         title:this.fb.control(null,[Validators.required]),
         description:this.fb.control('asd'),
         date:this.fb.control(this.todayDate,[Validators.required]),
         time:this.fb.control(null,[Validators.required]),
         topic:this.fb.control("Topic 1,Topic 2",[Validators.required]),
         tags:this.fb.control("Tag A,Tag B",[Validators.required]),
         socialMedia:this.fb.control("Facebook,Linked In",[Validators.required]),
     })
  }

  updatePost()
  {
      var val=this.createPost.value;
      var post={
          ...val,
          project:this.postData.project,
          version:this.postData.version,
          id:this.postData.id,
          tags:this.tags,
          topics:this.topics,
          profiles:this.profiles
      }
      this.postService.updatePost(this.postService.mapPostToCalendarly(post)).subscribe(res=>{
            this.sharedService.notify('Post updated Successfully')
        console.log(res)
        })
    
  }
  topics=['Topic-1','Topic-2'];
  tags=['Tag-A','Tag-B'];
  profiles=['Facebook-A','Linked-In'];
  topic='';
  tag='';
  profile='';
  
  addTopic(topic:string)
  {
      console.log(topic,'topic')
      if(topic.length===0)
      {
          return false;
      }
      if(this.topics.indexOf(topic)===-1)
      {
        this.topics.push(topic);
        this.topic=''
      }
  }


  addTag(tag)
  {
      if(!this.tag)
      {
          return false;
      }
      if(this.tags.indexOf(tag)===-1)
      {
        this.tags.push(tag);
        this.tag=''
    }
  }

 
  addProfile(profile)
  {
      if(!this.profile)
      {
          return false;
      }
      if(this.profiles.indexOf(profile)===-1)
      {
        this.profiles.push(profile);
        this.profile=''
    }
    //   this.profile=''
  }

  removeTopic(index)
  {
    this.topics.splice(index,1)
  }

  removeTag(index)
  {
    this.tags.splice(index,1)
  }


  removeProfile(index)
  {
    this.profiles.splice(index,1)
  }
  ngOnInit() {
      console.log(this.postData)
    this.initForm();

    $("#topicTag").on('keyup',()=>{
        console.log('hello')
        this.suggestTopics();
    })
    if(this.postData)
      {
          this.editMode=true;
          this.createPost.patchValue(this.postData);
          this.topics=this.postData.tags.split(',');
          console.log('data found',this.postData);

          this.postService.getAttachments(this.postData).subscribe((files:any[])=>{
              console.log(files)
              this.files=files;
          })
      }
  }


  uploadFiles()
  {
      $('#fileUpload').click()
  }

  goback()
  {
      this.router.navigate(['/','calendar'])
  }

  selectFiles(event)
  {
    this.eventsService.showLoader.next(true);
    console.log(event)
    var file=event.target.files[0];

    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
        reverseButtons: true
      })
.then((result) => {
    console.log(result,'result')
       if(result.value)
       {
     var formData=new FormData()
     formData.append('project',this.container.projectId.toString())
     formData.append('attached_file',file,file.name)
     formData.append('object_id',this.postData.id)
     
     swal.showLoading()

     this.postService.createAttachment(formData).subscribe(res=>{
        this.files.push(res);
         console.log(res)
         swal.hideLoading() 
     },er=>{
         console.log(er);
         swal.hideLoading() 
     })
       }
      })
  }

  ngAfterViewInit()
  {
    $('.editor').trumbowyg({
        svgPath: './assets/img/icons.svg'
    });

    this.initJqueryData()   
  }

}
