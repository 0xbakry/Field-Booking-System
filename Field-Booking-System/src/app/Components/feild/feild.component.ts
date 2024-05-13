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
  checkUser:any;
  ngOnInit(){
    this.checkUser=this.serviceUs.isLogged;
  }

  isFavorite = false;

  Favorite() {
    this.isFavorite = !this.isFavorite;
  }
  @Input() oneFeild:any;
}
