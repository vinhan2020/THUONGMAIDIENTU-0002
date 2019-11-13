import { Component, OnInit } from "@angular/core";
import { SanphamService } from "src/app/service-model/sanpham.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Dep } from "src/app/service-model/dep";
@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"]
})
export class DetailComponent implements OnInit {
  sp: Dep;
  id: number;
  hinhchinh : string
  hinhphu:string[]
  listSize: [number, number, number][] = [];
  constructor(
    private sanphamService: SanphamService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.sp = this.sanphamService.getSanPhambyID(this.id);
    });
    this.hinhchinh = this.sp.Img[0]
    this.sp.Img.splice(0,1)
  }
  onSizeClick(i: number) {
    var m = 0;
    if (this.listSize.length == 0) {
      this.listSize.push(this.sp.SizEvsGiAvsSolGvsTT[i]);
    } else {
      for (var b = 0; b < this.listSize.length; b++) {
        if (this.sp.SizEvsGiAvsSolGvsTT[i][0] == this.listSize[b][0]) {
          m++;
        }
      }

      if (m == 0) {
        this.listSize.push(this.sp.SizEvsGiAvsSolGvsTT[i]);
      } else {
        alert("Đã chọn size" + " " + this.sp.SizEvsGiAvsSolGvsTT[i][0]);
      }
    }
  }
  onChange(event, i: number) {
    if (parseInt(event.target.value) <= 0) {
      alert("Nhập số lượng lớn hơn 0");
      event.target.value = 1;
    } else {
      this.listSize[i][1] = parseInt(event.target.value);
    }
  }

  onDelete(i: number) {
    this.listSize.splice(i, 1);
  }
  onDatHang() {
    var y = new Dep(
      this.sp.Ten,
      this.sp.MoTa,
      this.sp.Gia,
      this.listSize,
      this.sp.Img,
      this.sp.Loai,
      this.sp.Hang
    );
    this.sanphamService.AddtoGioHang(y);
    alert("Success");
  }
}
