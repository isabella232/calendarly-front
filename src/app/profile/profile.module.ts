import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
// import { ImgFallbackModule } from 'ngx-img-fallback';


@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ProfileComponent],
  exports:[],
  providers:[]
})
export class ProfileModule { }
