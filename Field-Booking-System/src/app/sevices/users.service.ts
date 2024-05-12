import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface User{
  id: string;
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  private url = "http://localhost:3000/users";
  private userId: string | null = null;


  loginUser(email: any, password: any) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("email",email);
    queryParams = queryParams.append("password",password);
    return this.http.get<User[]>(this.url, {params:queryParams} );
  }


  registerUser(obj: any) {
    obj.bookings = [];
    obj.favourits = [];
    return this.http.post(this.url, obj);
  }

  updateUser(id: string, obj:any) {
    return this.http.patch(this.url +"/"+ id, obj);
  }

  getUser(id: any) {
    return this.http.get(this.url +"/"+ id )
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }

  getUserId(): string | null {
    return this.userId;
  }
}
