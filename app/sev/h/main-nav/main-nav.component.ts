import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";

@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.css"]
})
export class MainNavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  labelPosition = "";

  constructor(private breakpointObserver: BreakpointObserver) {}
  ngOnInit() {}
  isShow = [false, false, false, false];

  changeStatusShow(e) {
    for (var i = 0; i < this.isShow.length; i++) {
      if (e == i) {
        this.isShow[i] = !this.isShow[i];
      } else {
        this.isShow[i] = false;
      }
    }
  }

  backToClient() {
    document.getElementById("foot").style.display = "block";
  }

  listmau: [number, boolean][] = [[0, true], [1, false]];

  onChange(ev) {
    this.labelPosition = ev.target.value;
    console.log(this.labelPosition);
  }
}
