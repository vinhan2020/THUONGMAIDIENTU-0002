import { Component, OnInit } from "@angular/core";
import { SanphamService } from "src/app/service-model/sanpham.service";
import { Dep } from "src/app/service-model/dep";
import { AdminService } from "src/app/service-model/admin.service";
import { Khachhang } from "src/app/service-model/khachhang";
import { UpfbService } from 'src/app/service-model/upfb.service';
import { Bill } from 'src/app/service-model/bill';

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"]
})
export class PaymentComponent implements OnInit {
  constructor(
    private sanphamService: SanphamService,
    public admin: AdminService,
    private updb : UpfbService
  ) {}

  gioHang: Dep[];
   
  TongTien = 0;
  currentuser :Khachhang

  ten = "";
  sdt = 0;
  dc = "";

  
  idtk

  ngOnInit() {
    var a = this.sanphamService.GioHangChange.subscribe((giohang:Dep[])=>{
      this.gioHang=giohang
      this.gioHang.forEach(Dep => {
        Dep.SizEvsGiAvsSolGvsTT.forEach(element => {
          this.TongTien = this.TongTien + element[2];
        });
      });
    })
    var b = this.admin.ListKhachHangChange.subscribe((khachhang:Khachhang[])=>{
      this.idtk = this.admin.getIDUser(this.admin.User.TK)
      
      console.log(this.idtk)
      console.log(this.admin.IsLogedIn)
       
      this.currentuser = this.admin.ListTK[this.idtk]
      this.ten=this.currentuser.Ten
      this.sdt = this.currentuser.SDT
      this.dc = this.currentuser.DiaChi
    })

    this.idtk = this.admin.getIDUser(this.admin.User.TK)
      
      console.log(this.idtk)
      console.log(this.admin.IsLogedIn)
       
      this.currentuser = this.admin.ListTK[this.idtk]
      this.ten=this.currentuser.Ten
      this.sdt = this.currentuser.SDT
      this.dc = this.currentuser.DiaChi




    this.gioHang = this.sanphamService.GetGioHang();
    this.gioHang.forEach(Dep => {
      Dep.SizEvsGiAvsSolGvsTT.forEach(element => {
        this.TongTien = this.TongTien + element[2];
      });
    });
     
    
  }

  pay() {
    if (this.admin.IsLogedIn) {

      this.sanphamService.BILL.NgayXuat= new Date()
      this.sanphamService.BILL.TongTien=this.TongTien +20000
      var i = this.admin.getIDUser(this.admin.User.TK)
      
     
      
      this.currentuser.Bill.push(this.sanphamService.BILL)
      this.admin.updatetkbyid(this.currentuser,i)
     
      this.updb.UpListKhachHangToFB()

      this.sanphamService.BILL =new Bill([],new Date(),0)
      this.sanphamService.UpdateGioHang([])

    } 
    else
    {
      var tentamp;
      if (this.ten != this.admin.User.Ten) {
        tentamp = this.ten;
      } else {
        tentamp = this.admin.User.Ten;
      }
      var khach = new Khachhang(
        this.admin.User.TK,
        this.admin.User.MK,
        this.admin.User.Role,
        this.admin.User.IsLogIn,
        tentamp,
        this.sdt,
        this.dc
      );
      
      this.sanphamService.BILL.NgayXuat= new Date()
      this.sanphamService.BILL.TongTien=this.TongTien +20000
      khach.Bill.push(this.sanphamService.BILL)
      this.admin.themTKvaoListTk(khach)
      this.updb.UpListKhachHangToFB()

      this.sanphamService.BILL =new Bill([],new Date(),0)


    }
  }
}
