import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { AdminService } from "src/app/service-model/admin.service";
import { Route, ActivatedRoute, Router } from "@angular/router";
import { Khachhang } from "src/app/service-model/khachhang";
import { SanphamService } from "src/app/service-model/sanpham.service";
import { Dep } from "src/app/service-model/dep";
import { UpfbService } from 'src/app/service-model/upfb.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  abc;
  gioHang: Dep[] = [];

  constructor(
    public admin: AdminService,
    private router: Router,
    private sp: SanphamService, private updb : UpfbService
  ) {}

  ngOnInit() {
    document.getElementById("openbutton").className =
      "navbar-toggler collapsed";

    this.gioHang  = this.sp.GetGioHang();
    this.abc = this.sp.GioHangChange.subscribe(gh => {
      this.gioHang = gh;
    });

    //console.log(window.innerWidth)
  }

  onClickToAdmin() {
    this.admin.Admin = !this.admin.Admin;

  }
  // navbar-toggler collapsed
  onHomeClick() {
    this.admin.Admin = false;
    // if (document.getElementById("openButton").className == "navbar-toggler") {
    //   document.getElementById("openButton").click();
    // }
    document.getElementById("foot").style.display = "block";
  }

  onLogOut() {
    this.admin.User = this.admin.Guest;
    this.admin.IsLogedIn= false
    localStorage.clear();
    this.admin.Dem = 0;
    for (let index = 0; index < this.admin.ListTK.length; index++) {
      this.admin.ListTK[index].IsLogIn=false
      
    }
    this.updb.UpListKhachHangToFB()
    // document.getElementById("openButton").click();
  }

  onAdminClick() {
    document.getElementById("NavigateBar").style.display = "none";
    document.getElementById("foot").style.display = "none";
  }
}
