import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss']
})
export class OurServicesComponent implements OnInit {
 
  userId;
  orderRef!:AngularFireList<any>;
  order!: Observable<any>;

  masterSelected:boolean;
  checklist:any;
  checkedList:any[]= [];

  isSelectVehicleForMeChecked:any;
  isIWillSelectVehicleChecked:any;

  isHouseHoldChecked:any;
  isRejectedMaterialChecked:any;
  isMaterialReworkChecked:any;
  isScrapChecked:any;
  isAdvertisingChecked:any;
  isExibhitionChecked:any;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private router: Router,
  ) { 
    this.userId = this.route.snapshot.paramMap.get("userId");
    console.log(`USerId on OurService ${this.userId}`);
    
    
    this.masterSelected = false;
    this.checklist = [
      {value:'House Holder Items',isSelected:false},
      {value:'Rejected Material',isSelected:false},
      {value:'Material For Re-Work',isSelected:false},
      {value:'Scrap Not For Sale',isSelected:false},
      {value:'Advertising Materials',isSelected:false},
      {value:'Exhibition Material',isSelected:false},
     
    ];
    this.getCheckedItemList();
    
  
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
  this.checkedList = this.checkedList;
}

next(){
  let arr = this.checkedList;

  let finalObj = {};
console.log("The array is \n", arr);

// loop elements of the array 
for(let i = 0; i < arr.length; i++ ) {
  console.log(arr[i]);
  
  Object.assign(finalObj, arr[i]);
}

console.log(finalObj);
let orderCreated = false;

  this.db.list(`order/${this.userId}`)
  .push(this.checkedList).then((value) =>{
    console.log(value);
    orderCreated = true;    
  }).catch((error) =>{
    console.log(error);
    orderCreated = false;
    
  })
  if(this.isIWillSelectVehicleChecked == true){
    console.log("move to slect products");
 

    this.router.navigate(['upload-images'])
    
    
  }
  
  if(this.isSelectVehicleForMeChecked){
    console.log("move to select vehivle page");
    this.router.navigate(['vehicle'])
    

  
    
  }

}
}
