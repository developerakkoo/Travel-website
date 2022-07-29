import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.scss']
})
export class QuotationsComponent implements OnInit {
  userName = '';
  radio:any;
  entervalues:any;
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

  selectedQuote:any;

  quoteRef!: AngularFireList<any>;
  quotes!: Observable<any[]>;
  
  constructor(private data: DataService,
              private db: AngularFireDatabase,
              private router: Router) { 
                
             
              }

  async ngOnInit() {
    this.userId = await this.data.get('userId');
    console.log(`USerId in Quotation Component ${this.userId}`);
   // Use snapshotChanges().map() to store the key
   this.quoteRef = this.db.list('orderQuote', ref => ref.orderByChild('customerId').equalTo(this.userId));
   this.quotes = this.quoteRef.snapshotChanges().pipe(
     map(changes => 
       changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
     )
   );
   this.quotes.subscribe((quote) =>{
    console.log(quote);
    
   },(error) =>{
    console.log(error);
    
   })
   
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


  
select(event:any, item:any){
  console.log(event.target.checked);
  if(event.target.checked == true){
    console.log(item);
    this.selectedQuote = item;

  }
  
  
}

submit(){

  let obj = {
    quote: this.selectedQuote,
    user: this.user,
    receiver: this.receiver,
    images: this.images,
    date: this.date,
    time: this.time,
    agentId: this.selectedQuote['agentId'],
    userId: this.user['key']
  }


  console.log(obj);
  this.db.list(`AcceptedQuote/${this.selectedQuote['agentId']}`)
  .push(obj)
  .then((value) =>{
    console.log(value);
    this.router.navigate(['approved']);
  }).catch((error) =>{
    console.log(error);
    
  })
  
}
  
}
