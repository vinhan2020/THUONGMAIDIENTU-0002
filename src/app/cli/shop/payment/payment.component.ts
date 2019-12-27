import { Component, OnInit } from "@angular/core";
import { SanphamService } from "src/app/service-model/sanpham.service";
import { Dep } from "src/app/service-model/dep";
import { AdminService } from "src/app/service-model/admin.service";
import { Khachhang } from "src/app/service-model/khachhang";
import { UpfbService } from "src/app/service-model/upfb.service";
import { Bill } from "src/app/service-model/bill";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { DecimalPipe } from '@angular/common';
import { isNullOrUndefined } from 'util';
import { Subscription } from 'rxjs';

declare let paypal: any;

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"]
})
export class PaymentComponent implements OnInit {
  constructor(
    private sanphamService: SanphamService,
    public admin: AdminService,
    private updb: UpfbService,
    private route: Router, public depipe : DecimalPipe
  ) {}

  gioHang: Dep[] = [];

  TongTien = 0;
  currentuser: Khachhang;

  ten;
  sdt ='';
  dc ;

  idtk: number;
  a:Subscription

  ngOnInit() {
    this.a = this.sanphamService.GioHangChange.subscribe((gh:Dep[])=>
    {
      this.gioHang = this.sanphamService.GetGioHang();
      this.gioHang.forEach(Dep => {
        Dep.SizEvsGiAvsSolGvsTT.forEach(element => {
          this.TongTien = this.TongTien + element[2];
        });
      });
      this.TongTien = this.TongTien + 20000
    })

    this.gioHang = this.sanphamService.GetGioHang();
    this.gioHang.forEach(Dep => {
      Dep.SizEvsGiAvsSolGvsTT.forEach(element => {
        this.TongTien = this.TongTien + element[2];
      });
    });
    this.TongTien = this.TongTien + 20000










    if (this.sanphamService.GioHang.length == 0) 
    {
      Swal.fire("Opps", "Giỏ hàng trống", "warning").then(() => {
        this.route.navigate(["/Shop"]);
      });
    }
    else
    {
        
        if(isNullOrUndefined(this.admin.User.TK) && isNullOrUndefined(this.admin.User.MK))
        {
          console.log(this.currentuser)
        }
        else
        {

          this.idtk = this.admin.getIDUser(this.admin.User.TK);
          this.currentuser = this.admin.ListTK[this.idtk];
          console.log(this.currentuser)
          console.log(this.admin.IsLogedIn)
          this.ten= this.currentuser.Ten
          this.sdt = this.currentuser.SDT
          this.dc = this.currentuser.DiaChi
        }

    }
  }

  pay() {
    if (this.sanphamService.GetGioHang().length == 0) 
    {
      Swal.fire("Giỏ hàng đang trống", "chọn giày trước", "error");
    } 
    else 
    {

      if (this.admin.IsLogedIn)
      {
        this.sanphamService.BILL.NgayXuat = new Date();
        this.sanphamService.BILL.TongTien = this.TongTien;
        this.sanphamService.BILL.Status = "Đợi kiểm tra ...";
        this.sanphamService.BILL.SanPham = this.sanphamService.GioHang;
        this.sanphamService.BILL.IdBill = Math.floor(Math.random() * 1000000);
        //console.log(typeof this.currentuser.Bill)
        if (this.currentuser.Bill == undefined) {
          this.currentuser.Bill = [];
        }

        this.currentuser.Bill.push(this.sanphamService.BILL);

        // for (let index = 0; index < this.currentuser.Bill.length; index++)
        // {
        //   this.currentuser.Bill[index].IdBill = index
        // }

        this.admin.updatetkbyid(this.currentuser, this.idtk);
        this.updb.UpListKhachHangToFB();

        this.sanphamService.BILL = new Bill([], new Date(), 0);
        this.sanphamService.UpdateGioHang([]);
        this.TongTien = 0
      } 
      else
      {
        var tentamp;
        if (this.ten != this.admin.User.Ten) 
        {
          tentamp = String(this.ten);
        } 
        else 
        {
          tentamp = this.admin.User.Ten;
        }
        var khach = new Khachhang(
          null,
          null,
          this.admin.User.Role,
          null,
          tentamp,
          ("0"+this.sdt),
          this.dc
        );
        this.updb.DownListTKFromFB()

        setTimeout(() => 
        {
          khach.IdKhachHang = this.admin.ListTK.length

          this.sanphamService.BILL.NgayXuat = new Date();
          this.sanphamService.BILL.TongTien = this.TongTien;
          this.sanphamService.BILL.Status = "Đợi kiểm tra ...";
          this.sanphamService.BILL.SanPham = this.sanphamService.GioHang;
          this.sanphamService.BILL.IdBill = Math.floor(Math.random() * 1000000);
          
          khach.Bill.push(this.sanphamService.BILL);

          this.admin.themTKvaoListTk(khach);
          this.updb.UpListKhachHangToFB();

          this.sanphamService.BILL = new Bill([], new Date(), 0);
          this.sanphamService.UpdateGioHang([]);
          this.TongTien = 0

          this.ten = undefined;
          this.dc = undefined;
          this.sdt = undefined;
        },1500);
      }
    }
  }

  ngAfterViewChecked() {
    if (!this.addscript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalcongif, "#paypal-checkout-btn");
        this.paypalLoad = false;
      });
    }
  }

  addscript: boolean = false;
  paypalLoad = true;

  paypalcongif = 
  {
    env: "sandbox",
    client: {
      sandbox:
        "AQbCrDjtzaT2grb7Kmmywh50KKgHQfpgDx6oRT-1Ub6jya5IRBOjsYQaDnZyXsF4V2l7gknPvHj2STyi",
      production: 
      ""
    },
    commit: true,
    payment: (data, action) => {
      return action.payment.create({
        payment: {
          transactions: [
            {
              amount: {
                total: this.TongTien / 20000,
                currency: "USD"
              }
            }
          ]
        }
      });
    },
    onAuthorize: (data, action) => 
    {
      return action.payment.execute().then(() => {
        Swal.fire({ icon: "success", title: "Pay Completed", timer: 1000 })
        .then(()=>
        { 
          this.pay() 
        })
      });
    }
  };

  addPaypalScript() {
    this.addscript = true;
    return new Promise(resolve => {
      let scriptetagelement = document.createElement("script");
      scriptetagelement.src = "https://www.paypalobjects.com/api/checkout.js";
      scriptetagelement.onload = resolve;
      document.body.appendChild(scriptetagelement);
    });
  }
}
