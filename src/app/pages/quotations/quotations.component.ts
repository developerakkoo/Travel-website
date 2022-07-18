import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.scss']
})
export class QuotationsComponent implements OnInit {
  userName = '';
  radio:any;
  entervalues:any;
  constructor() { }

  ngOnInit(): void {
  }

  actionMethod(event: any) {
    event.target.disabled = true;
}

  


  clickit(){
    this.radio = this.entervalues === "yes";
  }
  
}
