import { Component, OnInit ,HostListener,OnDestroy} from "@angular/core";
import { AdminService } from "./service-model/admin.service";
import { UpfbService } from "./service-model/upfb.service";
import { SanphamService } from './service-model/sanpham.service';
import { Khachhang } from './service-model/khachhang';
import { isNullOrUndefined } from 'util';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})


export class AppComponent implements OnInit {
  title = "Thương mại điện tử";
  taiKhoan;
  matKhau;
  a
  selectedfile: File = null;

  constructor(private admin: AdminService,
              private updb: UpfbService ,
              private spservice:SanphamService
              ) 
  {

  }

  ngOnInit() {
    this.a = this.admin.ListKhachHangChange.subscribe((list : Khachhang[])=>{
      this.CheckTKLocateOnClient();
      //console.log(this.admin.User.TK)
    })

    this.updb.DownDepFromFBtoClient();
    this.updb.DownListTKFromFB()
    //console.log(this.admin.ListTK)
  }

  CheckTKLocateOnClient()
  {
    this.taiKhoan = localStorage.getItem("TK");
    this.matKhau = localStorage.getItem("MK");
    //console.log(this.taiKhoan)
    for (let index = 0; index < this.admin.ListTK.length; index++) 
    {
      //console.log(this.admin.ListTK[index].TK)
      if (this.taiKhoan == this.admin.ListTK[index].TK && this.matKhau == this.admin.ListTK[index].MK && !isNullOrUndefined(this.admin.ListTK[index].TK)) {
        this.admin.User = this.admin.ListTK[index];
        this.admin.ListTK[index].IsLogIn = true;
        this.admin.IsLogedIn = true
      }
    }
    this.updb.UpListKhachHangToFB()
  }
}
