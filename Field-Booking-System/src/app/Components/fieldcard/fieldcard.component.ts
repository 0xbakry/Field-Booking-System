import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeildsService } from '../../sevices/feilds.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../sevices/users.service';

@Component({
  selector: 'app-fieldcard',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  providers : [FeildsService, UsersService],
  templateUrl: './fieldcard.component.html',
  styleUrl: './fieldcard.component.css'
})
export class FieldcardComponent implements OnInit {

isFavorite = false;
fields:any;
checkUser:any;
constructor(private service: FeildsService, private serviceUs: UsersService){}


Favorite() {
  this.isFavorite = !this.isFavorite;
}
ngOnInit(){
  this.service.getAllFeilds().subscribe({
    next:(data)=>{
      this.fields = data;      
      for(let i = 4 ; i<30 ; i++){
        this.fields.pop();
      }
      console.log(this.fields);
    },
    error:(err)=>{console.log(err)}
  })
  this.checkUser=this.serviceUs.isLogged;
}
}
