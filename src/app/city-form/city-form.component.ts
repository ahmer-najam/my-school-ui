import { Component, OnInit, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe, formatDate } from "@angular/common";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { environment } from "src/environments/environment";
import { CityListService } from "../shared/city-list.service";
import { CityList } from "../shared/city-list.model";

@Component({
  selector: "app-city-form",
  templateUrl: "./city-form.component.html",
  styleUrls: ["./city-form.component.css"]
})
export class CityFormComponent implements OnInit {
  isValid: boolean = true;
  isFormSubmitted: boolean = true;
  recId;
  isDuplicate;

  constructor(
    private toastr: ToastrService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    public service: CityListService,
    public dialogRef: MatDialogRef<CityFormComponent>
  ) {}

  ngOnInit() {
    this.isFormSubmitted = false;

    if (this.service.formData == null) {
      this.resetForm();
    } else {
    }
  }

  onClose() {
    this.resetForm();
    this.dialogRef.close();
  }

  onSubmit(form: NgForm) {
    try {
      let isNewRecord: Boolean = false;
      this.isFormSubmitted = true;

      if (this.service.formData.CityCode == "-1") {
        isNewRecord = true;
      } else {
        isNewRecord = false;
      }

      if (this.validateForm()) {
        // this.service.saveFirebase();

        this.service.saveOrUpdateData().subscribe(res => {
          this.service.formData = res as CityList;
          this.toastr.success("Submitted successfully", environment.appName);
          this.isFormSubmitted = false;

          if (isNewRecord) {
            this.service.cityList = [
              this.service.formData,
              ...this.service.cityList
            ];
            this.service.filteredSource = [
              this.service.formData,
              ...this.service.filteredSource
            ];
          }

          this.onClose();

          // this.router.navigate(["/city-list"]);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getDuplicateCityNameCount() {
    await this.service
      .getDuplicateCityNameCount(
        this.service.formData.CityCode,
        this.service.formData.CityName
      )
      .then(res => {
        if (res > 0) {
          this.isDuplicate = true;
          this.isValid = false;
        } else {
          this.isDuplicate = false;
          this.isValid = true;
        }
      });
  }

  validateForm() {
    this.isValid = true;

    if (this.isDuplicate == true) {
      this.isValid = false;
    }
    return this.isValid;
  }

  isDuplicated(searchValue) {
    let checkList: CityList[];
    checkList = this.service.cityList.filter(item => {
      return Object.keys(item).some(key => {
        return String(item[key])
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
    });

    if (checkList.length > 1) {
      this.isDuplicate = true;

      this.resetList();
    } else {
      this.isDuplicate = false;
    }
  }

  resetList() {
    this.service.getAllFirebaseData().subscribe(arrayList => {
      this.service.cityList = arrayList.map(item => {
        return {
          CityCode: item.payload.doc.id,
          ...(item.payload.doc.data() as CityList)
        } as CityList;
      });
      this.service.filteredSource = this.service.cityList;
    });
  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      CityCode: "-1",
      UserId: "Admin",
      // UserId: localStorage.getItem("userid"),
      RecDate: formatDate(new Date(), "yyyy-MM-dd", "en").toString(),
      CityName: ""
    };
  }
}
