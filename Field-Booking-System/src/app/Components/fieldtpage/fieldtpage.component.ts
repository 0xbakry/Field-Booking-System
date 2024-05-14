import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FeildsService } from '../../sevices/feilds.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../sevices/users.service';
import { FeildComponent } from '../feild/feild.component';

@Component({
  selector: 'app-fieldtpage',
  standalone: true,
  imports: [HttpClientModule, RouterModule, FormsModule, CommonModule,FeildComponent],
  providers:[FeildsService, UsersService],
  templateUrl: './fieldtpage.component.html',
  styleUrl: './fieldtpage.component.css'
})
export class FieldtpageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private service: FeildsService, private serviceUs: UsersService){}

  fields:any 
  type:any;
  userid:any;
  user:any;
  favFields:any;
  checkUser:any;
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.type = params['type'];
    });
    this.service.getFeildsByType(this.type).subscribe({
      next:(data)=>{
        this.fields = data;
        this.fields.sort((a:any, b:any) => {
          const numA = parseInt(a.name.match(/\d+/)[0]);
          const numB = parseInt(b.name.match(/\d+/)[0]);
          return numA - numB;
      });
        console.log(data);
      },
      error:(err)=>{console.log("Error")}
    });
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



