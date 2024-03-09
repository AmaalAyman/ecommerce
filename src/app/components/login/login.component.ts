
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoading:boolean= false;
  errMsg:string = '';

  constructor(private _AuthService:AuthService, private _Router:Router){}


LoginForm: FormGroup = new FormGroup({
   email: new FormControl('',[Validators.required, Validators.email] ),
   password: new FormControl('', [Validators.required, Validators.pattern(/^\w{6,}$/)]),
});



  handleLoginForm():void{

    const userData = this.LoginForm.value;
     this.isLoading = true;
     if(this.LoginForm.valid){
        this._AuthService.logIn(userData).subscribe({
          next:(res)=>{
            if(res.message == 'success')
            this.isLoading = false;
            localStorage.setItem('eToken',res.token);
            this._AuthService.saveUserData();
            this._Router.navigate(['/home']);
          },
          error:(err)=>{
            this.isLoading = false;
            this.errMsg = err.error.message;
          }
        })
     }
  }
}
