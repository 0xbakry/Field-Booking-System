import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeildsService } from '../../sevices/feilds.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../sevices/users.service';
import { FeildComponent } from '../feild/feild.component';

@Component({
  selector: 'app-fieldcard',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule,FeildComponent],
  providers : [FeildsService, UsersService],
  templateUrl: './fieldcard.component.html',
  styleUrl: './fieldcard.component.css'
})
export class FieldcardComponent implements OnInit {
constructor(private service: FeildsService, private serviceUs: UsersService){}
fields:any;
checkUser:any;
userid:any;
user:any;
favFields:any;
ngOnInit(){
  this.service.getAllFeilds().subscribe({
    next:(data)=>{
      this.fields = data;      
      for(let i = 4 ; i<30 ; i++){
        this.fields.pop();
      }
      console.log("look here plz",this.fields);
    },
    error:(err)=>{console.log(err)}
  })
  this.userid=this.serviceUs.getUserId();
  this.checkUser=this.serviceUs.isLogged;
  this.serviceUs.getUser(this.userid).subscribe({
    next:(data)=>{
      this.user = data;      
      this.favFields=this.user.favourits;
    },
    error:(err)=>{console.log(err)}
  })
}
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
}

