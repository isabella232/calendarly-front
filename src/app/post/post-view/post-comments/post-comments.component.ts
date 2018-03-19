import * as CalendarActions from './../../../calendar/store/calendar.actions';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { config } from '../../../providers/config';
import { AppState } from '../../../store/app.reducers';
import { Store } from '@ngrx/store';
declare var swal:any;

@Component({
  selector: 'post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PostCommentsComponent implements OnInit {

  constructor(private store:Store<AppState>) { }
  @Input() comments;
  @Input() user;
  @Output() postComment=new EventEmitter<any>();
  @Output() editCommentEvent=new EventEmitter<any>();
  @Output() deleteComment=new EventEmitter<any>();
  lessComments=[];
  fallbackImg=config.images.fallbackImg;
  isViewLess=true;

  ngOnInit() {
  }

  toggleComments()
  {
   this.isViewLess=!this.isViewLess;
  }

  submitComment(comment)
  {
    console.log(comment,'comment');
    this.store.dispatch(new CalendarActions.AddComment(comment));
  }

  editComment(post,comment)
  {
    this.editCommentEvent.emit({post:post,comment:comment});
  }

  removeComment(comment,i)
  {
    swal({
      title: 'Are you sure?',
      text: "You will not be able to recover this post",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.value) {
        console.log(comment,'index')
        this.deleteComment.emit({comment:comment,index:i});
      }
    })
  }

  ngOnChanges(change)
  {
    console.log(change,'change')
    if(change.comments)
    {
      this.comments=change.comments.currentValue;
      if(this.comments.length>=2)
      {
        this.lessComments=[this.comments[0],this.comments[1]]
      }
      else{
        this.lessComments=this.comments;
      }
    }
  }

  // ngDoCheck(change)
  // {
  //   console.log(change);
  // }
}
