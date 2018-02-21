import { CreateTopicComponent } from './create-topic/create-topic.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Ng2ImgFallbackModule } from 'ng2-img-fallback';
import { ContinuePipe } from './../../pipes/continue.pipe';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { PostService } from './post.service';
import { PostViewComponent } from './post-view/post-view.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PostRoutingModule } from './post.routing.module';
import { CalendarService } from '../calendar/calendar.service';
import { TextMaskModule } from 'angular2-text-mask';
import { ColorPickerModule } from 'ng2-color-picker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    Ng2ImgFallbackModule,
    BsDropdownModule.forRoot(),
    TextMaskModule,
    TypeaheadModule
  ],
  declarations: [CreatePostComponent,PostViewComponent,ContinuePipe,CreateTopicComponent],
  exports:[CreatePostComponent,PostViewComponent,CreateTopicComponent],
  providers:[PostService]
})
export class PostModule { }
