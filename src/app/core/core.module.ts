import { AuthInterceptor } from './../providers/interceptors/auth-interceptor.service';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers:[ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  exports:[HttpClientModule]
})
export class CoreModule { }
