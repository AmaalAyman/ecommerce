import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {

constructor(private _AuthService:AuthService, private _Router:Router){}

errMsg:string = '';
isLoading:boolean = false;

RegisterForm:FormGroup = new FormGroup({
 name:new FormControl('', [Validators.required, Validators.minLength(3)]),
 email:new FormControl('', [Validators.required, Validators.email]),
 password:new FormControl('', [Validators.required, Validators.pattern(/^\w{7,10}$/)]),
 rePassword:new FormControl(''),
 phone:new FormControl('', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]),
}, {validators:[this.confirmPassword]} as FormControlOptions);


confirmPassword(group:FormGroup):void{
  let password = group.get('password');
  let rePassword = group.get('rePassword');


  if(rePassword?.value == null || ''){
    rePassword?.setErrors({ required: true})
  }else if(password?.value != rePassword?.value)
   rePassword?.setErrors({ misMatch: true })
}

handleRegisterForm():void{

const userData = this.RegisterForm.value;
this.isLoading = true; 
 if(this.RegisterForm.valid == true){
     this._AuthService.signUp(userData).subscribe({
      next:(response)=>{
        if(response.message === 'success'){
          this.isLoading = false;
          this._Router.navigate(['/login'])
      }
     },
      error:(err)=>{
        this.isLoading = false;
        this.errMsg = err.error.message;
      },
      
    }
     
     )
  }
}
}
