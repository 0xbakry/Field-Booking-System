import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../sevices/users.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    UsersService
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit{
  
  favoriteFields: any[] = [];
  user: any;
  userId: string | null = null;

  constructor(
    private http: HttpClient,
    private currUser: UsersService
  ) 
  { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/users').subscribe(
      (userData) => {
        this.user = userData[0];
        this.userId = this.currUser.getUserId();
        console.log("LOOOOOK: ", this.userId);
        // userData.filter((u:any) => this.u.id.includes(this.currUser.getUserId()));

        this.http.get<any>('http://localhost:3000/feilds').subscribe(
          (fieldsData) => {
            this.favoriteFields = fieldsData.filter((field: any) => this.user.favourits.includes(field.id));
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
