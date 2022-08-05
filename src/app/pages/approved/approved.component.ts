import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.scss']
})
export class ApprovedComponent implements OnInit {

  itemkey:any;

  startOtp:any;
  stopOtp:any;

  itemsRef:any;
  items:any;

  userId:any;

  images:any = [];
  pickup:any;
  drop:any;
  date:any;
  time:any;
  isHelper = true;
  ispackaging = true;

  sender:any;
  receiver:any;

  quote:any


  constructor(private data: DataService,
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute) 
    {
      this.itemkey = this.route.snapshot.paramMap.get('id');
      console.log(`customer id on approved ${this.itemkey}`);
     }

  async ngOnInit() {
   this.userId = await this.data.get("userId");
   console.log(`USerId on approved ${this.userId}`);
  this.db.object(`AcceptedQuote/${this.userId}/${this.itemkey}`).valueChanges().subscribe((data:any) => {
    console.log(data);
    this.images = data.images;
    this.pickup =  data.user.flat+ " " + data.user.address;
    this.drop =  data.receiver.address;
    this.date = data.date;
    this.time = data.time;
    this.quote = data.quote;
    this.sender = data.user;
    this.receiver = data.receiver;
  })

   
  this.startOtp = this.generateOTP(4);
  this.stopOtp = this.generateOTP(4);

    
  }

 generateOTP(limit:any) {
          
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < limit; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
  startTrip(){
    this.db.object(`orderConfirmed/${this.sender.key}/orderStatus`).set({
      status: 'confirmed'
    }).then((success) => {
      console.log(success);
      
    }).catch((error) => {
      console.log(error);
      
    })
  }

  endTrip(){
    this.db.object(`orderConfirmed/${this.sender.key}/orderStatus`).set({
      status: 'delivered'
    }).then((success) => {
      console.log(success);
      
    }).catch((error) => {
      console.log(error);
      
    })
  }

submit(){
  this.db.object(`orderConfirmed/${this.sender.key}`).set({
    sender: this.sender,
    receiver: this.receiver,
    images: this.images,
    date: this.date,
    time: this.time,
    quote: this.quote,
    startOtp: this.startOtp,
    stopOtp: this.stopOtp
  }).then((response) => {
    console.log(response);
    
  }).catch((error) => {
    console.log(error);
    
  })

}
}
