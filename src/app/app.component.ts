import { Component, OnInit ,HostListener,OnDestroy} from "@angular/core";
import { AdminService } from "./service-model/admin.service";
import { UpfbService } from "./service-model/upfb.service";
import { SanphamService } from './service-model/sanpham.service';
import { Khachhang } from './service-model/khachhang';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})


export class AppComponent implements OnInit,OnDestroy {
  title = "ThuongMaiDienTu";
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
    })

    this.updb.DownDepFromFBtoClient();
    this.updb.DownListTKFromFB()
    //console.log(this.admin.ListTK)
  }

  CheckTKLocateOnClient() 
  {
    this.taiKhoan = localStorage.getItem("TK");
    this.matKhau = localStorage.getItem("MK");
    for (let index = 0; index < this.admin.ListTK.length; index++) 
    {
      if (this.taiKhoan == this.admin.ListTK[index].TK && this.matKhau == this.admin.ListTK[index].MK) {
        this.admin.User = this.admin.ListTK[index];
        this.admin.ListTK[index].IsLogIn = true;
        this.admin.IsLogedIn = true
      }
    }
    this.updb.UpListKhachHangToFB()
  }

  @HostListener('beforeunload') beforeunload()
  {
    alert("asd")
  }

  ngOnDestroy(){
    alert('asd')
  }
}
