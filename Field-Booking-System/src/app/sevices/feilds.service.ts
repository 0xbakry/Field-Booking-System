import { HttpClient } from '@angular/common/http';
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

}
