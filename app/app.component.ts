import { Component, OnInit } from "@angular/core";
import { AdminService } from "./service-model/admin.service";
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "ThuongMaiDienTu";
  taiKhoan;
  matKhau;

  selectedfile:File= null
  constructor(private admin: AdminService , private http : HttpClient) {}

  ngOnInit() {
    this.CheckTKLocateOnClient()
  }
  CheckTKLocateOnClient(){
    this.taiKhoan = localStorage.getItem("TK");
    this.matKhau = localStorage.getItem("MK");

    this.admin.ListTK.forEach(element => {
      if (this.taiKhoan == element.TK && this.matKhau == element.MK) {
        this.admin.User = element;
        element.IsLogIn = true
      } 
    });
  }

}
