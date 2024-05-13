import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../sevices/users.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule
  ],
  providers :[
    UsersService
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  user: any;
  id:string | null | undefined;
  logged:any;
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.id=this.userService.getUserId();
    this.userService.getUser(this.id).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this.logged=this.userService.isLogged;
  }
}
