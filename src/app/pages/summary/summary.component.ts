import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  userId:any;
  images:any[] =[];

  user = {
    mobile: "",
    Alternate: "",
    acceptTerms:null,
    address: "",
    dropdown: "",
    email: "",
    flat: "",
    initials: "",
    key: "",
    lastName: "",
    password:"",
    title:""
  };


  receiver = {
    
      address: "",
      city: "",
      flat: "",
      mobile: "",
      name: ""
  };

  date:any;
  time:any;
  
  constructor(private data: DataService,
              private db: AngularFireDatabase,
              private router: Router) { }

  async ngOnInit() {
    this.userId = await this.data.get('userId');
    console.log(`USerId in Summary Component ${this.userId}`);
    this.getImages();
    this.getSenderReceiver();
    this.getDateTime();
    
  }

  getDateTime(){
    this.db.object(`order/${this.userId}/datetime`).valueChanges()
    .subscribe((data:any) =>{
      console.log(data);
      this.date = data['date'];
      this.time = data['time'];
      
    }, (error) =>{
      console.log(error);
      
    })
  }

  getImages(){
    this.db.list(`orderUploadImages/${this.userId}`)
    .valueChanges()
    .subscribe((data) =>{
      console.log(data);
      this.images = data;
      
    },(error) =>{
      console.log(error);
      
    })
  }

  getSenderReceiver(){
    this.db.object(`OrderAddress/${this.userId}`)
    .valueChanges()
    .subscribe((data:any) =>{
      console.log(data);
      this.user = data['user'];
      this.receiver = data['receiver'];
    }, (error) =>{
      console.log(error);
      
    })
  }

  submit(){
    let data = [
      {
        user: this.user,
        receiver: this.receiver,
        time: this.time,
        date: this.date,
      
      
        images: this.images
      }

    ]
    this.db.list(`enquiry`).push(data).then((value) =>{
      console.log(value);
      this.router.navigate(['quotations']);
      
    }).catch((error) =>{
      console.log(error);
      
    })
  }
}
