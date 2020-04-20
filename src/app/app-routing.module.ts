import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MatMenuComponent } from "./mat-menu/mat-menu.component";
import { MatMainComponent } from "./mat-main/mat-main.component";
import { MatSidenavComponent } from "./mat-sidenav/mat-sidenav.component";
import { MatMenu2Component } from "./mat-menu2/mat-menu2.component";
import { MatDashboardComponent } from "./mat-dashboard/mat-dashboard.component";
import { MatServicesComponent } from "./mat-services/mat-services.component";
import { CityListComponent } from "./city-list/city-list.component";
import { CityFormComponent } from "./city-form/city-form.component";
import { CountryListComponent } from "./countries/country-list/country-list.component";
import { CountryFormComponent } from "./countries/country-form/country-form.component";

const routes: Routes = [
  { path: "mat-menu", component: MatMenuComponent },
  { path: "mat-sidenav", component: MatSidenavComponent },
  { path: "mat-menu2", component: MatMenu2Component },
  { path: "mat-dashboard", component: MatDashboardComponent },
  { path: "mat-services", component: MatServicesComponent },
  { path: "city-list", component: CityListComponent },
  { path: "country-list", component: CountryListComponent },
  { path: "city-form", component: CityFormComponent },
  { path: "country-form", component: CountryFormComponent },
  { path: "mat-main", component: MatMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
