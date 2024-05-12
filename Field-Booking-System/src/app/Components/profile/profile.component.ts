import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  user: any;
  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    this.http.get<any>('assets/users.json').subscribe(
      (data) => {
        this.user = data.users[0];
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // Need to update once service is done
  
  // constructor(private userService: UserService) { }

  // ngOnInit(): void {
  //   this.userService.getUser().subscribe(
  //     (data) => {
  //       this.user = data.user;
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
}
