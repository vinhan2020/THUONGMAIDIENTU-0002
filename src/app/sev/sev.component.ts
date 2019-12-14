import { Component, OnInit } from "@angular/core";
import { AdminService } from "../service-model/admin.service";
import { Router } from "@angular/router";
import { UpfbService } from "../service-model/upfb.service";
import Swal from "sweetalert2";
import { Khachhang } from "../service-model/khachhang";

@Component({
  selector: "app-sev",
  templateUrl: "./sev.component.html",
  styleUrls: ["./sev.component.css"]
})
export class SevComponent implements OnInit {
  TK: string = "";
  MK: string = "";

  constructor(
    private admin: AdminService,
    private route: Router,
    private updb: UpfbService
  ) {}

  ngOnInit() {
    document.getElementById("foot").style.display = "none";
    // if(this.admin.User){}
    var a = this.admin.ListKhachHangChange.subscribe((Khach: Khachhang[]) => {
      if (this.admin.User.TK != undefined && this.admin.User.MK != undefined) {
        if (this.admin.User.Role == "Guest") {
          this.route.navigate([""]);
        } else {
          this.route.navigate(["/Admin"]);
        }
      }
    });

    if (this.admin.User.TK != undefined && this.admin.User.MK != undefined) {
      if (this.admin.User.Role == "Guest") {
        this.route.navigate([""]);
      } else {
        this.route.navigate(["/Admin"]);
      }
    }
  }

  onLogInClick() {
    this.admin.ListTK.forEach(element => {
      if (this.TK == element.TK && this.MK == element.MK) {
        this.admin.Dem++;
        element.IsLogIn = true;
        this.admin.User = element;
        console.log(this.admin.User);
        Swal.fire("","","success")
        // if (this.admin.User.Role.includes("Guest",0)) {
        //   Swal.fire({
        //     title: "Save ?",
        //     text: "",
        //     icon: "question",
        //     showCancelButton: true,
        //     confirmButtonColor: "#3085d6",
        //     cancelButtonColor: "#d33",
        //     confirmButtonText: "Yes"
        //   }).then(result => {
        //     if (result.value) {
        //       localStorage.setItem("TK", this.TK);
        //       localStorage.setItem("MK", this.MK);
        //     }
        //   });
        // } else {
        //   localStorage.setItem("TK", this.TK);
        //   localStorage.setItem("MK", this.MK);
        // }

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login succesfully !",
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          if (this.admin.User.Role == "Admin") {
            this.route.navigate(["/Admin"]);
          } else {
            this.route.navigate(["/"]);
          }
        });
        this.updb.UpListKhachHangToFB();

      } 
      else 
      {

      }
    });

    if (this.admin.Dem == 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    }
  }
}
