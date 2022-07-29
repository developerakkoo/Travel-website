import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import {Howl, Howler} from 'howler';
@Component({
  selector: 'app-enquiry-list',
  templateUrl: './enquiry-list.component.html',
  styleUrls: ['./enquiry-list.component.scss']
})
export class EnquiryListComponent implements OnInit {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  list:any;
  sound = new Howl({
    src: ['assets/notify.mp3']
  });
  
  
  constructor(private db: AngularFireDatabase,
    private data: DataService,
    private router: Router) {
    this.itemsRef = db.list('enquiry');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges(['child_added']).pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, value: c.payload.val() }))
      )
    );



   }

   ngOnInit() {
    this.itemsRef.snapshotChanges(['child_added']).subscribe((value) =>{
      console.log(value);
      console.log("new Enquiry Added");
      this.list = value;
      this.sound.play();
      this.sound.once('load', () =>{
        this.sound.play();
      });
    
    },(error) =>{
      console.log(error);
      
    })
  }

  openEnquiry(key:any){
    console.log(key);
    this.router.navigate(['enquiry', key]);
    
  }
}
