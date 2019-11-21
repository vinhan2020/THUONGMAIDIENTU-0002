import Swal from 'sweetalert2';
import { SanphamService } from "src/app/service-model/sanpham.service";
import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/service-model/admin.service";
import { Dep } from 'src/app/service-model/dep';

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
  
  filehinhtoAddFB :FileList
  filehinhtemp = [];
  s;
  uppercent:number
  isAdding :boolean = false

  files: File[] = [];
  ListURL: string[]=[];
  date;

  sizeSlgTT: [number, number, number][] = [];
  ten: string = "";
  gia: number = 0;
  loai: string = "";
  hang: string = "";

  hangtemp: string = "";
  loaitemp = ""

  mota: string = "";
  listSP: Dep[] = [];

  ngOnInit() {
    this.date = this.adservice.StringUrlchange.subscribe((url: string[]) => {
      this.ListURL = url;

      // console.log(this.ListURL.length);
      // console.log(this.filehinhtemp.length)

      if(this.ListURL.length !== 0)
      {
        this.uppercent = this.ListURL.length  / this.filehinhtemp.length * 100
        //console.log(this.uppercent)
        document.getElementById("progressbar").style.width = this.uppercent+"%"
        
        // if(this.ListURL.length == this.filehinhtemp.length){
        //   Swal.fire('Upload completed','','success')
        // }
      }
      if(this.ListURL.length == this.filehinhtoAddFB.length){
        this.onSubmit()
      }
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

  onEscKey(i, e) {
    // this.sizeSlgTT.splice(i, 1);
    if (e.key == "Escape") this.sizeSlgTT.splice(i, 1);
    //console.log(e);
  }

  onAddSize() {
    this.sizeSlgTT.push([36, 1, 0]);
  }

  onSubmit() {
    // this.isAdding=true
    if (this.ListURL.length == this.filehinhtoAddFB.length) 
    {
      if (this.hang == "Khác") {
        this.hang = this.hangtemp;
      }
      if(this.loai== "Khác"){
        this.loai = this.loaitemp
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
      this.listSP.push(temp);
      this.spservice.upDateSanPham(this.listSP);
      console.log(temp);
      Swal.fire('Add Completed','','success')
    }
    else{
      for(let  i = 0 ; i<this.filehinhtoAddFB.length;i++){
        this.files.push(this.filehinhtoAddFB[i])
      }
    }

  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    //console.log(files);
    this.filehinhtoAddFB = files
    var array = []
    this.filehinhtemp=[]

    this.uppercent=0
    document.getElementById("progressbar").style.width = this.uppercent+"%"

    this.adservice.updateStringUrl(array)
    
    for (let i = 0; i < files.length; i++) {
      var reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = e =>{
        {
          var t = <FileReader> e.target
          // console.log(t)
          this.filehinhtemp.push(t.result);
          //this.files.push(files[i])
        }
      }
    }
  }
}
