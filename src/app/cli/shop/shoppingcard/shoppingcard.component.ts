import { Component, OnInit } from "@angular/core";
import { SanphamService } from "src/app/service-model/sanpham.service";
import { Dep } from "src/app/service-model/dep";

@Component({
  selector: "app-shoppingcard",
  templateUrl: "./shoppingcard.component.html",
  styleUrls: ["./shoppingcard.component.css"]
})
export class ShoppingcardComponent implements OnInit {
  constructor(private sanphamService: SanphamService) {}

  gioHang: Dep[];
  listGia: number[] = [];
  GiaTemp: number = 0;
  Sub;

  ngOnInit() {
    this.gioHang = this.sanphamService.GetGioHang();

    {
      this.Sub = this.sanphamService.GioHangChange.subscribe((gh: Dep[]) => {
        this.gioHang = gh;
        this.listGia = [];
        this.gioHang.forEach(Dep => {
          Dep.SizEvsGiAvsSolGvsTT.forEach(element => {
            element[2] = Dep.Gia * element[1];
            this.GiaTemp = this.GiaTemp + element[2];
          });
          this.listGia.push(this.GiaTemp);
          this.GiaTemp = 0;
        });
      });
    }

    {
      this.gioHang.forEach(Dep => {
        Dep.SizEvsGiAvsSolGvsTT.forEach(element => {
          element[2] = Dep.Gia * element[1];
          this.GiaTemp = this.GiaTemp + element[2];
        });

        this.listGia.push(this.GiaTemp);
        this.GiaTemp = 0;
      });
    }
  }

  OnPlusClick(indexGioHang, indexOfDsSize) {
    this.gioHang[indexGioHang].SizEvsGiAvsSolGvsTT[indexOfDsSize][1]++;
    this.sanphamService.UpdateGioHang(this.gioHang);
  }

  OnPlusMinusClick(indexGioHang, indexOfDsSize, event) {
    //console.log   (indexGioHang + " "+ indexOfDsSize + " "+ event.target.value)

    {
      this.gioHang[indexGioHang].SizEvsGiAvsSolGvsTT[
        indexOfDsSize
      ][1] = parseInt(event.target.value);
      if (
        this.gioHang[indexGioHang].SizEvsGiAvsSolGvsTT[indexOfDsSize][1] < 1
      ) {
        if (confirm("Decrease will delete this size ? U want ???")) {
          this.gioHang[indexGioHang].SizEvsGiAvsSolGvsTT.splice(
            indexOfDsSize,
            1
          );
        } else {
          this.gioHang[indexGioHang].SizEvsGiAvsSolGvsTT[indexOfDsSize][1] = 1;
          event.target.value =1 
        }
      }
      if (this.gioHang[indexGioHang].SizEvsGiAvsSolGvsTT.length == 0) {
        this.gioHang.splice(indexGioHang, 1);
      }
      this.sanphamService.UpdateGioHang(this.gioHang);
    }
  }

  onValueChange(event) {
    console.log(event.target.value);
  }
}
