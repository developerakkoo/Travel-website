import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  userId:any;

  vehicleType:any;

  constructor(private data: DataService,
              private router: Router,
              private db: AngularFireDatabase) { }

  async ngOnInit() {
  this.userId = await this.data.get("userId");
  console.log(`User Id in Vehicle Component ${this.userId}`);
  
  }


  onChange(event: any){
    console.log(event.target.value);
    this.vehicleType = event.target.value;
  }



  next(){
    console.log(this.vehicleType);
    this.db
    .object(`order/${this.userId}/vehicletype`)
    .set({
      vehicletype: this.vehicleType
    })
    .then((vehicle) =>
    {
      console.log(vehicle);
      this.router.navigate(['sender']);
      
    }).catch((error) =>{
      console.log(error);
    })
    
  }





}
