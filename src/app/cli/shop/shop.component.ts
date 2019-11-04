import { Component, OnInit, Input } from '@angular/core';
import { SanphamService } from 'src/app/service-model/sanpham.service';
import { Dep } from 'src/app/service-model/dep';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit { 
   
  constructor(
    private sanphamService: SanphamService
  ) { }
    
  ngOnInit() {
  }
   
}
