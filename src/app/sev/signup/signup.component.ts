import { Component, OnInit } from "@angular/core";
import { Khachhang } from "src/app/service-model/khachhang";
import { AdminService } from "src/app/service-model/admin.service";
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';
import { UpfbService } from 'src/app/service-model/upfb.service';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  ten = "";
  sdt ;
  tk = "";
  mk = "";
  dc = "";
  constructor(private adminsv: AdminService,private route : Router , private updb : UpfbService) {}

  ngOnInit() {
    document.getElementById("foot").style.display = "none";
  }

  onDkClick() {
    
    var t = new Khachhang(
      this.tk,
      this.mk,
      "Guest",
      false,
      this.ten,
      this.sdt,
      this.dc
    );
    this.adminsv.themTKvaoListTk(t);
    
    for (let index = 0; index < this.adminsv.ListTK.length; index++) {
      this.adminsv.ListTK[index].IdKhachHang = index  
    }
    this.updb.UpListKhachHangToFB()
     
    Swal.fire('Đang ký thành công','','success')
    .then(()=>{
      this.route.navigate(['/Signin'])
    })
  }
}
