import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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

  // bookedFields: any[] = [];
  bookedFieldsID: any[] = [];
  fields:any;
  user: any;
  userid:any;
  checkUser:any;

  constructor(private serviceF: FeildsService, private serviceU:UsersService) { }

  ngOnInit(){
    this.userid=this.serviceU.getUserId();
    this.checkUser=this.serviceU.isLogged;
    this.serviceU.getUser(this.userid).subscribe({
      next: (data1) => {
        this.user = data1;
        this.bookedFieldsID=this.user.bookings; 
        this.serviceF.getAllFeilds().subscribe({
          next: (data2) => {
            this.fields = data2;

            // for TOTAL price
            // this.bookedFields = this.fields.filter((field: any) => {
              // return this.bookedFieldsID.some((booking: any) => booking.id === field.id);
          // });
          
        },
          error: (err) => { console.log("Error fetching fields"); }
        });   
      },
      error: (err) => { console.log("Error fetching user"); }
    });
  }

  Pay(id:any , slot:any): void{
    this.serviceU.removeBooking(this.userid,{"id":id,"slot":slot});
    // this.serviceF.returnFeild(id,slot);
    window.location.reload();
  }

  Delete(id:any , slot:any): void{
    this.serviceU.removeBooking(this.userid,{"id":id,"slot":slot});
    this.serviceF.returnFeild(id,slot);
    window.location.reload();
  }

}
