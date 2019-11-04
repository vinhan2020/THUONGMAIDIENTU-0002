import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/service-model/admin.service";

@Component({
  selector: "app-uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.css"]
})
export class UploaderComponent implements OnInit {
  constructor(private adservice: AdminService) {}
  isHovering: boolean;

  files: File[] = [];
  ListURL: string[];
  date;

  ngOnInit() {
    this.date = this.adservice.StringUrlchange.subscribe((url: string[]) => {
      this.ListURL = url;
      console.log(this.ListURL);
    });
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
