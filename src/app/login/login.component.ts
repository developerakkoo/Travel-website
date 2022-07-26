import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  companyForm:any=FormGroup;
  vehicleOwnerForm:any=FormGroup;
  customrForm:any=FormGroup;
  agentForm:any=FormGroup;
  submitted = false;

  constructor(private formBuilder:FormBuilder,
    private fs:FirebaseService,  
     private auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) { }

  ngOnInit(): void {
    this.customrForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.email]],     
      acceptTerms: [false, Validators.requiredTrue]
  });
  this.vehicleOwnerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.email]],     
    acceptTerms: [false, Validators.requiredTrue]
});
this.companyForm = this.formBuilder.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.email]],     
  acceptTerms: [false, Validators.requiredTrue]
});
this.agentForm = this.formBuilder.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.email]],     
  acceptTerms: [false, Validators.requiredTrue]
});
  }

  get f() 
  { return this.customrForm.controls; }

  get v(){
      return this.vehicleOwnerForm.controls;
    }
  get c(){
    return this.companyForm.controls;    
  }  
  get a(){
    return this.agentForm.controls;    
  }

  onLoginCustomer() {
    this.submitted = true;
    console.log(this.customrForm.value);
    // stop here if form is invalid 
  
    // display form values on success
    this.auth.signInWithEmailAndPassword(this.customrForm.value.email, this.customrForm.value.password)
    .then((user) =>{
      console.log(user);
      let userId = user.user?.uid;
      // this.router.navigate(['our-services', userId]);
      //move to next page
      
    }).catch((error) =>{
      console.log(error);
      
    })
     

  }

  onSubmitVehicle(){
    this.submitted = true;
    console.log(this.vehicleOwnerForm.value);
    this.auth.signInWithEmailAndPassword(this.vehicleOwnerForm.value.email, this.vehicleOwnerForm.value.password)
    .then((user) =>{
      console.log(user);
      let userId = user.user?.uid;
      // this.router.navigate(['our-services', userId]);
      //move to next page
      
    }).catch((error) =>{
      console.log(error);
      
    })
  }

  onSubmitCompany(){
    this.submitted = true;
    console.log(this.companyForm.value);
    this.auth.signInWithEmailAndPassword(this.companyForm.value.email, this.companyForm.value.password)
    .then((user) =>{
      console.log(user);
      let userId = user.user?.uid;
      // this.router.navigate(['our-services', userId]);
      //move to next page
      
    }).catch((error) =>{
      console.log(error);
      
    })      
  }

  onSubmitAgent(){
    this.submitted = true;
    console.log(this.agentForm.value);
    this.auth.signInWithEmailAndPassword(this.agentForm.value.email, this.agentForm.value.password)
    .then((user) =>{
      console.log(user);
      let userId = user.user?.uid;
      // this.router.navigate(['our-services', userId]);
      //move to next page
      
    }).catch((error) =>{
      console.log(error);
      
    })
  }

  
  onReset() {
    this.submitted = false;
    this.customrForm.reset();
    this.vehicleOwnerForm.reset();
    this.companyForm.reset();
    this.agentForm.reset();
}


keyPress(event: any) {
  const pattern = /[0-9\+\-\ ]/;

  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}


}
