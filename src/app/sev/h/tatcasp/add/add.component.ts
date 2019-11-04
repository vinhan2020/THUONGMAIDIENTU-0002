import { Component, OnInit } from "@angular/core";
import { SanphamService } from "src/app/service-model/sanpham.service";
import { Dep } from "src/app/service-model/dep";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"]
})
export class AddComponent implements OnInit {
  // ten = "";
  // gia: number = 0;
  // hinhchinh = "";
  // hinh: string[] = [];
  // mota = "";
  // size: [number, number, number][] = [];

  constructor(private sp: SanphamService) {}

  ngOnInit() {}

  // onSizePLus() {
  //   this.size.push([0, 1, 0]);
  // }
  // onChangeSize(i, event) {
  //   //console.log(event.target.value)
  //   this.size[i][0] = parseInt(event.target.value);
  // }

  // onAddClick() {
  //   this.hinh.splice(0, 0, this.hinhchinh);
  //   var temp = new Dep(
  //     this.ten,
  //     this.mota,
  //     this.gia,
  //     this.size,
  //     this.hinh,
  //     "Adidas",
  //     "Adidas"
  //   );
  //   this.sp.ListSanPham.push(temp);
  //   console.log(temp)
  // }

  // conghinh(i, event) {
  //   this.hinh.push("");
  // }

  // hinhphuchange(i, event) {
  //   this.hinh[i] = event.target.value;
  // }
}
