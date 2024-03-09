import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EcommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {

  constructor(private _EcommerceService:EcommerceService, private _Router:Router, private _AuthService:AuthService){}

  resetForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    newPassword: new FormControl('')
 });


resetPassword(){
  this._EcommerceService.resetPassword(this.resetForm.value).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.token != null){
        localStorage.setItem('eToken',res.token);
            this._AuthService.saveUserData();
            this._Router.navigate(['/home']);
      }
    }
  })
}

}
