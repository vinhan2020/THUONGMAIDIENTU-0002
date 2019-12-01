import { Component, OnInit, Input } from '@angular/core';
import { SanphamService } from 'src/app/service-model/sanpham.service';
import { Dep } from 'src/app/service-model/dep';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.css"]
})
export class ShopComponent implements OnInit {
  listsp: Dep[];
  a;
  atShoptab :boolean

  constructor(private sanphamService: SanphamService,private route :Router) {}

  ngOnInit() {
    this.a = this.sanphamService.SanPhamChange.subscribe((SP: Dep[]) => {
      this.listsp = SP;
    });
    this.listsp = this.sanphamService.getSanPham();
    if(this.route.url.includes("Shop")){
      this.atShoptab = true
    } else { this.atShoptab = false}
  }
}
