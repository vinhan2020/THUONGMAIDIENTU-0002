import { SanphamService } from 'src/app/service-model/sanpham.service';
import { Dep } from './../../../../../service-model/dep';
import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/service-model/admin.service";

@Component({
  selector: "app-uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.css"]
})
export class UploaderComponent implements OnInit {
  constructor(
    private adservice: AdminService,
    private spservice: SanphamService
  ) {}
  isHovering: boolean;

  files: File[] = [];
  ListURL: string[];
  date;

  sizeSlgTT: [number, number, number][] = [];
  ten: string = "";
  gia: number = 0;
  loai: string = "";
  hang: string = "";
  temp :string =""
  mota: string = "";
  listSP: Dep[] = [];

  ngOnInit() {
    this.date = this.adservice.StringUrlchange.subscribe((url: string[]) => {
      this.ListURL = url;
      console.log(this.ListURL);
    });
    this.listSP = this.spservice.getSanPham();
  }

  onChangeSize(e, i) {
    if (parseInt(e.target.value) >= 36 && parseInt(e.target.value) <= 44) {
      this.sizeSlgTT[i][0] = e.target.value;
    } else if (parseInt(e.target.value) == 0) {
      this.sizeSlgTT.splice(i, 1);
    } else {
      alert("Nhập size trong khoảng 36 - 44");
      e.target.value = 36;
    }
    //console.log(this.sizeSlgTT);
  }

  onEscKey(i,e){ 
    // this.sizeSlgTT.splice(i, 1);
    if(e.key == "Escape") this.sizeSlgTT.splice(i, 1);
    console.log(e)
  }

  onAddSize() {
    this.sizeSlgTT.push([36, 1, 0]);
  }

  onSubmit() {
    if(this.hang == "Khác") {this.hang = this.temp}
    var temp = new Dep(
      this.ten,
      this.mota,
      this.gia,
      this.sizeSlgTT,
      this.adservice.StringUrl,
      this.loai,
      this.hang
    );
    this.listSP.push(temp);
    this.spservice.upDateSanPham(this.listSP);
    console.log(temp);
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }
}
