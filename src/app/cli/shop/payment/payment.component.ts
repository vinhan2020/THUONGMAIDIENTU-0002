import { Component, OnInit } from "@angular/core";
import { SanphamService } from "src/app/service-model/sanpham.service";
import { Dep } from "src/app/service-model/dep";
import { AdminService } from "src/app/service-model/admin.service";
import { Khachhang } from "src/app/service-model/khachhang";
import { UpfbService } from "src/app/service-model/upfb.service";
import { Bill } from "src/app/service-model/bill";
import Swal from "sweetalert2";
@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"]
})
export class PaymentComponent implements OnInit {
  constructor(
    private sanphamService: SanphamService,
    public admin: AdminService,
    private updb: UpfbService
  ) {}

  gioHang: Dep[] = [];

  TongTien = 0;
  currentuser: Khachhang;

  ten = "";
  sdt;
  dc;

  idtk: number;





  

  ngOnInit() {
    var a = this.sanphamService.GioHangChange.subscribe((giohang: Dep[]) => {
      this.gioHang = giohang;
      this.gioHang.forEach(Dep => {
        Dep.SizEvsGiAvsSolGvsTT.forEach(element => {
          this.TongTien = this.TongTien + element[2];
        });
      });
    });

    var b = this.admin.ListKhachHangChange.subscribe((khachhang: Khachhang[]) => {
        this.idtk = this.admin.getIDUser(this.admin.User.TK);
        // console.log(this.idtk);
        // console.log(this.currentuser);

        try {
          this.currentuser = this.admin.ListTK[this.idtk];
          this.ten = this.currentuser.Ten;
          if (this.currentuser.SDT == 0) 
          {
            this.sdt = undefined;
          } 
          else 
          {
            this.sdt = this.currentuser.SDT;
          }
          if (this.currentuser.DiaChi == "") 
          {
            this.sdt = undefined;
          } else {
            this.dc = this.currentuser.DiaChi;
          }
        } catch (e) {console.log;}}
    );

    try {
      this.idtk = this.admin.getIDUser(this.admin.User.TK);
      // console.log(this.idtk);
      // console.log(this.admin.IsLogedIn);
      this.currentuser = this.admin.ListTK[this.idtk];
      this.ten = this.currentuser.Ten;
      if (this.currentuser.SDT == 0) {
        this.sdt = undefined;
      } else {
        this.sdt = this.currentuser.SDT;
      }
      if (this.currentuser.DiaChi == "") {
        this.sdt = undefined;
      } else {
        this.dc = this.currentuser.DiaChi;
      }
    } 
    catch (e) {}

    this.gioHang = this.sanphamService.GetGioHang();
    this.gioHang.forEach(Dep => {
      Dep.SizEvsGiAvsSolGvsTT.forEach(element => {
        this.TongTien = this.TongTien + element[2];
      });
    });


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
        this.sanphamService.BILL.TongTien = this.TongTien + 20000;
        this.sanphamService.BILL.Status="Đợi kiểm tra ..."
        this.sanphamService.BILL.SanPham = this.sanphamService.GioHang
        this.sanphamService.BILL.IdBill = Math.floor(Math.random() * 1000000)
        //console.log(typeof this.currentuser.Bill)
        if(this.currentuser.Bill == undefined)
        {
          this.currentuser.Bill = []
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
      }
      else
      {
        var tentamp;
        if (this.ten != this.admin.User.Ten) {
          tentamp = this.ten;
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
          this.sdt,
          this.dc
        );

        this.sanphamService.BILL.NgayXuat = new Date();
        this.sanphamService.BILL.TongTien = this.TongTien + 20000;
        this.sanphamService.BILL.Status="Đợi kiểm tra ..."
        this.sanphamService.BILL.SanPham = this.sanphamService.GioHang
        this.sanphamService.BILL.IdBill = Math.floor(Math.random() * 1000000)

        // if(this.currentuser.Bill == undefined)
        // {
        //   this.currentuser.Bill = []
        // }
        khach.Bill.push(this.sanphamService.BILL);


        this.admin.themTKvaoListTk(khach);
        this.updb.UpListKhachHangToFB();

        this.sanphamService.BILL = new Bill([], new Date(), 0);
        this.sanphamService.UpdateGioHang([]);
      }
    }
  }
}
