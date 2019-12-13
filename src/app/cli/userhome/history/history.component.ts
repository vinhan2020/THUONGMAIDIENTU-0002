import { Component, OnInit } from "@angular/core";
import { Khachhang } from "src/app/service-model/khachhang";
import { AdminService } from "src/app/service-model/admin.service";
import { DatePipe, DecimalPipe } from "@angular/common";
import * as $ from "jquery";
import { Bill } from "src/app/service-model/bill";
import Swal from "sweetalert2";
import { UpfbService } from 'src/app/service-model/upfb.service';

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.css"]
})
export class HistoryComponent implements OnInit {
  User: Khachhang;
  a;
  mangxuathien;
  mang: Bill[] = [];
  constructor(
    private admin: AdminService,
    public datepipe: DatePipe,
    public decimalpipe: DecimalPipe,private updb : UpfbService
  ) {}

  ngOnInit() {
    this.a = this.admin.ListKhachHangChange.subscribe((khach: Khachhang) => {
      this.User = this.admin.User;

      this.mangxuathien = new Array<boolean>(this.User.Bill.length);

      for (let index = 0; index < this.mangxuathien.length; index++) {
        this.mangxuathien[index] = false;
      }
      for (let i = this.User.Bill.length - 1; i >= 0; i--) {
        this.mang.push(this.User.Bill[i]);
      }
    });

    this.User = this.admin.User;
    this.mangxuathien = new Array<boolean>(this.User.Bill.length);

    for (let index = 0; index < this.mangxuathien.length; index++) {
      this.mangxuathien[index] = false;
    }

    for (let i = this.User.Bill.length - 1; i >= 0; i--) {
      this.mang.push(this.User.Bill[i]);
    }
  }

  onDetailClick(i) {
    for (let index = 0; index < this.mangxuathien.length; index++) {
      if (i == index) {
        this.mangxuathien[index] = !this.mangxuathien[index];
      } else {
        this.mangxuathien[index] = false;
      }
    }
  }

  onHuyDon(i) {
    // console.log(i)
    // console.log(this.mang[i])

    Swal.fire({
      title: "Huỷ đơn hàng",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Huỷ !"
    }).then(res => 
      {
        if(res.value)
          {
            this.mang[i].Status = "Đang huỷ đơn ...";

            console.log(this.User.Bill)
            console.log(this.admin.ListTK)
            this.updb.UpListKhachHangToFB()
          }
    });

    
  }

  ngAfterViewChecked() {
    for (let index = 0; index < this.User.Bill.length; index++) {
      switch (String(document.getElementById("statusthu" + index).innerHTML)) {
        case "Đợi kiểm tra ...": {
          document.getElementById("statusthu" + index).style.color = "red";
          break;
        }
        case "Đang huỷ đơn ...": {
          document.getElementById("statusthu" + index).style.color = "blue";
          break;
        }
      }
    }
  }
}
