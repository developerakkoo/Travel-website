import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.scss']
})
export class SenderComponent implements OnInit {

  userId:any;
  user:any;


  //REceiver VAriable
  mobile:any;
  name:any;
  city:any;
  address:any;
  flat:any;


  constructor(private data: DataService,
              private db: AngularFireDatabase,
              private http: HttpClient) {
             
               }

  async ngOnInit() {
    this.userId = await this.data.get('userId');
    console.log(`UserId on sender Component ${this.userId}`);
    this.getUserData();
 

    
  }

  async getUserData(){
    this.db.object(`Users/${this.userId}`)
    .snapshotChanges()
    .subscribe((user) =>
    {
      console.log(user.payload.val());
      console.log("Received User");
      this.user = user.payload.val();
      
    }, (error) =>{
      console.log(error);
      
    })
  }

  async SubmitData(){
    let receiverObj = {
      name: this.name,
      mobile: this.mobile,
      city: this.city,
      address: this.address,
      flat: this.flat
    }

    let userObj = this.user;

    this.db.object(`OrderAddress/${this.userId}`).set({
      user: userObj,
      receiver: receiverObj
    }).then((success) =>{
      console.log(success);
      
    }).catch((error) =>{
      console.log(error);
      
    })
    console.log(receiverObj);
    console.log(userObj);
    
    
  }

}
