import { Khachhang } from "./khachhang";

export class Dep {
  ID: number;
  Ten: string;
  MoTa: string;
  SizEvsGiAvsSolGvsTT: [number, number, number][];
  Gia:number
  Img: string[];
  Loai: string;
  Hang: string;
  TinhTrang: string;

  NgayChinhGiaVsGiaCu: [Date, number][];
  DanhGia: [Khachhang, string][];
  NgayThem : Date

  constructor(
    ten: string,
    mota: string,
    gia:number,
    sizegiaslgTt: [number, number, number][],
    img: string[],
    loai: string,
    hang: string
  ) {
    this.Img = img;
    this.Loai = loai;
    this.Ten = ten;
    this.MoTa = mota;
    this.Gia = gia
    this.SizEvsGiAvsSolGvsTT = sizegiaslgTt;
    this.Hang = hang;

    this.TinhTrang = "Còn hàng";
    this.NgayChinhGiaVsGiaCu = [];
    this.DanhGia = [];
    

  }
}
