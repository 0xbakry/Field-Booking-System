import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeildComponent } from '../Components/feild/feild.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeildsService {

  constructor(private readonly http:HttpClient) { }
  private readonly DB_URL = "http://localhost:3000/feilds";

  getAllFeilds(): Observable<FeildComponent[]> {
    return this.http.get<FeildComponent[]>(this.DB_URL);
  }
  getFeildByID(id:number){
    return this.http.get(this.DB_URL+"/"+id);
  }
  getFeildsByType(type: any): Observable<FeildComponent[]> {
    const params = new HttpParams().set('type', type);
    return this.http.get<FeildComponent[]>(this.DB_URL, { params });
  }

  updateFeild(id: number, obj:any){
    return this.http.patch(this.DB_URL +"/"+ id, obj);
  }

  changeFeild(id: number) {
    this.getFeildByID(id).subscribe((field: any) => {
      field.available=false;
      this.http.put(this.DB_URL + "/" + id, field).subscribe(response => {
          console.log("Field occupied successfully", response);
      }, error => {
          console.error("Error ", error);
      });
    });
  }

  returnFeild(id:number , slot:any) {
    this.getFeildByID(id).subscribe((field: any) => {      
      field.slots[slot-1].available=true;
      field.available=true;

      this.http.put(this.DB_URL + "/" + id, field).subscribe(response => {
          console.log("Field freed successfully", response);
      }, error => {
          console.error("Error ", error);
      });
    });
  }

}
