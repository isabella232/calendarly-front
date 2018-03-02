import { DragulaModule } from 'ng2-dragula';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PostModule } from './../post/post.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthInterceptor } from './../providers/interceptors/auth-interceptor.service';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    PostModule,
    BsDropdownModule.forRoot(),
    DragulaModule
  ],
  declarations: [],
  providers:[ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  exports:[HttpClientModule,ModalModule,PostModule,BsDropdownModule,DragulaModule]
})
export class CoreModule { }
