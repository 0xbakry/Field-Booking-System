import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';

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
    localStorage.setItem('currentUser', JSON.stringify(queryParams));
    console.log(localStorage.getItem('currentUser'));
    
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

  loginCheck() {
    return this.isLogged;
  }

  addBooking(id: string, book:any) {
    this.getUser(id).subscribe((user: any) => {
      // console.log("from user service " + typeof(book));
      // console.log("from user service " + user.booking);
      user.bookings.push(book);
      // console.log("from user service3 " + user.booking);


      this.http.put(this.url + "/" + id, user).subscribe(response => {
          console.log("Booking added successfully", response);
      }, error => {
          console.error("Error adding booking:", error);
      });
    });
  }

  removeBooking(id: string, book:any) {
    console.log(book);
    
    this.getUser(id).subscribe((user: any) => {
      // console.log("FROm servise1 "+user.booking);
      user.bookings = user.bookings.filter((obj: any) => !this.isEqual(obj, book));
      // console.log("FROm servise2 "+user.booking);
      
      this.http.put(this.url + "/" + id, user).subscribe(response => {
          console.log("Booking removed successfully", response);
      }, error => {
          console.error("Error removing booking:", error);
      });
    });
  }

  isEqual(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  addFav(id: string, fav:any) {
    console.log(id, fav);
    this.getUser(id).subscribe((user: any) => {
      user.favourits.push(fav);
      this.http.put(this.url + "/" + id, user).subscribe(response => {
          console.log("Favorite added successfully", fav,response);
      }, error => {
          console.error("Error adding Favorite:", error);
      });
    });
  }
  removeFav(id: string, fav:any) {
    console.log(id, fav);
    this.getUser(id).subscribe((user: any) => {
      user.favourits = user.favourits.filter((id:any) => id !== fav);
      // user.favourits.pop(fav);
      this.http.put(this.url + "/" + id, user).subscribe(response => {
          console.log("Favorite removed successfully", response);
      }, error => {
          console.error("Error removing Favorite:", error);
      });
    });
  }
}
