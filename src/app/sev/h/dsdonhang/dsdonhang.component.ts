import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/service-model/admin.service";
import { Bill } from "src/app/service-model/bill";
import { Khachhang } from 'src/app/service-model/khachhang';
import { DatePipe } from '@angular/common';

@Component({
  selector: "app-dsdonhang",
  templateUrl: "./dsdonhang.component.html",
  styleUrls: ["./dsdonhang.component.css"]
})
export class DsdonhangComponent implements OnInit {
  MangBill: Bill[]= []
  a;
  listtk:Khachhang[]
  ArayDate:Date[] = []
  constructor(private admin: AdminService,public datepipe : DatePipe) {}

  ngOnInit() {

    this.a = this.admin.ListKhachHangChange.subscribe((Khach:Khachhang[]) => 
    {
      
      this.listtk = Khach
      this.listtk.splice(0,1)
      this.listtk.forEach(element => {
        this.ArayDate.push(element.Bill[element.Bill.length-1].NgayXuat)
      });

    });

    this.listtk = this.admin.GetListTK()
    this.listtk.splice(0,1)
    this.listtk.forEach(element => {
      this.ArayDate.push(element.Bill[element.Bill.length-1].NgayXuat)
    });
    
    

    // this.admin.ListTK.forEach(element => {
    //   element.Bill.forEach(elem => {
    //     this.MangBill.push(elem);
    //   });
    // });
  }
}
