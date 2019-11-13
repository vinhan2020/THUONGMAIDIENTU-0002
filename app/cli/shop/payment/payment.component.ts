import { Component, OnInit } from '@angular/core';
import { SanphamService } from 'src/app/service-model/sanpham.service';
import { Dep } from 'src/app/service-model/dep';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private sanphamService: SanphamService) {}

  gioHang: Dep[];
  listGia: number[] = [];
  TongTien = 0
  

  

  ngOnInit() {
    this.gioHang = this.sanphamService.GetGioHang();
    console.log(this.listGia);
    this.gioHang.forEach(Dep => {
      Dep.SizEvsGiAvsSolGvsTT.forEach(element => {
        this.TongTien =this.TongTien+ element[2]
        
      });
      
    });
  }

}
