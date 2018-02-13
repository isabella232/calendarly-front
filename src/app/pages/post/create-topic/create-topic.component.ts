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
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent {

  constructor(private fb:FormBuilder,private container:ContainerService,private postService:PostService,
    private eventsService:EventsService,
    private router:Router
) { }

createTopic:FormGroup;
topicData:any;
@Output() topicSubmitted;
initJqueryData()
  {
    //   console.log(this.postData)
    // this.initDatetimePicker();
    
    $(".tagsinput").tagsinput();


    if(this.topicData)
    {
        $('.html-editor').summernote('code',this.topicData.description,{
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

initForm()
{
    this.createTopic=this.fb.group({
        title:this.fb.control(null),
        tags:this.fb.control(['Tag-A','Tag-B']),
        color:this.fb.control(null),
    })
}

submitForm()
{
    this.createTopic.patchValue({
        description:$('.html-editor').summernote('code'),
        tags:$('#tagsinput').val()
    })

    console.log(this.createTopic.value)
    if(this.createTopic.valid)
    {
         this.topicSubmitted.emit(this.postService.mapPostToCalendarly(this.createTopic.value));
    }
}

// cancel()
// {
//     // this.createTopic.hi
// }


ngOnInit()
{
    this.initForm();
}

}
