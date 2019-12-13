import { Component, OnInit } from "@angular/core";
import { AdminService } from "../service-model/admin.service";
import { Router } from "@angular/router";
import { UpfbService } from "../service-model/upfb.service";
import Swal from "sweetalert2";

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
  }

  onLogInClick() 
  {
    this.admin.ListTK.forEach(element => {
      if (this.TK == element.TK && this.MK == element.MK) {
        this.admin.Dem++;
        Swal.fire({
          title: "Save ?",
          text: "",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        })
          .then(result => {
            if (result.value) 
            {
              localStorage.setItem("TK", this.TK);
              localStorage.setItem("MK", this.MK);
            }
            
          })
          .then(() => {
            element.IsLogIn = true;
            this.admin.User = element;
            

            Swal
            .fire({
              position: "top-end",
              icon: "success",
              title: "Login succesfully !",
              showConfirmButton: false,
              timer: 1000
            })
            .then(() => {
              if (this.admin.User.Role == "Admin") {
                this.route.navigate(["/Admin"]);
              } else {
                this.route.navigate(["/"]);
              }
            });
            this.updb.UpListKhachHangToFB();
          });
      } 
      else 
      {

      }
    });

    if (this.admin.Dem == 0) 
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  }

}
