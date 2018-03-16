import { SharedService } from './../../providers/shared.service';
import { ContainerService } from './../../providers/container.service';
import { AuthService } from './../../providers/auth.service';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import {ModalDirective} from 'ngx-bootstrap'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,
  private container:ContainerService,private sharedService:SharedService) { }

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
      this.forgotPasswordModal.hide();
    },er=>{
      this.forgotPasswordModal.hide();
    })
  }

  submitForm()
  {
    var userData=this.loginForm.value;
    userData.type='normal'
    if(this.rememberMe)
    {
      this.container.storageStrategy='localStorage';
      window[this.container.storageStrategy].setItem('storageStrategy',this.container.storageStrategy);
    }
    this.authService.authenticateUser(userData).subscribe(res=>{
      this.router.navigate(['/','calendar'])   ;       
    },er=>{
      this.sharedService.notify('Either username or password is invalid')
    })
  }

  createAccount()
  {
    this.router.navigate(['/','pages','signup'])
  }

  ngOnInit() {
    console.log('in login')
    this.initForm();
  }

}
