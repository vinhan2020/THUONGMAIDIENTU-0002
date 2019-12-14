import { Injectable, EventEmitter } from "@angular/core";
import { Khachhang } from "./khachhang";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  constructor() {}

  Admin: boolean = false;
  IsLogedIn = false;
  Dem: number = 0;
  sodembatky = Math.floor(Math.random() * 100000 + 1);
  ListKhachHangChange = new EventEmitter<Khachhang[]>();

  User: Khachhang = new Khachhang(
    undefined,
    undefined,
    "Guest",
    false,
    "Guest" + this.sodembatky,
    0,
    ""
  );
  
  Guest: Khachhang = new Khachhang(
    undefined,
    undefined,
    "Guest",
    false,
    "Guest" + this.sodembatky,
    0,
    ""
  );

  ListTK: Khachhang[] = [];

  getTkbyID(i) {
    return this.ListTK[i];
  }

  GetListTK() {
    return this.ListTK.slice();
  }

  themTKvaoListTk(tk: Khachhang) {
    this.ListTK.push(tk);
    this.ListKhachHangChange.emit(this.ListTK.slice());
  }

  UpdateListTK(TK: Khachhang[]) {
    this.ListTK = TK;
    this.ListKhachHangChange.emit(this.ListTK.slice());
  }

  updatetkbyid(tk: Khachhang, i) {
    this.ListTK[i] = tk;
    this.ListKhachHangChange.emit(this.ListTK.slice());
  }

  getIDUser(tk: String) {
    for (let index = 0; index < this.ListTK.length; index++) {
      if (tk == this.ListTK[index].TK) {
        if (tk != "") {
          return index;
        }
      }
    }
  }

  StringUrlchange = new EventEmitter<string[]>();
  StringUrl: string[] = [];

  updateStringUrl(url: string[]) {
    this.StringUrl = url;
    this.StringUrlchange.emit(this.StringUrl.slice());
  }

  getURLString() {
    return this.StringUrl;
  }
}
