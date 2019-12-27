import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/service-model/admin.service";
import { Bill } from "src/app/service-model/bill";
import { Khachhang } from "src/app/service-model/khachhang";
import { DatePipe, DecimalPipe } from "@angular/common";
import { isNullOrUndefined } from "util";
import Swal from "sweetalert2";
import { Subscription } from "rxjs";
import { UpfbService } from "src/app/service-model/upfb.service";
import { SanphamService } from "src/app/service-model/sanpham.service";

@Component({
  selector: "app-dsdonhang",
  templateUrl: "./dsdonhang.component.html",
  styleUrls: ["./dsdonhang.component.css"]
})
export class DsdonhangComponent implements OnInit {
  MangBill: Bill[] = [];
  a: Subscription;
  listtk: Khachhang[];

  ArayDate: Date[];
  ArrayTinhTrang: String[];

  ArraySodDonChuaKLT: Number[] ;
  ArraySoDonDangHuy: Number[] ;
  ArrayDaThanhToan: number[] ;
  ArrayDaHuyDon ;

  showArray: Boolean[] = [];

  stt1 = "Đợi kiểm tra ...";
  stt2 = "Đang huỷ đơn ...";
  stt3 = "Đang chuyển hàng ...";
  stt4 = "Đã huỷ đơn !";

  constructor(
    private admin: AdminService,
    private sanphamsv: SanphamService,
    public datepipe: DatePipe,
    public depipe: DecimalPipe,
    private updb: UpfbService
  ) {}

  ngOnInit() {
    this.a = this.admin.ListKhachHangChange.subscribe((Khach: Khachhang[]) => {
       
      this.ArayDate=[]
      this.ArrayTinhTrang=[]
      this.ArraySodDonChuaKLT=[]
      this.ArraySoDonDangHuy=[]
      this.ArrayDaThanhToan=[]
      this.ArrayDaHuyDon=[]


      this.listtk = Khach;
      this.listtk.splice(0, 1);

      this.listtk.forEach(element => {
        var dem1: number = 0;
        var dem2: number = 0;
        var dem3: number = 0;
        var dem4 = 0;
        var newdate = new Date();

        //console.log('asd')
        if (isNullOrUndefined(element.Bill)) 
        {
          this.ArayDate.push(newdate);
          this.ArrayTinhTrang.push("");
          this.ArraySodDonChuaKLT.push(dem1);
          this.ArraySoDonDangHuy.push(dem2);
          this.ArrayDaThanhToan.push(dem3);
          this.ArrayDaHuyDon.push(dem4);
        } 
        else 
        {
          this.ArayDate.push(element.Bill[element.Bill.length - 1].NgayXuat);
          this.ArrayTinhTrang.push(
            element.Bill[element.Bill.length - 1].Status
          );
          element.Bill.forEach(e => {
            if (e.Status.includes("Đợi kiểm tra ...")) {
              dem1++;
            }
            if (e.Status.includes("Đang huỷ đơn ...")) {
              dem2++;
            }
            if (e.Status.includes("Đang chuyển hàng ...")) {
              dem3++;
            }
            if (e.Status.includes(this.stt4)) {
              dem4++;
            }
          });
          this.ArraySodDonChuaKLT.push(dem1);
          this.ArraySoDonDangHuy.push(dem2);
          this.ArrayDaThanhToan.push(dem3);
          this.ArrayDaHuyDon.push(dem4);
        }
        this.showArray.push(false);
      });
      
    });

    this.listtk = this.admin.GetListTK();
     
    this.listtk.splice(0, 1);


      this.ArayDate=[]
      this.ArrayTinhTrang=[]
      this.ArraySodDonChuaKLT=[]
      this.ArraySoDonDangHuy=[]
      this.ArrayDaThanhToan=[]
      this.ArrayDaHuyDon=[]



    this.listtk.forEach(element => {
      var dem1: number = 0;
      var dem2: number = 0;
      var dem3: number = 0;
      var dem4 = 0;

      if (isNullOrUndefined(element.Bill)) {
        this.ArayDate.push(new Date());
        this.ArrayTinhTrang.push("");
        this.ArraySodDonChuaKLT.push(dem1);
        this.ArraySoDonDangHuy.push(dem2);
        this.ArrayDaThanhToan.push(dem3);
        this.ArrayDaHuyDon.push(dem4);
      } else {
        this.ArayDate.push(element.Bill[element.Bill.length - 1].NgayXuat);
        this.ArrayTinhTrang.push(element.Bill[element.Bill.length - 1].Status);
        element.Bill.forEach(e => {
          if (e.Status.includes("Đợi kiểm tra ...")) {
            dem1++;
          }
          if (e.Status.includes("Đang huỷ đơn ...")) {
            dem2++;
          }
          if (e.Status.includes("Đang chuyển hàng ...")) {
            dem3++;
          }
          if (e.Status.includes(this.stt4)) {
            dem4++;
          }
        });
        this.ArraySodDonChuaKLT.push(dem1);
        this.ArraySoDonDangHuy.push(dem2);
        this.ArrayDaThanhToan.push(dem3);
        this.ArrayDaHuyDon.push(dem4);
      }
      this.showArray.push(false);
    });
  }

  showInfor(i: number) {
    for (let index = 0; index < this.showArray.length; index++) {
      if (index == i) {
        this.showArray[i] = !this.showArray[i];
      } else {
        this.showArray[index] = false;
      }
    }
  }

  ActionWhenClick(s: string, idBill: number, idkhach: number) {
    var listkkhachhang = this.admin.GetListTK();

    switch (s) {
      case "AcceptedBill": {
        Swal.fire({
          title: "Chấp nhận đơn hàng ? ",
          icon: "question",
          showConfirmButton: true,
          showCancelButton: true
        }).then(e => {
          if (e.value) {
            Swal.fire({ title: "OK", icon: "success", timer: 500 }).then(() => {
              for (let bill of listkkhachhang[idkhach].Bill) {
                if (bill.IdBill == idBill) {
                  bill.Status = this.stt3;
                  this.updb.UpListKhachHangToFB();
                  this.admin.UpdateListTK(listkkhachhang);
                }
              }
            });
          }
        });
        break;
      }

      case "DeletedBill": {
        Swal.fire({
          title: "Huỷ đơn hàng ? ",
          icon: "question",
          showConfirmButton: true,
          showCancelButton: true
        }).then(e => {
          if (e.value) {
            Swal.fire({
              title: "Huỷ thành công",
              icon: "success",
              timer: 500
            }).then(() => {
              for (let bill of listkkhachhang[idkhach].Bill) {
                if (bill.IdBill == idBill) {
                  bill.Status = this.stt4;
                  this.updb.UpListKhachHangToFB();
                  this.admin.UpdateListTK(listkkhachhang);
                }
              }
            });
          }
        });
        break;
      }
    }
    //console.log(listkkhachhang)
  }
}
