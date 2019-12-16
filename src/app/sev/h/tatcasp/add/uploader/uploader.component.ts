import Swal from "sweetalert2";
import { SanphamService } from "src/app/service-model/sanpham.service";
import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/service-model/admin.service";
import { Dep } from "src/app/service-model/dep";
import { UpfbService } from "src/app/service-model/upfb.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { isNullOrUndefined } from "util";

@Component({
  selector: "app-uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.css"]
})
export class UploaderComponent implements OnInit {
  constructor(
    public adservice: AdminService,
    private spservice: SanphamService,
    private updb: UpfbService,
    private route: ActivatedRoute,
    private cc: Router
  ) {}
  isHovering: boolean;

  filehinhtoAddFB: FileList;

  filehinhtemp = [];
  s;
  uppercent: number;
  isAdding: boolean = false;

  files: File[] = [];
  ListURL: string[] = [];
  date;

  sizeSlgTT: [number, number, number][] = [];
  ten: string = "";
  gia: number = 0;
  loai: string = "";
  hang: string = "";
  hangtemp: string = "";
  loaitemp = "";
  mota: string = "";

  sizegiaymacdinh = 36;

  Sanpham: Dep;
  subcribe;
  id = -1;
  nutthem = 0;
  nutsua = 0;
  isedit = false

  ngOnInit() {
    this.date = this.adservice.StringUrlchange.subscribe((url: string[]) => {
      this.ListURL = url;

      if (this.ListURL.length !== 0) {
        this.uppercent = (this.ListURL.length / this.filehinhtemp.length) * 100;
        //console.log(this.uppercent)
        document.getElementById("progressbar").style.width =
          this.uppercent + "%";

        // if(this.ListURL.length == this.filehinhtemp.length){
        //   Swal.fire('Upload completed','','success')
        // }
      }
      if (this.ListURL.length == this.filehinhtoAddFB.length) {
        if (this.nutthem != 0) {
          this.onSubmit();
        }
        if (this.nutsua != 0) {
          this.onSua();
        }
      }
    });

    console.log(this.cc.url);

    if (this.cc.url.includes("Edit")) {
      this.subcribe = this.spservice.SanPhamChange.subscribe((Sp: Dep[]) => {
        this.route.params.subscribe((params: Params) => {
          this.id = +params["id"];
          this.Sanpham = this.spservice.getSanPhambyID(this.id);

          this.ten = this.Sanpham.Ten;
          this.gia = this.Sanpham.Gia;
          this.loai = this.Sanpham.Loai;
          this.hang = this.Sanpham.Hang;
          this.sizeSlgTT = this.Sanpham.SizEvsGiAvsSolGvsTT;
          this.mota = this.Sanpham.MoTa;
          this.filehinhtemp = this.Sanpham.Img;

          this.isedit = true
          this.sizegiaymacdinh = this.Sanpham.SizEvsGiAvsSolGvsTT[this.Sanpham.SizEvsGiAvsSolGvsTT.length - 1][0];
          
          
        });
      });

      this.route.params.subscribe((params: Params) => {
        this.id = +params["id"];
        this.Sanpham = this.spservice.getSanPhambyID(this.id);

        this.ten = this.Sanpham.Ten;
        this.gia = this.Sanpham.Gia;
        this.loai = this.Sanpham.Loai;
        this.hang = this.Sanpham.Hang;
        this.sizeSlgTT = this.Sanpham.SizEvsGiAvsSolGvsTT;
        this.mota = this.Sanpham.MoTa;
        this.filehinhtemp = this.Sanpham.Img;

        this.isedit=true
        this.sizegiaymacdinh = this.Sanpham.SizEvsGiAvsSolGvsTT[
          this.Sanpham.SizEvsGiAvsSolGvsTT.length - 1
        ][0];
        
        
      });
    }
  }

  onChangeSize(e, i) {
    if (parseInt(e.target.value) >= 36 && parseInt(e.target.value) <= 44) {
      this.sizeSlgTT[i][0] = e.target.value;
    } else if (parseInt(e.target.value) == 0) {
      this.sizeSlgTT.splice(i, 1);
    } else {

      Swal.fire({title:'Oops',text:'Size quá lớn hoặc size quá nhỏ',icon:'error'})
      .then(()=>{e.target.value = this.sizegiaymacdinh;})

      
    }
    //console.log(this.sizeSlgTT);
  }

