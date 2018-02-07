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


@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    Ng2ImgFallbackModule,
    BsDropdownModule.forRoot()
    // PostRoutingModule
  ],
  declarations: [CreatePostComponent,PostViewComponent,ContinuePipe],
  exports:[CreatePostComponent,PostViewComponent],
  providers:[PostService]
})
export class PostModule { }
