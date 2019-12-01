import { Dep } from "./dep";

export class Bill {
  IdBill: number;
  SanPham: Dep[];
  TongTien: number;
  NgayXuat: Date;
  Status: string;

  constructor(sanpham: Dep[], ngayxuat: Date,tongtien : number) {
    this.SanPham = sanpham;
    this.NgayXuat = ngayxuat;
    this.TongTien=tongtien
  }
}
