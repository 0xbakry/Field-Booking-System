import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { UsersService } from '../../sevices/users.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink, HttpClientModule],
  providers: [UsersService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  constructor(private users: UsersService){}
  username = ''
  ngOnInit(): void {
    this.username = this.users.getUsername();
  }
}
