import { Component, OnInit } from "@angular/core";
import { CityListService } from "../shared/city-list.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CityFormComponent } from "../city-form/city-form.component";
import { CityList } from "../shared/city-list.model";

@Component({
  selector: "app-city-list",
  templateUrl: "./city-list.component.html",
  styleUrls: ["./city-list.component.css"]
})
export class CityListComponent implements OnInit {
  dataSource;
  // filteredSource;
  displayedColumns: string[] = [
    "CityCode",
    "UserId",
    "RecDate",
    "CityName",
    "actions"
  ];
  searchValue;

  constructor(public cityService: CityListService, private dialog: MatDialog) {}

  ngOnInit() {
    this.cityService.getAllData().subscribe(list => {
      this.cityService.cityList = list as CityList[];
      this.cityService.filteredSource = list as CityList[];
    });
    // this.cityService.getAllFirebaseData().subscribe(arrayList => {
    //   this.cityService.cityList = arrayList.map(item => {
    //     return {
    //       CityCode: item.payload.doc.id,
    //       ...(item.payload.doc.data() as CityList)
    //     } as CityList;
    //   });
    //   this.cityService.filteredSource = this.cityService.cityList;
    // });
  }

  onEdit(row) {
    this.cityService.formData = row as CityList;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";

    this.dialog.open(CityFormComponent, dialogConfig);
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";

    this.dialog.open(CityFormComponent, dialogConfig);
    // this.cityService.filteredSource = this.cityService.employeeList;
  }

  onDelete(row) {
    this.cityService.deleteFirebase(row);
  }

  applyFilter(event: Event) {
    this.searchValue = (event.target as HTMLInputElement).value;
    if (!this.searchValue) {
      this.cityService.filteredSource = this.cityService.cityList;
      return;
    }
    this.cityService.filteredSource = this.cityService.cityList.filter(item => {
      return Object.keys(item).some(key => {
        return String(item[key])
          .toLowerCase()
          .includes(this.searchValue.toLowerCase());
      });
    });
  }
}
