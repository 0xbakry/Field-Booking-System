import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../sevices/users.service';

@Component({
  selector: 'app-feild',
  standalone: true,
  imports: [
    RouterModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers:[UsersService],
  templateUrl: './feild.component.html',
  styleUrl: './feild.component.css'
})
export class FeildComponent implements OnInit {
  constructor(private serviceUs:UsersService){}
  userid:any;
  user:any;
  favFields:any;
  checkUser:any;
  ngOnInit(){
    this.userid=this.serviceUs.getUserId();
    this.checkUser=this.serviceUs.isLogged;
    this.serviceUs.getUser(this.userid).subscribe({
      next:(data)=>{
        this.user = data;      
        this.favFields=this.user.favourits;
        console.log("hihihihihiihihi f",this.favFields); 
      },
      error:(err)=>{console.log(err)}
    });
  }

  isFavorite = false;

  Favorite(fieldid:any) {
    console.log("before",fieldid, this.favFields);
    if(!(this.favFields.includes(fieldid))){
      this.favFields.push(fieldid);
      this.serviceUs.addFav(this.userid,fieldid);
      console.log("add f",this.favFields); 
    }
    else{
      this.favFields = this.favFields.filter((id:any) => id !== fieldid);
      this.serviceUs.removeFav(this.userid, fieldid);
      console.log("remove f", this.favFields); 
    }
  }
  @Input() oneFeild:any;
}
