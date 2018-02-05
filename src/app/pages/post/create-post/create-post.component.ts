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
    private eventsService:EventsService,
    private router:Router
) { }
  createPost:FormGroup;
  editMode=false;
  isSubmitClicked=false;
  images=config.images;
  todayDate=new Date()
  minDate = new Date(2017, 5, 10);
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
            tags:$('#tagsinput').val(),
            socialMedia:$("#socialMedia").val()
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
            // console.log(this.createPost.value)
            // var post=this.postService.mapPostToCalendarly(this.createPost.value)

            // console.log(post)
            this.formSubmitted.emit(this.postService.mapPostToCalendarly(this.createPost.value));
        }
    }

    mapPostToCalendarly(post)
    {


    }

    toggleVisibility(file)
    {
        file.isVisible=!file.isVisible
    }

    cancel()
    {
        this.exit.emit(null);
    }

    deleteFile(file,index)
    {
        this.postService.deleteAttachment(file).subscribe(res=>{
            console.log(res)
            this.files.splice(index,1)
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

  ngOnInit() {
    //   this.time=this.date;
      console.log(this.postData)
    this.initForm();
    // this.initJqueryData();
   
    // console.log(this.postData)
    if(this.postData)
      {
          this.editMode=true;
        //   this.date=this.postData.date;
        // this.time=this.postData.time;
          this.createPost.patchValue(this.postData);
          console.log('data found');

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
