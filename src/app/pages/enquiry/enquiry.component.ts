import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from './../../services/data.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent implements OnInit {

  userId:any;
  firstname:any;
  lastname:any;
  mobileNo:any;

  itemsRef: AngularFireList<any>;
  date:any;
  time:any;

  images:any[] =[];
  user:any;
  customerId:any;
  receiver:any;


  vehicleNo:string = "";
  driverMobile:string = "";
  freightCharges:string = "";
  advance:string = "";
  helperCharges : string ="";
  packageCharges:string = "";
  waititngPerHour:string = "";
  cancellation:string = "";
  paymentType:string = "";



  constructor(private db: AngularFireDatabase,
              private data: DataService,
              private router: Router,
              private route: ActivatedRoute) { 
                let key = this.route.snapshot.paramMap.get('key');
                this.itemsRef = db.list(`enquiry/${key}`);
   
    
              }

  async ngOnInit() {
    this.userId = await this.data.get("userId");
    console.log(`Userid on enquiry component ${this.userId}`);
    this.getAgentDetails();
    this.itemsRef.valueChanges().subscribe((value) =>{
      console.log(value);
      console.log("new Enquiry Added");
      this.date = value[0]['date'];
      this.time = value[0]['time'];
      this.user = value[0]['user'];
      this.customerId = value[0]['user']['key'];
      this.receiver = value[0]['receiver'];
      this.images = value[0]['images'];
      
      
    },(error) =>{
      console.log(error);
      
    })
  }

  getAgentDetails(){
    this.db.object(`Vehicle/${this.userId}`).valueChanges().subscribe((data:any) =>{
      console.log(data);
      this.mobileNo = data['mobile'];
      this.firstname = data['initials'];
      this.lastname = data['lastName'];
      
    }, (error) =>{
      console.log(error);
      
    })
  }

  paymentEvent(ev:any){
    console.log(ev.detail.value);
    this.paymentType = ev.detail.value;
  }
  submit(){
    let obj = {
      serviceProvider: this.firstname + " "+this.lastname,
      serviceMobile: this.mobileNo,
      agentId: this.userId,
      customerId: this.customerId,
      vehicleNo:this.vehicleNo,
  driverMobile:this.driverMobile,
  freightCharges:this.freightCharges,
  advance: this.advance,
  helperCharges : this.helperCharges,
  packageCharges:this.packageCharges,
  waititngPerHour:this.waititngPerHour,
  cancellation:this.cancellation,
  paymentType:this.paymentType
    }

    console.log(obj);

    this.db.list(`orderQuote`).push(obj)
    .then((value) =>{
      console.log(value);
      this.router.navigate(['approved-list'])
      
    }).catch((error) =>{
      console.log(error);
      
    })
    
  }

}
