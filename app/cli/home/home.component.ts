import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service-model/admin.service';
import { Dep } from 'src/app/service-model/dep';
import { SanphamService } from 'src/app/service-model/sanpham.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ListSanPham: Dep[];
   constructor(private admin:AdminService,
              private sanphamService: SanphamService,
              ) { }

  ngOnInit() {
    this.sanphamService.SanPhamChange;
    this.ListSanPham = this.sanphamService.getSanPham();

    document.getElementById("NavigateBar").style.display='flex'
    this.admin.Admin = false;
    
  }

}
 