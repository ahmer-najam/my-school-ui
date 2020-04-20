import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { MatMenuComponent } from "./mat-menu/mat-menu.component";
import { MatMainComponent } from "./mat-main/mat-main.component";
import { MatSidenavComponent } from "./mat-sidenav/mat-sidenav.component";
import { FormsModule } from "@angular/forms";
import { MatMenu2Component } from "./mat-menu2/mat-menu2.component";
import { MatDashboardComponent } from "./mat-dashboard/mat-dashboard.component";
import { MatServicesComponent } from "./mat-services/mat-services.component";
import { CityListComponent } from "./city-list/city-list.component";
import { CityListService } from "./shared/city-list.service";
import { CityFormComponent } from "./city-form/city-form.component";
import { ToastrModule } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { environment } from "src/environments/environment";
import { CountriesComponent } from './countries/countries.component';
import { CountryListComponent } from './countries/country-list/country-list.component';
import { CountryFormComponent } from './countries/country-form/country-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MatMenuComponent,
    MatMainComponent,
    MatSidenavComponent,
    MatMenu2Component,
    MatDashboardComponent,
    MatServicesComponent,
    CityListComponent,
    CityFormComponent,
    CountriesComponent,
    CountryListComponent,
    CountryFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [CityListService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
