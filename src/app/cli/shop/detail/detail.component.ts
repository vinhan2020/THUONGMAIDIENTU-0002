import { Component, OnInit } from "@angular/core";
import { SanphamService } from "src/app/service-model/sanpham.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Dep } from "src/app/service-model/dep";
import { AdminService } from "src/app/service-model/admin.service";
import Swal from 'sweetalert2';
@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"]
})
export class DetailComponent implements OnInit {
  sp: Dep;
  id: number;

  hinhchinh: string = "";
  hinhphu: string[] = [];
  listSize: [number, number, number][] = new Array<[number, number, number]>()
  v =0

  a;
  constructor(
    private sanphamService: SanphamService,
    public route: ActivatedRoute,
    private router: Router,
    public adminservice: AdminService
  ) {}

  ngOnInit() {
    this.a = this.sanphamService.SanPhamChange.subscribe((dep: Dep[]) => {
      this.route.params.subscribe((params: Params) => {
        this.id = +params["id"];
          this.sp = this.sanphamService.getSanPhambyID(this.id);
      });
      this.hinhchinh = this.sp.Img[0];
      for (let index = 1; index < this.sp.Img.length; index++) {
        this.hinhphu.push(this.sp.Img[index]);
      }
    });

    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.sp = this.sanphamService.getSanPhambyID(this.id);
    });

    this.hinhchinh = this.sp.Img[0];
    for (let index = 1; index < this.sp.Img.length; index++) {
      this.hinhphu.push(this.sp.Img[index]);
    }

  }


  onSizeClick(i: number) 
  {
    var m = 0;
    if (this.listSize.length == 0) 
    {
      this.listSize.push([this.sp.SizEvsGiAvsSolGvsTT[i][0],1,0]);
    } 
    else 
    {
      for (var b = 0; b < this.listSize.length; b++) {
        if (this.sp.SizEvsGiAvsSolGvsTT[i][0] == this.listSize[b][0]) {
          m++;
        }
      }

      if (m == 0) {
        this.listSize.push([this.sp.SizEvsGiAvsSolGvsTT[i][0],1,0]);
      } 
      else 
      {
        alert("Đã chọn size" + " " + this.sp.SizEvsGiAvsSolGvsTT[i][0]);
      }
    }

  }

  onChange(event, i: number) {
    if (parseInt(event.target.value) <= 0) 
    {
      alert("Nhập số lượng lớn hơn 0");
      event.target.value = 1;
    } 
    else 
    {
      this.listSize[i][1] = parseInt(event.target.value);
    }
    console.log(this.listSize)
  }

  onDelete(i: number) {
    this.listSize.splice(i, 1);
    
  }
  onDatHang() {
    if(this.listSize.length == 0)
    {
      Swal.fire('pls chọn size','','error')
    }
    else {
      var y = new Dep(
        this.sp.Ten,
        this.sp.MoTa,
        this.sp.Gia,
        this.listSize,
        this.sp.Img,
        this.sp.Loai,
        this.sp.Hang
      );
      y.ID = this.sp.ID

      this.sanphamService.AddtoGioHang(y);
      this.listSize = []
  
      Swal.fire({icon:'success',title:'Added',position:'top-right',timer:500})
    }
  }

  onHinhPhuChange(e) {}

  OnHinhChinhChange(e) {}

  onSua() {}
}
