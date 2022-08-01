import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.scss']
})
export class ApprovedComponent implements OnInit {

  startOtp = 123;
  stopOtp = 546;

  constructor(private data: DataService,
    private db: AngularFireDatabase,
    private router: Router) { }

  ngOnInit() {
  }

  getData(){
    
  }

}
