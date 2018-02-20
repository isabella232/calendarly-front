import { SharedService } from './../../../providers/shared.service';
import { Router } from '@angular/router';
import { config } from './../../../providers/config';
import { ContainerService } from './../../../providers/container.service';
import { PostService } from './../post.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
declare var $:any;
import * as moment from 'moment';
import * as _ from 'underscore';
declare var swal:any;

import { EventsService } from '../../../providers/events.service';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(private fb:FormBuilder,private container:ContainerService,private postService:PostService,
    private eventsService:EventsService,private sharedService:SharedService,
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
        // this.createPost.value.tags=this.createPost.value.tags.split(',')
        // this.createPost.value.project=9;
        // this.createPost.value.subject=this.createPost.value.title;

        // console.log(this.createPost.value)
        // console.log(this.createPost.valid)
        this.isSubmitClicked=true;
        if(this.createPost.valid)
        {
            this.formSubmitted.emit(this.postService.mapPostToCalendarly(this.createPost.value));
        }
    }

    suggestedTopics=[];
    suggestTopics()
    {
        // var topic=this.topic;
        // console.log(this.createPost.value.topic)
        this.sharedService.searchtext(this.topic).subscribe((res:any)=>{
            console.log(res);
            this.suggestedTopics=res.epics;
        })
    }

    toggleVisibility(file)
    {
        // var formData=new FormData();
        // formData.append('attached_file',file,file.name)

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
    //   console.log(this.postData)
    // this.initDatetimePicker();
    
    $(".tagsinput").tagsinput();


    if(this.postData)
    {
        $('.html-editor').summernote('code',this.postData.description,{
            height:150
        });
    }
    else{

        $('.html-editor').summernote({
            height: 150
        });
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
      _.extend(this.postData,val)           
    this.formUpdated.emit(this.postService.mapPostToTaiga(this.postData));
    
  }
  topics=['Topic-1','Topic-2'];
  tags=['Tag-A','Tag-B'];
  profiles=['Facebook-A','Linked-In'];
  topic;
  tag;
  profile;
  
  addTopic(topic)
  {
      if(this.topic==='')
      {
          return false;
      }
      if(this.topics.indexOf(topic)===-1)
      {
        this.topics.push(topic);
      }
      this.topic=''
  }


  addTag(tag)
  {
      if(this.tag==='')
      {
          return false;
      }
      if(this.tags.indexOf(tag)===-1)
      {
        this.tags.push(tag);
      }
      this.tag=''
  }

 
  addProfile(profile)
  {
      if(this.profile==='')
      {
          return false;
      }
      if(this.profiles.indexOf(profile)===-1)
      {
        this.profiles.push(profile);
      }
      this.profile=''
  }

  removeTopic(topic)
  {
      var index;
      this.topics.forEach((o,i)=>{
          if(o===topic)
          {
             index=i;
          }
      })

      this.topics.splice(index,1)
  }


  removeTag(tag)
  {
      var index;
      this.tags.forEach((o,i)=>{
          if(o===tag)
          {
             index=i;
          }
      })

      this.tags.splice(index,1)
  }


  removeProfile(profile)
  {
      var index;
      this.profiles.forEach((o,i)=>{
          if(o===profile)
          {
             index=i;
          }
      })

      this.profiles.splice(index,1)
  }

  ngOnInit() {
    //   this.time=this.date;
      console.log(this.postData)
    this.initForm();

    $("#topicTag").on('keyup',()=>{
        console.log('hello')
        this.suggestTopics();
    })
    // this.initJqueryData();
   
    // console.log(this.postData)
    if(this.postData)
      {
          this.editMode=true;
        //   this.date=this.postData.date;
        // this.time=this.postData.time;
          this.createPost.patchValue(this.postData);
          this.topics=this.postData.tags.split(',');
          console.log('data found',this.postData);

          this.postService.getAttachments(this.postData).subscribe((files:any[])=>{
              console.log(files)
              this.files=files;
          })
      }
  }

//   exit()
//   {
//     this.route
//   }
  
  

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
    this.initJqueryData()   
  }

}
