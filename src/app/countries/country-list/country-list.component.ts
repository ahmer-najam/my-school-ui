import { Component, OnInit } from "@angular/core";
import { CountryListService } from "../../shared/country-list.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CountryFormComponent } from "../country-form/country-form.component";
import { CountryList } from "../../shared/country-list.model";

@Component({
  selector: "app-country-list",
  templateUrl: "./country-list.component.html",
  styleUrls: ["./country-list.component.css"]
})
export class CountryListComponent implements OnInit {
  dataSource;
  // filteredSource;
  displayedColumns: string[] = [
    "CountryCode",
    "UserId",
    "RecDate",
    "CountryName",
    "actions"
  ];
  searchValue;

  constructor(
    public countryService: CountryListService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.countryService.getAllData().subscribe(list => {
      this.countryService.countryList = list as CountryList[];
      this.countryService.filteredSource = list as CountryList[];
      console.log(this.countryService.filteredSource);
    });
    // this.countryService.getAllFirebaseData().subscribe(arrayList => {
    //   this.countryService.countryList = arrayList.map(item => {
    //     return {
    //       CountryCode: item.payload.doc.id,
    //       ...(item.payload.doc.data() as CountryList)
    //     } as CountryList;
    //   });
    //   this.countryService.filteredSource = this.countryService.countryList;
    // });
  }

  onEdit(row) {
    this.countryService.formData = row as CountryList;

    console.log(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";

    this.dialog.open(CountryFormComponent, dialogConfig);
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";

    this.dialog.open(CountryFormComponent, dialogConfig);
    // this.countryService.filteredSource = this.countryService.employeeList;
  }

  applyFilter(event: Event) {
    this.searchValue = (event.target as HTMLInputElement).value;
    if (!this.searchValue) {
      this.countryService.filteredSource = this.countryService.countryList;
      return;
    }
    this.countryService.filteredSource = this.countryService.countryList.filter(
      item => {
        return Object.keys(item).some(key => {
          return String(item[key])
            .toLowerCase()
            .includes(this.searchValue.toLowerCase());
        });
      }
    );
  }
}
