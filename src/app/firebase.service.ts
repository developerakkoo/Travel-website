import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { provideDatabase } from '@angular/fire/database'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor( public http:HttpClient ) { }

  showData(customrForm:any[]){
   return this.http.post('https://prototype-6023b-default-rtdb.firebaseio.com/users.json',customrForm)
  }
}
