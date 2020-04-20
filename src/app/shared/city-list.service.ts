import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CityList } from "./city-list.model";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { formatDate } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class CityListService {
  formData: CityList;
  cityList: CityList[];
  filteredSource: CityList[];
  constructor(private http: HttpClient, private firestore: AngularFirestore) {
    // this.getAllData().subscribe(data => {
    //   this.cityList = data as CityList[];
    //   this.filteredSource = data as CityList[];
    // });
  }

  saveFirebase() {
    let body = this.formData;
    if (this.formData.CityCode == "-1") {
      delete body.CityCode;
      this.firestore.collection("Cities").add(body);
    } else {
      this.formData.RecDate = formatDate(new Date(), "yyyy-MM-dd", "en");
      this.firestore
        .collection("Cities")
        .doc(this.formData.CityCode)
        .update(body);
    }
  }

  deleteFirebase(row: CityList) {
    this.firestore
      .collection("Cities")
      .doc(row.CityCode)
      .delete();
  }

  saveOrUpdateData(): Observable<CityList> {
    let body = {
      ...this.formData
    };
    return this.http.post<CityList>(
      environment.apiUrl + "/CityList/PostData",
      body
    );
  }

  getAllData(): Observable<CityList[]> {
    return this.http.get<CityList[]>(
      environment.apiUrl + "/CityList/GetAllData"
    );
  }

  getAllFirebaseData() {
    return this.firestore.collection("Cities").snapshotChanges();
  }

  getDataById(id): any {
    return this.http
      .get(environment.apiUrl + "/CityList/GetDataById/?id=" + id)
      .toPromise();
  }

  getDuplicateCityNameCount(id, label): any {
    return this.http
      .get(
        environment.apiUrl +
          "/CityList/GetDuplicateCityNameCount/" +
          "?id=" +
          id +
          "&label=" +
          label
      )
      .toPromise();
  }
}
