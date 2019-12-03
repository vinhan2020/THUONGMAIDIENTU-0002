import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SanphamService } from "./sanpham.service";
import { Dep } from "./dep";
import { AdminService } from "./admin.service";
import { Khachhang } from './khachhang';

@Injectable({
  providedIn: "root"
})
export class UpfbService {
  constructor(
    private http: HttpClient,
    private spservice: SanphamService,
    private admin: AdminService
  ) {}

  DownDepFromFBtoClient() {
    this.http
      .get("https://tmdt-1f1e9.firebaseio.com/ListDep.json")
      .subscribe((dep: Dep[]) => {
        this.spservice.upDateSanPham(dep);
      });
  }

  UpListDepToFB() {
    this.http
      .put(
        "https://tmdt-1f1e9.firebaseio.com/ListDep.json",
        this.spservice.getSanPham()
      )
      .subscribe(response => {});
  }


  UpListKhachHangToFB() {
    this.http
      .put(
        "https://tmdt-1f1e9.firebaseio.com/ListAccount.json",
        this.admin.GetListTK()
      )
      .subscribe(res => {});
  }

  DownListTKFromFB(){
    this.http.get("https://tmdt-1f1e9.firebaseio.com/ListAccount.json")
      .subscribe((res:Khachhang[]) =>{
        this.admin.UpdateListTK(res)
      })
  }

  
}
