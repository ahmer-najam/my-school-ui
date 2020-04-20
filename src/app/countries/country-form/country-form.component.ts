import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe, formatDate } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { environment } from "src/environments/environment.prod";
import { CountryListService } from "../../shared/country-list.service";
import { CountryList } from "../../shared/country-list.model";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-country-form",
  templateUrl: "./country-form.component.html",
  styleUrls: ["./country-form.component.css"]
})
export class CountryFormComponent implements OnInit {
  isValid: boolean = true;
  isFormSubmitted: boolean = true;
  recId;
  isDuplicate;

  constructor(
    private toastr: ToastrService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private dialogRef: MatDialogRef<CountryFormComponent>,
    public service: CountryListService
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
      this.isFormSubmitted = true;
      if (this.validateForm()) {
        this.service.saveOrUpdateData().subscribe(res => {
          this.service.formData = res as CountryList;
          this.toastr.success("Submitted successfully", environment.appName);
          this.isFormSubmitted = false;
          this.onClose();
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getDuplicateCountryNameCount() {
    await this.service
      .getDuplicateCountryNameCount(
        this.service.formData.CountryCode,
        this.service.formData.CountryName
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

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      CountryCode: -1,
      UserId: localStorage.getItem("userid"),
      RecDate: formatDate(new Date(), "yyyy-MM-dd", "en").toString(),
      CountryName: ""
    };
  }
}
