import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {

  bookedFields: any[] = [];
  user: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('assets/fields.json').subscribe(
      (data) => {
        this.http.get<any>('assets/users.json').subscribe(
          (userData) => {
            this.user = userData.users[0];  // Need to update once service is done
            this.bookedFields = data.fields.filter((field: any) => this.user.booking.includes(field.id));
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

  calculateTotalPrice(): number {
    return this.bookedFields.reduce((total, field) => total + field.price, 0);
  }
}
