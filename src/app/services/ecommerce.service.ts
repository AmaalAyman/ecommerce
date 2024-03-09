import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  constructor(private _HttpClient:HttpClient) { }

  baseUrl:string= 'https://ecommerce.routemisr.com/api/v1';
  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0);

  
  myToken:any= {
    token:localStorage.getItem('eToken')
  }

  getAllProducts():Observable<any>{
    return this._HttpClient.get(this.baseUrl + `/products`);
  }

  getProduct(id:string):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `/products/${id}`);
  }

  getCategory():Observable<any>{
    return this._HttpClient.get(this.baseUrl + `/categories`);
  }

  addToCart(proId:string):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `/cart` ,
    {
      productId:proId
    },
    {
      headers:this.myToken
    }
    );
  }

  getUserCart():Observable<any>{
    return this._HttpClient.get(this.baseUrl + `/cart` ,
    {
      headers:this.myToken
    }
    );
  }

  deleteProductCart(id:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `/cart/${id}` ,
    {
      headers:this.myToken
    }
    );
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `/cart` ,
    {
      headers:this.myToken
    }
    );
  }

  updateCartProduct(newCount:number, prodId:string):Observable<any>{
    return this._HttpClient.put(this.baseUrl + `/cart/${prodId}` ,
    {
      count:newCount
    },
    {
      headers:this.myToken
    }
    );
  }


  checkoutSession(cartId:string, details:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `/orders/checkout-session/${cartId}?url=http://amaalayman.github.io/ecommerce` , 
    {
      shippingAddress:details
    },
    {
       headers: this.myToken
    })
  }

  getAllOrders():Observable<any>{
    return this._HttpClient.get( this.baseUrl + `/orders/`)
  }

  getUserOrders(userId:string):Observable<any>{
    return this._HttpClient.get( this.baseUrl + `/orders/user/${userId}`)
  }


getAllSubCategories():Observable<any>{
  return this._HttpClient.get(this.baseUrl + `/subcategories`)
}


getAllBrands():Observable<any>{
  return this._HttpClient.get(this.baseUrl + `/brands`)
}


addToWishlist(proId:string):Observable<any>{
  return this._HttpClient.post(this.baseUrl + `/wishlist`,
  {
    productId:proId
  },
  {
    headers:this.myToken
  })
}

removeFromWishlist(proId:string):Observable<any>{
  return this._HttpClient.delete(this.baseUrl + `/wishlist/${proId}`,
  {
    headers:this.myToken
  })
}

getUserWishlist():Observable<any>{
  return this._HttpClient.get(this.baseUrl + `/wishlist`,
  {
    headers:this.myToken
  })
}

forgotPassword(newEmail:string):Observable<any>{
  return this._HttpClient.post(this.baseUrl + `/auth/forgotPasswords`,
  {
    email:newEmail
  })
}

verifyResetCode(newRestCode:number):Observable<any>{
  return this._HttpClient.post(this.baseUrl + `/auth/verifyResetCode`,
  {
    resetCode:newRestCode
  })
}

resetPassword(userDetails:object):Observable<any>{
  return this._HttpClient.put(this.baseUrl + `/auth/resetPassword`, userDetails)
}

}