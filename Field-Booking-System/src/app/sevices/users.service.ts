import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface User{
  id: string;
  email: string;
  password: string;
  username: string;
}
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { 
    if(sessionStorage.getItem('isLogged') == 'true') {
      this.isLogged = true;
      this.userId = sessionStorage.getItem('id');
      this.username = sessionStorage.getItem('username');
    }
  }
  
  private url = "http://localhost:3000/users";
  private userId: any = "";
  private username: any = "";
  isLogged = false;


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

  setUser(id:string, username:string) {
    this.userId = id;
    this.username = username;
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('isLogged', 'true');
    this.isLogged = true;
  }

  logOut() {
    this.userId = '';
    this.username = '';
    sessionStorage.setItem('id', '');
    sessionStorage.setItem('username', '');
    sessionStorage.setItem('isLogged', 'false');
    this.isLogged = false;
  }

  getUsername() {
    return this.username;
  }

  // check if there is a user that is logged in
  loginCheck() {
    return this.isLogged;
  }
}
