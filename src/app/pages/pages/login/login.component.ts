import { ContainerService } from './../../../providers/container.service';
import { AuthService } from './../../../providers/auth.service';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
// import { ToastrService } from 'toastr-ng2';

import {ModalDirective} from 'ngx-bootstrap'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,
  private container:ContainerService) { }

  loginForm:FormGroup;
  @ViewChild('forgotPasswordModal') forgotPasswordModal:ModalDirective;
  rememberMe=false;
  username;
  initForm()
  {

    this.loginForm=this.fb.group({
      username:this.fb.control(null),
      password:this.fb.control(null)
    })

  }

  emailPassword(userInfo)
  {
    this.authService.forgotPassword(userInfo).subscribe(res=>{
      console.log(res)
      this.forgotPasswordModal.hide();
    },er=>{
      console.log(er)
      this.forgotPasswordModal.hide();
    })
  }

  submitForm()
  {
    var userData=this.loginForm.value;
    userData.type='normal'
    console.log(userData)
    if(this.rememberMe)
    {
      this.container.storageStrategy='localStorage';
      window[this.container.storageStrategy].setItem('storageStrategy',this.container.storageStrategy);
    }
    this.authService.authenticateUser(userData).subscribe(res=>{
      console.log(res);
      this.router.navigate(['/','calendar'])   ;       
      console.log(res)
    },er=>{
      // this.toastr.error('Username or password not found.')
      console.log(er)
    })
  }

  ngOnInit() {
    this.initForm();
  }

}
