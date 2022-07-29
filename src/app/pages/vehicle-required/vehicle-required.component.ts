import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-vehicle-required',
  templateUrl: './vehicle-required.component.html',
  styleUrls: ['./vehicle-required.component.scss']
})
export class VehicleRequiredComponent implements OnInit {
  date: any = '';
  time: any ='';
  form: any;

  userId:any;

  constructor(private data: DataService,
    private db: AngularFireDatabase,
    private router: Router,
    private http: HttpClient) {
   
     }

async ngOnInit() {
this.userId = await this.data.get('userId');
console.log(`UserId on Vehicle Required Component ${this.userId}`);



}
  clickme() {
    console.log(this.time);
    
    console.log(this.date);
    this.db.object(`order/${this.userId}/datetime`)
    .set({
      time: this.time,
      date: this.date
    }).then((date) =>{
      console.log(date);
      this.router.navigate(['summary']);
      
    }).catch((error) =>{
      console.log(error);
      
    })
  }

}
