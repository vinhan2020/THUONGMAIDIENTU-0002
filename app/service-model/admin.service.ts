import { Injectable, EventEmitter } from "@angular/core";
import { Account } from "./account";
import { Khachhang } from "./khachhang";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  constructor() {}

  Admin: boolean = false;
  IsLogedIn = false;
  Dem: number = 0;

  User: Khachhang = new Khachhang("", "", "Guest", false, "Guest", "", "");
  Guest: Khachhang = new Khachhang("", "", "Guest", false, "Guest", "", "");

  ListTK: Khachhang[] = [
    new Khachhang("1", "1", "Admin", false, "Minh", "0931878825", "abc 123"),
    new Khachhang(
      "2",
      "2",
      "Guest",
      false,
      "Max",
      "098765432",
      "weqweqw dasdsada"
    ),
    new Khachhang(
      "3",
      "3",
      "Guest",
      false,
      "qwerP",
      "098765432",
      "weqweqw dasdsada"
    )
  ];

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
