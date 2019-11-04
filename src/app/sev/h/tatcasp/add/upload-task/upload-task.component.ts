import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "@angular/fire/storage";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";
import { AdminService } from "src/app/service-model/admin.service";

@Component({
  selector: "app-upload-task",
  templateUrl: "./upload-task.component.html",
  styleUrls: ["./upload-task.component.css"]
})
export class UploadTaskComponent implements OnInit {
  @Input() file: File;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string = "";

  UrlTemp =[]

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private addsv: AdminService
  ) {}

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {
    // The storage path
    const path = `hinh/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      // tap(console.log),
      
      // The file's download URL
      finalize(async () => {
        await ref
          .getDownloadURL()
          .toPromise()
          .then(url => {
            this.downloadURL=url
            this.UrlTemp = this.addsv.getURLString()
            this.UrlTemp.push(this.downloadURL)
            this.addsv.updateStringUrl(this.UrlTemp)
            //console.log(this.addsv.StringUrl)
          });
        this.db
          .collection("files")
          .add({ downloadURL: this.downloadURL, path });
      })
    );
  }

  isActive(snapshot) {
    return (
      snapshot.state === "running" &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }
}
