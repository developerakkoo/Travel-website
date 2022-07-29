import { EnquiryListComponent } from './pages/enquiry-list/enquiry-list.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './Registration/User/signup/signup.component';
import { OurServicesComponent } from './pages/our-services/our-services.component';
import { UploadImagesComponent } from './pages/upload-images/upload-images.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { SenderComponent } from './pages/sender/sender.component';
import { VehicleRequiredComponent } from './pages/vehicle-required/vehicle-required.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { QuotationsComponent } from './pages/quotations/quotations.component';
import { EnquiryComponent } from './pages/enquiry/enquiry.component';
import { FuelCostComponent } from './pages/fuel-cost/fuel-cost.component';
import { ApprovedComponent } from './pages/approved/approved.component';
import { OrderConfirmatonComponent } from './pages/order-confirmaton/order-confirmaton.component';
import { BillingSumaryComponent } from './pages/billing-sumary/billing-sumary.component';
import { BillingSumaryAjentComponent } from './pages/billing-sumary-ajent/billing-sumary-ajent.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  {
    path:'',component:HomeComponent,
  },
  // { path:'home',component:HomeComponent},

  { path:'signup',component:SignupComponent},
  { path:'login',component:LoginComponent},
  {
    path:'our-services/:userId',component:OurServicesComponent
  },
  {
   path:'upload-images',component:UploadImagesComponent
  },
  {
    path:'vehicle',component:VehicleComponent
  },
  {
    path:'sender',component:SenderComponent
  },
  {
    path:'vehicle-required',component:VehicleRequiredComponent
  },
  {
    path:'summary',component:SummaryComponent
  },
  {
    path:'quotations',component:QuotationsComponent
  },
  {
    path:'enquiry/:key',component:EnquiryComponent
  },
  {
    path:'enquiry-list',component:EnquiryListComponent
  },
  {
    path:'fuel-cost',component:FuelCostComponent
  },
  {
    path:'approved',component:ApprovedComponent
  },
  {
    path:'order-confirmaton',component:OrderConfirmatonComponent
  },
  {
    path:'billing-sumary',component:BillingSumaryComponent
  },
  {
    path:'billing-sumary-ajent',component:BillingSumaryAjentComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
