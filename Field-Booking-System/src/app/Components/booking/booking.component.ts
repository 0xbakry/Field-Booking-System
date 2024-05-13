import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../sevices/users.service';
import { FeildsService } from '../../sevices/feilds.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers:[FeildsService, UsersService],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {

  bookedFields: any[] = [];
  bookedFieldsID: any[] = [];
  fields:any;
  user: any;
  userid:any;

  constructor(private serviceF: FeildsService, private serviceU:UsersService) { }

  ngOnInit(){
    // this.http.get<any>('assets/fields.json').subscribe(
    //   (data) => {
    //     this.http.get<any>('assets/users.json').subscribe(
    //       (userData) => {
    //         this.user = userData.users[0];  // Need to update once service is done
    //         this.bookedFields = data.fields.filter((field: any) => this.user.booking.includes(field.id));
    //       },
    //       (error) => {
    //         console.log(error);
    //       }
    //     );
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
    this.serviceF.getAllFeilds().subscribe({
      next: (data) => {
        this.fields = data;
      },
      error: (err) => { console.log("Error fetching fields"); }
    });
    this.userid=this.serviceU.getUserId();
    this.serviceU.getUser(this.userid).subscribe({
      next: (data) => {
        this.user = data;
        this.bookedFieldsID=this.user.bookings;
        this.bookedFields = this.fields.filter((field: any) => this.bookedFieldsID.includes(field.id));
        console.log(this.user, this.fields, this.bookedFieldsID, this.bookedFields);
      },
      error: (err) => { console.log("Error fetching user"); }
    });
   
  }
  removeBook(idfield:any){
    this.serviceU.removeBooking(this.userid, idfield);
    this.serviceF.returnFeild(idfield);
    window.location.reload();
    window.location.reload();
  }

  calculateTotalPrice(): number {
    return this.bookedFields.reduce((total, field) => total + field.price, 0);
  }

  payNow(): void {
    if(this.bookedFields.length > 0)
      {
        this.bookedFields = [];
        for(let id of this.bookedFieldsID){
          this.serviceF.returnFeild(id);
          this.serviceU.removeBooking(this.userid,id);
        }
        alert("Payment successful!");
      }
      else {
        alert("Please add fields first to your cart!");
      }
  }
}
