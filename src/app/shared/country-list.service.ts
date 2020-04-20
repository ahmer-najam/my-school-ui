import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CountryList } from "./country-list.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CountryListService {
  formData: CountryList;
  countryList: CountryList[];
  filteredSource: CountryList[];
  constructor(private http: HttpClient) {}

  saveOrUpdateData() {
    let body = {
      ...this.formData
    };
    return this.http.post(environment.apiUrl + "/CountryList/PostData", body);
  }

  getAllData(): Observable<CountryList[]> {
    return this.http.get<CountryList[]>(
      environment.apiUrl + "/CountryList/GetAllData"
    );
  }

  getDataById(id): any {
    return this.http
      .get(environment.apiUrl + "/CountryList/GetDataById/?id=" + id)
      .toPromise();
  }

  getDuplicateCountryNameCount(id, label): any {
    return this.http
      .get(
        environment.apiUrl +
          "/CountryList/GetDuplicateCountryNameCount/" +
          "?id=" +
          id +
          "&label=" +
          label
      )
      .toPromise();
  }
}
