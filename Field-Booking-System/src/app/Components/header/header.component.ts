import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UsersService } from '../../sevices/users.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink, HttpClientModule],
  providers:[UsersService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  currentUser:any;
  constructor(private service: UsersService, private router: Router){}
  ngOnInit(): void {
    this.currentUser=this.service.isLogged;
  }
  logout(){
    this.service.logOut();
    this.router.navigate(['/']);
    window.location.reload();
  }
}
