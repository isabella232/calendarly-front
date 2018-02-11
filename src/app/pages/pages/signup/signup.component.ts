// import { ToastrService } from 'toastr-ng2';
import { ContainerService } from '../../../providers/container.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../providers/auth.service';
import { FormBuilder, FormGroup, Validators,ValidatorFn ,AbstractControl} from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
    constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,
    private container:ContainerService) { }
    signupForm:FormGroup;
  
   validatePassword():ValidatorFn
    {
      //  console.log(this.signupForm.get('confirmPassword').errors)
    return (c:AbstractControl)=>{
      var pControl=c.get('password');
      var cControl=c.get('confirmPassword');
      if(pControl.pristine || cControl.pristine)
      {
        return null;
      }
      if(pControl.value===cControl.value)
      {
        return null;
      }
      else{
        return {'match':true}
      }

    }
    }
    

    initForm()
    {
      this.signupForm=this.fb.group({
        username:this.fb.control(null,[Validators.required]),    
        full_name:this.fb.control(null,[Validators.required]),
        type:this.fb.control('public',[Validators.required]),
        email:this.fb.control(null,[Validators.required,Validators.email]),
        password:this.fb.group({
          password:this.fb.control(null,[Validators.required]),
          confirmPassword:this.fb.control(null,[Validators.required])
        },{
          validator:this.validatePassword
        })
  })
    }
  
    submitForm()
    {
      var userData=this.signupForm.value;
      // userData.type='public'
      console.log(userData)
      this.authService.signupUser(userData).subscribe(res=>{
        console.log(this.container.isAuthenticated)
        if(this.container.isAuthenticated)
        {
          this.router.navigate(['/','calendar'])
        }
        else{
          // this.authService.handleError(err)
          console.log('Unauthenticated')
        }
        console.log(res)
      },er=>{
        // this.toastr.error('Username or password not found.')
        console.log(er)
        // this.eventsService.notify(er.message,'danger');
      })
    }
  
    ngOnInit() {
      this.initForm();
    }
  
  }
