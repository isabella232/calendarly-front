import * as CalendarActions from './../../calendar/store/calendar.actions';
import { AppState } from './../../store/app.reducers';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { config } from './../../providers/config';
import { ContainerService } from './../../providers/container.service';
import { PostService } from './../post.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent {

  constructor(private fb:FormBuilder,private container:ContainerService,private store:Store<AppState>,
    private router:Router
) { }

createTopic:FormGroup;
topicData:any;
initJqueryData()
  {
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
        description:this.fb.control(null)
    })
}

submitForm()
{
    this.createTopic.patchValue({
        description:$('.html-editor').summernote('code'),
        tags:this.tags
    })

    console.log(this.createTopic.value)
    var topic=this.createTopic.value
    topic.subject=topic.title;
    topic.project=this.container.projectId;
    if(this.createTopic.valid)
    {
        this.store.dispatch(new CalendarActions.CreateTopic(topic));
    }
}

removeTag(index)
{
    this.tags.splice(index,1)
}

tag;
tags=['Tag-A','Tag-B'];

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

ngOnInit()
{
    this.initForm();
}

}
