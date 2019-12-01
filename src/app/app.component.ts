import { Component, OnInit } from "@angular/core";
import { AdminService } from "./service-model/admin.service";
import { UpfbService } from "./service-model/upfb.service";
import { SanphamService } from './service-model/sanpham.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "ThuongMaiDienTu";
  taiKhoan;
  matKhau;

  selectedfile: File = null;
  constructor(private admin: AdminService, private updb: UpfbService , private spservice:SanphamService) {}

  ngOnInit() {
    this.CheckTKLocateOnClient();
    this.updb.DownDepFromFBtoClient();
  }

  CheckTKLocateOnClient() {
    this.taiKhoan = localStorage.getItem("TK");
    this.matKhau = localStorage.getItem("MK");
    this.admin.ListTK.forEach(element => {
      if (this.taiKhoan == element.TK && this.matKhau == element.MK) {
        this.admin.User = element;
        element.IsLogIn = true;
      }
    });
  }
}
