import { Dep } from "src/app/service-model/dep";
import { SanphamService } from "./../../../service-model/sanpham.service";
import { Component, OnInit, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-tatcasp",
  templateUrl: "./tatcasp.component.html",
  styleUrls: ["./tatcasp.component.css"]
})
export class TatcaspComponent implements OnInit {
  listsp: Dep[];
  a: Subscription;
  constructor(private sanphamSV: SanphamService) {}

  ngOnInit() {
    this.a = this.sanphamSV.SanPhamChange.subscribe((DSSP: Dep[]) => {
      this.listsp = DSSP;
    });
    this.listsp = this.sanphamSV.getSanPham();
    //console.log(document.getElementById('rowtenthu0'))
  }

  onLoadComplete() {
    console.log("compplete");
  }

  b = 0;
  c = 0;

  ngAfterViewChecked(): void {
    this.b++
    console.log(this.b)
    console.log(document.getElementById('rowtenthu3'))
    
    for (let index = 0; index < this.listsp.length; index++) {
      var a = 'rowtenthu'+index
      var p = 'rowmotathu'+index
      document.getElementById(a).style.height= document.getElementById('rowtenthu3').clientHeight + 'px'
    }


    // for (var index = 0; index < this.listsp.length; index++) {
    //   var temp1 = "rowtenthu" + index;
    //   if (this.b < document.getElementById(temp1).clientHeight) {
    //     this.b = document.getElementById(temp1).clientHeight;
    //     //console.log(document.getElementById(temp1).clientHeight);
    //   }
    //   this.c++;
    // }
  }
}
