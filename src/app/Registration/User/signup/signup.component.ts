import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { finalize, Observable } from 'rxjs';
import { FirebaseService } from 'src/app/firebase.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { AngularFireStorage } from '@angular/fire/compat/storage';
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


  
  adhardownloadURL!:Observable<string>;
  panDownloadUrl!: Observable<string>;
  driveDownloadUrl!: Observable<string>;


   users:any;
   userRef = this.db.object('User');

   vehiclePanFile: any;
   vehicleAdharFile: any;
   vehicleDrivingLicenseFile:any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,  
              private auth: AngularFireAuth,
              private db: AngularFireDatabase,
              private storage: AngularFireStorage,
              public fs:FirebaseService) {

              }

  //  Vehicles: Array<any> = [
  //   {"key": 'Wheeler-Auto',"value": 'Wheeler-Auto'},
  //   {"key": 'Wheeler-Cargo', "value": 'Wheeler-Cargo'},
  //   {"key": 'Wheeler-Light', "value": 'Wheeler-Light'},
  //   {"key": 'Wheeler-Medium', "value": 'Wheeler-Medium'},
  //   {"key": 'Wheeler-Heavy', "value": 'Wheeler-Heavy'},
  //   {"key": 'Wheeler-Van', "value": 'Wheeler-Van'}
  //  ];

  result:string = '';

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
      password: ['', [Validators.required]],
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
      password: ['', [Validators.required]],
      mobile: ['', Validators.required, ],
      // Vehicle:['',Validators.required],
      Vehiclenum:['',Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
      'auto':false,
      'cargo':false,
      'light':false,
      'medium':false,
      'heavy':false,
      'van':false
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
    password: ['', [Validators.required]],
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
    password: ['', [Validators.required]],
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
      this.auth.createUserWithEmailAndPassword(this.customrForm.value.email, this.customrForm.value.password)
      .then((user) =>{
        console.log(user.user?.uid);
        // User Id
        let userObj = {
          key: user.user?.uid,//To retrice with the help of key
          email: this.customrForm.value.email,
          password: this.customrForm.value.password,
          title: this.customrForm.value.title,
      dropdown: this.customrForm.value.dropdown,
      initials: this.customrForm.value.initials,
      lastName:this.customrForm.value.lastName,
      Alternate:this.customrForm.value.Alternate,
      flat:this.customrForm.value.flat,
      address:this.customrForm.value.address, 
      mobile: this.customrForm.value.mobile,
      acceptTerms: this.customrForm.value.acceptTerms
        }
        //Craete a user Object
        this.db.object(`Users/${user.user?.uid}`).set(userObj).then((data) =>{
          console.log(data);
          
        }).catch((error) =>{
          console.log(error);
          
        })

      }).catch((error) =>{
        console.log(error);
        
      })
      console.log("Submit done");
      
    } 

    panEvent(event: any){
      const file = event.target.files[0];
    const filePath = `vehicle/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    // this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.panDownloadUrl = fileRef.getDownloadURL() )
     )
    .subscribe()

    }


    adharEvent(event: any){
      const file = event.target.files[0];
      const filePath = `vehicle/${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
  
      // observe percentage changes
      // this.uploadPercent = task.percentageChanges();
      // get notified when the download URL is available
      task.snapshotChanges().pipe(
          finalize(() => this.adhardownloadURL = fileRef.getDownloadURL() )
       )
      .subscribe()
    }

    driveEvent(event: any){
      const file = event.target.files[0];
      const filePath = `vehicle/${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
  
      // observe percentage changes
      // this.uploadPercent = task.percentageChanges();
      // get notified when the download URL is available
      task.snapshotChanges().pipe(
          finalize(() => this.driveDownloadUrl = fileRef.getDownloadURL() )
       )
      .subscribe()
      

    }



    onSubmitVehicleOwner(){
      this.submitted = true;
      console.log(this.vehicleOwnerForm.value);
    
      this.auth.createUserWithEmailAndPassword(this.vehicleOwnerForm.value.email, this.vehicleOwnerForm.value.password)
      .then((user) =>{
        console.log(user.user?.uid);
        // User Id
        let userId = user.user?.uid;

        let userObj = {
          key: user.user?.uid,//To retrice with the help of key
          email: this.vehicleOwnerForm.value.email,
          password: this.vehicleOwnerForm.value.password,
          title: this.vehicleOwnerForm.value.title,
      dropdown: this.vehicleOwnerForm.value.dropdown,
      initials: this.vehicleOwnerForm.value.initials,
      lastName:this.vehicleOwnerForm.value.lastName,
      Alternate:this.vehicleOwnerForm.value.Alternate,
      flat:this.vehicleOwnerForm.value.flat,
      address:this.vehicleOwnerForm.value.address, 
      mobile: this.vehicleOwnerForm.value.mobile,
      acceptTerms: this.vehicleOwnerForm.value.acceptTerms,
      Vehiclenum: this.vehicleOwnerForm.value.Vehiclenum ,
      Vehicle: this.vehicleOwnerForm.value.Vehicle,
      panUrl: this.panDownloadUrl,
      adharUrl: this.adhardownloadURL,
      driveUrl: this.driveDownloadUrl
        }
        this.db.object(`VehicleOwner/${user.user?.uid}`).set(userObj).then((data) =>{
          console.log(data);
          
        }).catch((error) =>{
          console.log(error);
          
        })

      }).catch((error) =>{
        console.log(error);
        
      })
      console.log("Submit done vehicle");

      // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.vehicleOwnerForm.value, null, 4));
    }



    onSubmitCompany(){
      this.submitted = true;
      console.log(this.companyForm.value);
      this.auth.createUserWithEmailAndPassword(this.companyForm.value.email, this.companyForm.value.password)
      .then((user)=>{
        console.log(user.user?.uid);

        let userId = user.user?.uid;

        let userObj = {
          key: user.user?.uid,//To retrice with the help of key
          email: this.companyForm.value.email,
          password: this.companyForm.value.password,
          title: this.companyForm.value.title,
      dropdown: this.companyForm.value.dropdown,
      initials: this.companyForm.value.initials,
      lastName:this.companyForm.value.lastName,
      Alternate:this.companyForm.value.Alternate,
      flat:this.companyForm.value.flat,
      address:this.companyForm.value.address, 
      mobile: this.companyForm.value.mobile,
      gst:this.companyForm.value.gst,
      acceptTerms: this.companyForm.value.acceptTerms
        }
        this.db.object(`Company/${user.user?.uid}`).set(userObj).then((data) =>{
          console.log(data);
          
        }).catch((error) =>{
          console.log(error);
        })
      }).catch((error)=>{
        console.log(error);
      })
  
      console.log("Submit done company");
      

    }


    onSubmitAgent(){
      this.submitted = true;
      console.log(this.agentForm.value);
      this.auth.createUserWithEmailAndPassword(this.agentForm.value.email, this.agentForm.value.password)
      .then((user)=>{
        console.log(user.user?.uid);

        let userId = user.user?.uid;

        let userObj = {
          key: user.user?.uid,//To retrice with the help of key
          email: this.agentForm.value.email,
          password: this.agentForm.value.password,
          title: this.agentForm.value.title,
      dropdown: this.agentForm.value.dropdown,
      initials: this.agentForm.value.initials,
      lastName:this.agentForm.value.lastName,
      Alternate:this.agentForm.value.Alternate,
      flat:this.agentForm.value.flat,
      address:this.agentForm.value.address, 
      mobile: this.agentForm.value.mobile,
      ofaddress: this.agentForm.value.ofaddress,
      acceptTerms: this.agentForm.value.acceptTerms
        }
        this.db.object(`Agent/${user.user?.uid}`).set(userObj).then((data) =>{
          console.log(data);
          
        }).catch((error) =>{
          console.log(error);
        })
      }).catch((error)=>{
        console.log(error);
      })
  
      console.log("Submit done Agent");
     
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
