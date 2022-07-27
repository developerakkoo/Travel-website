import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
@Component({
  selector: 'app-vehicle-required',
  templateUrl: './vehicle-required.component.html',
  styleUrls: ['./vehicle-required.component.scss']
})
export class VehicleRequiredComponent implements OnInit {
  date: any = '';
  time: any ='';
  form: any;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
 
  }
  clickme() {
    
    console.log(this.date);
    
  }

  // onSubmit(){
  //   console.log(this.form.value)
  // }
}
