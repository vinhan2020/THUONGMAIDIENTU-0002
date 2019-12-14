import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/service-model/admin.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-h",
  templateUrl: "./h.component.html",
  styleUrls: ["./h.component.css"]
})
export class HComponent implements OnInit {
  constructor(private admin: AdminService, private route: Router) {}

  ngOnInit() {
    document.getElementById("NavigateBar").style.display='none'

    document.getElementById("foot").style.display = "none";
    console.log(this.admin.User)
    
        if(localStorage.getItem("TK")=='admin' && localStorage.getItem("MK")=='admin')
        {

        }
        else
        {
          if (this.admin.User.Role != "Admin") 
          {
            alert("Không có quyền truy cập");
            this.route.navigate([""]);
          }
        }


  }
}
