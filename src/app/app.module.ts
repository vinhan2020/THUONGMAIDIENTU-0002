import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule,
  MatSidenavModule,
   MatIconModule,
   MatToolbarModule,
  MatCheckboxModule
} from "@angular/material";


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { ChartsModule } from "ng2-charts";

import { AppRoutingModule } from "./service-model/app-routing.module";
import { AppComponent } from "./app.component";
import { CliComponent } from "./cli/cli.component";
import { HeaderComponent } from "./cli/header/header.component";
import { HomeComponent } from "./cli/home/home.component";
import { SevComponent } from "./sev/sev.component";
import { AdminhomeComponent } from "./sev/h/adminhome/adminhome.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HComponent } from "./sev/h/h.component";
import { ChitietdoanhthuComponent } from "./sev/h/chitietdoanhthu/chitietdoanhthu.component";
import { MainNavComponent } from "./sev/h/main-nav/main-nav.component";
import { LayoutModule } from "@angular/cdk/layout";
import { MatListModule } from "@angular/material/list";
import { LinechartComponent } from "./sev/h/adminhome/charts/linechart/linechart.component";
import { MatTabsModule } from "@angular/material";
import { FooterComponent } from "./cli/footer/footer.component";
import { ShopComponent } from "./cli/shop/shop.component";
import { BlogComponent } from "./cli/blog/blog.component";
import { ContactComponent } from "./cli/contact/contact.component";
import { DetailComponent } from "./cli/shop/detail/detail.component";
import { ShoppingcardComponent } from "./cli/shop/shoppingcard/shoppingcard.component";
import { TatcaspComponent } from "./sev/h/tatcasp/tatcasp.component";
import { AddComponent } from './sev/h/tatcasp/add/add.component';
import { DropzoneDirective } from './sev/h/tatcasp/add/dropzone.directive';
import { UploaderComponent } from './sev/h/tatcasp/add/uploader/uploader.component';
import { UploadTaskComponent } from './sev/h/tatcasp/add/upload-task/upload-task.component';
import { PaymentComponent } from './cli/shop/payment/payment.component';
import { PaypalComponent } from './cli/shop/paypal/paypal.component';



const firebaseConfig = {
  apiKey: "AIzaSyBZitI-HPt05zzsC5JfwJ7g8R5iWPT7KPM",
  authDomain: "tmdt-1f1e9.firebaseapp.com",
  databaseURL: "https://tmdt-1f1e9.firebaseio.com",
  projectId: "tmdt-1f1e9",
  storageBucket: "tmdt-1f1e9.appspot.com",
  messagingSenderId: "1081312522214",
  appId: "1:1081312522214:web:06a5e60c739609a6c1f027",
  measurementId: "G-PV72GWZLB6"
};

@NgModule({
  declarations: [
    AppComponent,
    CliComponent,
    HeaderComponent,
    HomeComponent,
    SevComponent,
    AdminhomeComponent,
    HComponent,
    ChitietdoanhthuComponent,
    MainNavComponent,
    LinechartComponent,
    FooterComponent,
    ShopComponent,
    BlogComponent,
    ContactComponent,
    DetailComponent,
    ShoppingcardComponent,
    TatcaspComponent,
    AddComponent,
    DropzoneDirective,
    UploaderComponent,
    UploadTaskComponent,
    PaymentComponent,
    PaypalComponent
     ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,HttpClientModule,

    //firebase 
    AngularFirestoreModule,AngularFireModule.initializeApp(firebaseConfig),AngularFireStorageModule,AngularFireAuthModule,
    //////////////////////////////


    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ChartsModule,
    MatTabsModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]

  
})

export class AppModule {}
