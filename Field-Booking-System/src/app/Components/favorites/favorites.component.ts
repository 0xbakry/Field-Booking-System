import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit{
  
  favoriteFields: any[] = [];
  user: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('assets/fields.json').subscribe(
      (data) => {
        this.http.get<any>('assets/users.json').subscribe(
          (userData) => {
            this.user = userData.users[0];  // Need to update once service is done
            this.favoriteFields = data.fields.filter((field: any) => this.user.favourits.includes(field.id));
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
