import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Database, set, ref } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/firebase.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  // registerForm:any= FormGroup;
  companyForm:any=FormGroup;
  vehicleOwnerForm:any=FormGroup;
  customrForm:any=FormGroup;
  agentForm:any=FormGroup;
  submitted = false;
  



  constructor(private formBuilder: FormBuilder, public database: Database,public fs:FirebaseService) {
   
   }

   

  ngOnInit(): void {
    this.customrForm = this.formBuilder.group({
      title: ['', Validators.required],
      dropdown: ['', Validators.required],
      initials: ['', Validators.required],
      lastName:['',Validators.required],
      Alternate:['',Validators.required],
      flat:['',Validators.required],
      address:['',Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required, ],
      acceptTerms: [false, Validators.requiredTrue]
  });

  this.vehicleOwnerForm=this.formBuilder.group({
      title: ['', Validators.required], 
      dropdown: ['', Validators.required],
      initials: ['', Validators.required],
      lastName:['',Validators.required],
      Alternate:['',Validators.required],
      flat:['',Validators.required],
      address:['',Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required, ],
      Vehicle:['',Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
  });

  this.companyForm = this.formBuilder.group({
    title: ['', Validators.required], 
    dropdown: ['', Validators.required],
    initials: ['', Validators.required],
    lastName:['',Validators.required],
    Alternate:['',Validators.required],
    flat:['',Validators.required],
    address:['',Validators.required], 
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', Validators.required, ],
    gst:['',Validators.required],
    acceptTerms: [false, Validators.requiredTrue]
  });
 
  this.agentForm = this.formBuilder.group({
    title: ['', Validators.required], 
    dropdown: ['', Validators.required],
    initials: ['', Validators.required],
    lastName:['',Validators.required],
    Alternate:['',Validators.required],
    flat:['',Validators.required],
    address:['',Validators.required], 
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', Validators.required, ],
    ofaddress: ['', Validators.required, ],  
    acceptTerms: [false, Validators.requiredTrue]
  });
  

  }
  
    // convenience getter for easy access to form fields

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

    onSubmit() {
      this.submitted = true;
      console.log(this.customrForm.value);
      // stop here if form is invalid 
      if (this.customrForm.invalid) {
        return;
      }
      // display form values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.customrForm.value, null, 4))
      this.fs.showData(this.customrForm).subscribe(
        (res)=> console.log(res),
        (err)=> console.log(err)
        
        
      )
    } 




    onSubmits(){
      this.submitted = true;
      console.log(this.vehicleOwnerForm.value);
      if (this.vehicleOwnerForm.invalid) {
        return;
      }
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.vehicleOwnerForm.value, null, 4));
    }

    onSubmitss(){
      this.submitted = true;
      console.log(this.companyForm.value);
      if (this.companyForm.invalid) {
        return;
      }
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.companyForm.value, null, 4));      
    }

    onSubmitsss(){
      this.submitted = true;
      console.log(this.agentForm.value);
      if (this.agentForm.invalid) {
        return;
      }
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.agentForm.value, null, 4));
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
