import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DataService } from './../../services/data.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { finalize, Observable } from 'rxjs';
@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit {
  userId:any;

  images : string[] = [];
  myForm:any=FormGroup
  downloadURLs:any;
  uploads: any;
  uploadPercent:any;


  constructor(private http: HttpClient,
              private formBuilder:FormBuilder,
              private data:DataService,
              private router: Router,
              private db: AngularFireDatabase,
              private storage: AngularFireStorage ) { }

  async ngOnInit(){
    this.userId = await this.data.get("userId");
    console.log(`UserId on Upload images Component ${this.userId}`);
    
    this.myForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    });
  }

  get f() { return this.myForm.controls;
    }

  onFileChange(event:any){
    console.log(event.target.files);
     // reset the array 
     this.uploads = [];
     this.downloadURLs = [];
     const filelist = event.target.files;
     const allPercentage: Observable<number>[] = [];
 
     for (const file of filelist) {
       const filePath = `${file.name}`;
       const fileRef = this.storage.ref(filePath);
       const task = this.storage.upload(filePath, file);
      //  const _percentage = task.percentageChanges();
      //  allPercentage.push(_percentage);
 
       // observe percentage changes
       this.uploadPercent = task.percentageChanges().subscribe((val) =>{
         console.log(`Percent: ${val}`);

       });
 
       
       // get notified when the download URL is available
       task.snapshotChanges().pipe(
         finalize(() => {
           fileRef.getDownloadURL().subscribe((url) => { 
             this.downloadURLs = this.downloadURLs.concat([url]);
             console.log(this.downloadURLs);
           });
         })
       ).subscribe();
      //  this.downloadURLs.push(this.downloadURL);
       
     }
  }
     
  submit(){
    //Add file 
    console.log(this.downloadURLs);
    
    this.db.list(`orderUploadImages/${this.userId}`)
    .push(this.downloadURLs)
    .then((success) =>{
      console.log(success);
      this.router.navigate(['sender']);
      
    }).catch((error) =>{
      console.log(error);
      
    })


  }
}
