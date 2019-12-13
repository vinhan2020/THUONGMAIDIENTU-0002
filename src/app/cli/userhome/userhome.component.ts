import { Component, OnInit } from '@angular/core';
import { Khachhang } from 'src/app/service-model/khachhang';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  User:Khachhang
  a
  mangxuathien:Array<boolean>

  constructor() { }

  ngOnInit() {
    document.getElementById('foot').style.display = 'none'
    
  }

}
