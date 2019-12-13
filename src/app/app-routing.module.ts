import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./cli/home/home.component";
import { SevComponent } from "./sev/sev.component";
import { AdminhomeComponent } from "./sev/h/adminhome/adminhome.component";
import { HComponent } from "./sev/h/h.component";
import { ChitietdoanhthuComponent } from "./sev/h/chitietdoanhthu/chitietdoanhthu.component";
import { ShopComponent } from "./cli/shop/shop.component";
import { BlogComponent } from "./cli/blog/blog.component";
import { ContactComponent } from "./cli/contact/contact.component";
import { DetailComponent } from "./cli/shop/detail/detail.component";
import { ShoppingcardComponent } from "./cli/shop/shoppingcard/shoppingcard.component";
import { TatcaspComponent } from "./sev/h/tatcasp/tatcasp.component";
import { AddComponent } from "./sev/h/tatcasp/add/add.component";
import { PaymentComponent } from "./cli/shop/payment/payment.component";
import { UploaderComponent } from "./sev/h/tatcasp/add/uploader/uploader.component";
import { SignupComponent } from "./sev/signup/signup.component";
import { UserhomeComponent } from "./cli/userhome/userhome.component";
import { HistoryComponent } from './cli/userhome/history/history.component';
import { DsdonhangComponent } from './sev/h/dsdonhang/dsdonhang.component';

const routes: Routes = [
  { path: "", redirectTo: "/TrangChu", pathMatch: "full" },
  { path: "TrangChu", component: HomeComponent },
  { path: "Signin", component: SevComponent },
  { path: "Signup", component: SignupComponent },
  { path: "Shop", component: ShopComponent },
  { path: "Blog", component: BlogComponent },
  { path: "Contact", component: ContactComponent },
  { path: "UserHomePage", component: UserhomeComponent ,children:[
    {path : 'History',component:HistoryComponent},
  ]},
  { path: "Shop/Detail/:id", component: DetailComponent },
  { path: "TrangChu/Detail/:id", component: DetailComponent },
  { path: "ShoppingCard", component: ShoppingcardComponent },
  { path: "ShoppingCard/Payment", component: PaymentComponent },
  { path: "ShoppingCard/Payment/Paypal", component: PaymentComponent },
  {
    path: "Admin",
    component: HComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "Home" },
      { path: "Home", component: AdminhomeComponent },
      { path: "SanPham", component: TatcaspComponent },
      { path: "Chitietdoanhthu", component: ChitietdoanhthuComponent },
      { path: "SanPham/Add", component: AddComponent },
      { path: "SanPham/Edit/:id", component: UploaderComponent },
      {path:"DSDonHang",component:DsdonhangComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
