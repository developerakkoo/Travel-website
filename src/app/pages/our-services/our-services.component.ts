import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss']
})
export class OurServicesComponent implements OnInit {
 
  userId;
  userRef!:AngularFireObject<any>;
  user!: Observable<any>;

  masterSelected:boolean;
  checklist:any;
  checkedList:any;
  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase
  ) { 
    this.userId = this.route.snapshot.paramMap.get("userId");
    console.log(`USerId on OurService ${this.userId}`);

    this.getUserById(this.userId);
    
    this.masterSelected = false;
    this.checklist = [
      {id:1,value:'House Holder Items',isSelected:false},
      {id:2,value:'Rejected Material',isSelected:true},
      {id:3,value:'Material For Re-Work',isSelected:true},
      {id:4,value:'Scrap Not For Sale',isSelected:false},
      {id:5,value:'Advertising Materials',isSelected:false},
      {id:6,value:'Jamir Pfannerstill',isSelected:false},
      {id:7,value:'Exhibition Material',isSelected:false},
     
    ];
    this.getCheckedItemList();
    
  
  }
  getUserById(userId:any) {
    this.userRef = this.db.object(`Users/${this.userId}`);

    this.user = this.userRef.valueChanges();
    this.user.subscribe((user) =>{
      console.log(user);

    }, (error) =>{
      console.log(error);
      
    })
    
  }

  ngOnInit(): void {
  }
// The master checkbox will check/ uncheck all items
checkUncheckAll() {
  for (var i = 0; i < this.checklist.length; i++) {
    this.checklist[i].isSelected = this.masterSelected;
  }
  this.getCheckedItemList();
}
checkcheckAll(){
  
}

// Check All Checkbox Checked
isAllSelected() {
  this.masterSelected = this.checklist.every(function(item:any) {
      return item.isSelected == true;
    })
  this.getCheckedItemList();
}

// Get List of Checked Items
getCheckedItemList(){
  this.checkedList = [];
  for (var i = 0; i < this.checklist.length; i++) {
    if(this.checklist[i].isSelected)
    this.checkedList.push(this.checklist[i]);
  }
  this.checkedList = JSON.stringify(this.checkedList);
}
}
