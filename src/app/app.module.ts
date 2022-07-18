import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { FormsModule } from '@angular/forms'; 
import { SignupComponent } from './Registration/User/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OurServicesComponent } from './pages/our-services/our-services.component';
import { UploadImagesComponent } from './pages/upload-images/upload-images.component';
import { HttpClientModule } from '@angular/common/http';
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
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
   
    SignupComponent,
    OurServicesComponent,
    UploadImagesComponent,
    VehicleComponent,
    SenderComponent,
    VehicleRequiredComponent,
    SummaryComponent,
    QuotationsComponent,
    EnquiryComponent,
    FuelCostComponent,
    ApprovedComponent,
    OrderConfirmatonComponent,
    BillingSumaryComponent,
    BillingSumaryAjentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
