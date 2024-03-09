import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './shared/guards/auth.guard';
import { DetailsProductComponent } from './components/details-product/details-product.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { VerifypasswordComponent } from './components/verifypassword/verifypassword.component';


const routes: Routes = [

  {path:'',canActivate:[authGuard], component:BlankLayoutComponent, children:[
    {path:'', redirectTo:'home', pathMatch:'full' },
    {path:'home', component:HomeComponent, title:'Home'},
    {path:'cart', component:CartComponent, title:'Cart'},
    {path:'checkout/:id', component:CheckoutComponent, title:'Checkout'},
    {path:'allorders', component:AllordersComponent, title:'All Orders'},
    {path:'wishlist', component:WishlistComponent, title:'WishList'},
    {path:'products', component:ProductComponent, title:'Products'},
    {path:'details/:id', component:DetailsProductComponent, title:'Details'},
    {path:'categories', component:CategoriesComponent, title:'Categories'},
    {path:'brands', component:BrandsComponent, title:'Brands'},
  ]},

  {path:'', component:AuthLayoutComponent, children:[
    {path:'login', component:LoginComponent, title:'Login'},
    {path:'register', component:RegisterComponent, title:'Register'},
    {path:'forgetPassword', component:ForgetpasswordComponent, title:'Forget Password'},
    {path:'verifyPassword', component:VerifypasswordComponent, title:'Verify Password'},
    {path:'resetPassword', component:ResetpasswordComponent, title:'Reset Password'}
  ]},

  {path:'**', component:NotFoundComponent, title:'NotFound'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
