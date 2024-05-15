import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../sevices/users.service';
import { FeildsService } from '../../sevices/feilds.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    UsersService,
    FeildsService
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit{
  


  constructor(
    private http: HttpClient,
    private serviceU: UsersService,
    private serviceF:FeildsService
  ) {}
  userid:any;
  fields:any;
  favoriteFieldsID: any;
  favoriteFields: any;
  user: any;
  checkUser:any;
  ngOnInit(){

    this.userid=this.serviceU.getUserId();
    this.checkUser=this.serviceU.isLogged;
    
    this.serviceF.getAllFeilds().subscribe({
      next: (data) => {
        this.fields = data;

        this.serviceU.getUser(this.userid).subscribe({
          next: (data) => {
            this.user = data;
            this.favoriteFieldsID=this.user.favourits;
            console.log(this.user, this.user.favourits);
            
            this.favoriteFields = this.fields.filter((field: any) => this.favoriteFieldsID.includes(field.id));
    
          // window.location.reload();
            
          },
          error: (err) => { console.log("Error fetching user"); }
        });


      },
      error: (err) => { console.log("Error fetching fields"); }
    });

 

    
  }

  remove(idfield : any){
    this.serviceU.removeFav(this.userid, idfield);
    window.location.reload();
    window.location.reload();
  }
}