  onEscKey(i, e) {
    // this.sizeSlgTT.splice(i, 1);
    if (e.key == "Escape") this.sizeSlgTT.splice(i, 1);
    //console.log(e);
  }

  onAddSize() {
    if(isNullOrUndefined(this.sizeSlgTT)){
      this.sizeSlgTT = []
      this.sizeSlgTT.push([this.sizegiaymacdinh, 1, 0]);
    }
    else if (this.sizeSlgTT.length == 0) {
      this.sizeSlgTT.push([this.sizegiaymacdinh, 1, 0]);
    } else {
      this.sizegiaymacdinh++;
      this.sizeSlgTT.push([this.sizegiaymacdinh, 1, 0]);
    }
  }

  onSubmit() {
    // this.isAdding=true
    this.nutthem++;
    this.nutsua = 0;
    if(isNullOrUndefined(this.filehinhtoAddFB)){
      Swal.fire({title:'Oops',icon:'error',text:'Chọn hình ...'})
    }
    else
    {
      if (this.ListURL.length == this.filehinhtoAddFB.length) {
        if (this.hang == "Khác") {
          this.hang = this.hangtemp;
        }
        if (this.loai == "Khác") {
          this.loai = this.loaitemp;
        }
        var temp = new Dep(
          this.ten,
          this.mota,
          this.gia,
          this.sizeSlgTT,
          this.adservice.StringUrl,
          this.loai,
          this.hang
        );
  
        this.spservice.AddSptoList(temp);
        this.updb.UpListDepToFB();
  
        //  console.log(temp);
        Swal.fire("Thêm thành công", "", "success");
      } else {
        for (let i = 0; i < this.filehinhtoAddFB.length; i++) {
          this.files.push(this.filehinhtoAddFB[i]);
        }
      }
    }
  }

  //dang lam
  onSua() {
    this.nutsua++;
    this.nutthem = 0;
    // this.isAdding=true
    //console.log(isNullOrUndefined(this.filehinhtoAddFB))
    if (isNullOrUndefined(this.filehinhtoAddFB)) {
      if (this.hang == "Khác") {
        this.hang = this.hangtemp;
      }
      if (this.loai == "Khác") {
        this.loai = this.loaitemp;
      }
      var temp = new Dep(
        this.ten,
        this.mota,
        this.gia,
        this.sizeSlgTT,
        this.Sanpham.Img,
        this.loai,
        this.hang
      );

      this.spservice.upDateSPbyID(temp, this.id);
      this.updb.UpListDepToFB();

      //  console.log(temp);
      Swal.fire("Sửa thành công", "", "success");
    } else if (this.ListURL.length == this.filehinhtoAddFB.length) {
      if (this.hang == "Khác") {
        this.hang = this.hangtemp;
      }
      if (this.loai == "Khác") {
        this.loai = this.loaitemp;
      }
      var temp = new Dep(
        this.ten,
        this.mota,
        this.gia,
        this.sizeSlgTT,
        this.adservice.StringUrl,
        this.loai,
        this.hang
      );

      this.spservice.upDateSPbyID(temp, this.id);
      this.updb.UpListDepToFB();

      //  console.log(temp);
      Swal.fire("Sửa thành công", "", "success");
    } else {
      for (let i = 0; i < this.filehinhtoAddFB.length; i++) {
        this.files.push(this.filehinhtoAddFB[i]);
      }
    }
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    //console.log(files[0]);
    this.filehinhtoAddFB = files;
    var array = [];
    this.filehinhtemp = [];

    this.uppercent = 0;
    document.getElementById("progressbar").style.width = this.uppercent + "%";

    this.adservice.updateStringUrl(array);

    for (let i = 0; i < files.length; i++) {
      var reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = e => {
        {
          var t = <FileReader>e.target;
          //console.log(t)
          this.filehinhtemp.push(t.result);
          //this.files.push(files[i])
        }
      };
    }
  }
}
