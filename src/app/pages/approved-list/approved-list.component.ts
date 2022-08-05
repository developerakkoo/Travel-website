import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Howl } from 'howler';
import { Observable, map } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-approved-list',
  templateUrl: './approved-list.component.html',
  styleUrls: ['./approved-list.component.scss']
})
export class ApprovedListComponent implements OnInit {

  
  itemsRef!: AngularFireList<any>;
  items!: Observable<any[]>;

  list:any;
  sound = new Howl({
    src: ['assets/notify.mp3']
  });
  
  
  constructor(private db: AngularFireDatabase,
    private data: DataService,
    private router: Router) {
   



   }

   async ngOnInit() {
    let userId = await this.data.get('userId');

    this.itemsRef = this.db.list(`AcceptedQuote/${userId}`);
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges(['child_added']).pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, value: c.payload.val() }))
      )
    );
    this.itemsRef.snapshotChanges(['child_added'])
    .subscribe((value) =>{
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

  openApproved(item:any){
    console.log(item);
    
    this.router.navigate(['approved', item.key]);

  }


}
