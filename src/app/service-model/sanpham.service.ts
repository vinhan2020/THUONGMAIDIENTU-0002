import { Injectable, EventEmitter } from "@angular/core";
import { Dep } from "./dep";
import { isNullOrUndefined } from 'util';


@Injectable({
  providedIn: "root"
})
export class SanphamService {
  
  SanPhamChange = new EventEmitter<Dep[]>();
  constructor() {}



  ListSanPham: Dep[] = [];

  getSanPham() {
    return this.ListSanPham.slice();
  }

  getSanPhambyID(i: number) {
    var item ;
    this.ListSanPham.forEach(element => {
      if(element.ID == i ) {
        item = element
      }
    });
    return item
  }

  AddSptoList(dep:Dep){
    if(isNullOrUndefined(this.ListSanPham)){
      this.ListSanPham = []
      this.ListSanPham.push(dep)
    } else {
      this.ListSanPham.push(dep)
    }
    

    this.ListSanPham.map((element,i) => {
      element.ID=i
    });

    this.SanPhamChange.emit(this.ListSanPham.slice())
  }

  upDateSanPham(sanpham: Dep[]) {
    this.ListSanPham = sanpham;
    // this.ListSanPham.map((element,i) => {
    //   element.ID=i
    // });
    this.SanPhamChange.emit(this.ListSanPham.slice());
  }

  upDateSPbyID(sp :Dep, i){

    this.ListSanPham[i] = sp
    this.ListSanPham.map((element,i) => {
      element.ID=i
    });
    this.SanPhamChange.emit(this.ListSanPham.slice())
  }

  GioHang: Dep[] = [new Dep(
    "DÉP CROCS LITERIDE BLACK/GREY/WHITE LOGO 2019", //tên
    "", //mô tả

    25000,
    [[41, 1, 0]],
    [
      "https://cdn.vortexs.io/api/images/85191436-6def-4179-8cfd-b9c52b714174/1140/w/hang-chinh-hang-dep-crocs-literide-black-grey-white-logo-2019.jpeg",
      "https://cdn.vortexs.io/api/images/9ea043d5-7851-44af-997b-5b5c2750bcd3/1140/w/hang-chinh-hang-dep-crocs-literide-black-grey-white-logo-2019.jpeg",
      "https://cdn.vortexs.io/api/images/88e8ae44-5597-466e-9cfa-5960023d36f9/1140/w/hang-chinh-hang-dep-crocs-literide-black-grey-white-logo-2019.jpeg",
      `https://cdn.vortexs.io/api/images/816adf77-1446-40ab-994a-52e26957830a/1140/w/hang-chinh-hang-dep-crocs-literide-black-grey-white-logo-2019.jpeg`
    ], //hình
    "Dép Crocs", //loại
    "Crocs" //hãng
  )];
  GioHangChange = new EventEmitter<Dep[]>();

  GetGioHang() {
    return this.GioHang.slice();
  }

  AddtoGioHang(depmuonThem: Dep) {
    this.GioHang.push(depmuonThem);
    this.GioHangChange.emit(this.GioHang.slice());
  }

  UpdateGioHang(giohang : Dep[]){
    this.GioHang = giohang;
    this.GioHangChange.emit(this.GioHang.slice());
  }
  XoaSanPhamGioHang(i: number){
    this.GioHang.splice(i,1);
    this.GioHangChange.emit(this.GioHang.slice());
  }























  
}
