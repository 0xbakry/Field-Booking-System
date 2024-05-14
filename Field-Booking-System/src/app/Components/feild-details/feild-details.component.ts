import { Component, OnInit } from '@angular/core';
import { FeildsService } from '../../sevices/feilds.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../sevices/users.service';

@Component({
  selector: 'app-feild-details',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterModule,
    CommonModule,
    RouterModule
  ],
  providers:[
    FeildsService,
    UsersService
  ],
  templateUrl: './feild-details.component.html',
  styleUrl: './feild-details.component.css'
})
export class FeildDetailsComponent implements OnInit{

  id=0;
  userId:any;
  feild:any;
  first=false;
  time=0;
  obj:any;
  checkUser:any;
  booked:number[]=[];

  constructor(myActivated:ActivatedRoute, private service:FeildsService, private serviceUser: UsersService, private router:Router){
    this.id = myActivated.snapshot.params["id"];
  }

  ngOnInit() {
    this.service.getFeildByID(this.id).subscribe({
      next:(data)=>{
        this.feild = data;
      },
      error:(err)=>{console.log(err)}
    })
    this.userId=this.serviceUser.getUserId();
    this.checkUser=this.serviceUser.isLogged;
  }

  change(obj:any){
    this.first=false;
    this.time=0;
  }

  slot(obj:any){
    this.first=true;
    this.time = obj.time;
    this.obj=obj;
  }


  async book(){
    if(this.first){
      for(let i = 0 ;i<this.feild.slots.length;i++){
            if(this.feild.slots[i] === this.obj){
              this.feild.slots[i].available=false;
            }
      }
      
      if(!this.checkFill()){
        this.feild.available=false;
      }

      this.service.updateFeild(this.id,this.feild).subscribe({
      next:(data)=>{
      },
      error:(err)=>{console.log(err)}
    })

      this.serviceUser.addBooking(this.userId, {"id":this.id,"slot":this.time});

      this.router.navigate(['/profile/bookings'], { replaceUrl: true}).then(() => {
        window.location.reload();
      });
    }
    else{
      alert("Please Choose Slot to be bokked ^_^ ");
    }
    
   }

  checkFill(){
    for(let i = 0 ;i<this.feild.slots.length;i++){
      if(this.feild.slots[i].available){
        return true;
      }
    }
      return false;
 }

}
