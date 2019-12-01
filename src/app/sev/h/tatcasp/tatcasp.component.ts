import { Dep } from "src/app/service-model/dep";
import { SanphamService } from "./../../../service-model/sanpham.service";
import { Component, OnInit, EventEmitter } from "@angular/core";
import {  Subscription } from 'rxjs';

@Component({
  selector: "app-tatcasp",
  templateUrl: "./tatcasp.component.html",
  styleUrls: ["./tatcasp.component.css"]
})
export class TatcaspComponent implements OnInit {
  listsp: Dep[];
  a:Subscription;
  constructor(private sanphamSV: SanphamService) {}

  ngOnInit() {
    this.a = this.sanphamSV.SanPhamChange.subscribe((DSSP: Dep[]) => {
      this.listsp = DSSP;
    });
    this.listsp = this.sanphamSV.getSanPham();
  }








}
