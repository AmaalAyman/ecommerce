import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { EcommerceService } from './ecommerce.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient , private _Router:Router) { }

  userData:any;
  userId:string = '';

  saveUserData(){
    if(localStorage.getItem('eToken') != null){
      let encodeToken:any = localStorage.getItem('eToken');
      let decodeToken:any = jwtDecode(encodeToken);
      this.userData = decodeToken;
      this.userId = decodeToken.id;
      console.log(decodeToken);
      console.log(this.userId)
    }

  }

signUp(userData:object):Observable<any>{
  return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', userData);
}

logIn(userData:object):Observable<any>{
 return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', userData);
}

logOut():void{
  localStorage.removeItem('eToken');
  this._Router.navigate(['/login']);
}


}
