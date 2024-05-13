import { Component, OnInit } from '@angular/core';
import { FeildsService } from '../../sevices/feilds.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feild-details',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterModule,
    CommonModule
  ],
  providers:[
    FeildsService
  ],
  templateUrl: './feild-details.component.html',
  styleUrl: './feild-details.component.css'
})
export class FeildDetailsComponent implements OnInit{

  id=0;
  feild:any;
  slot=false;

  constructor(myActivated:ActivatedRoute, private service:FeildsService){
    this.id = myActivated.snapshot.params["id"];
  }

  ngOnInit() {
    this.service.getFeildByID(this.id).subscribe({
      next:(data)=>{
        this.feild = data;
      },
      error:(err)=>{console.log(err)}
    })
  }

  // WILL BE CONTINUE
  // cickSlot(){
  //   this.slot = !this.slot;
  // }

  // slot(obj:any){
  //   this.book=true;
  //   for(let i = 0 ;i<this.feild.slots.length;i++){
  //     if(this.feild.slots[i] === obj){
  //       console.log(this.feild.slots[i]);
  //       this.feild.slots[i].available=false;
  //       console.log(this.feild.slots[i]);
  //     }
  //   }
  //   this.service.updateFeild(this.id,this.feild).subscribe({
  //     next:(data)=>{
  //       console.log(data);
  //     },
  //     error:(err)=>{console.log(err)}
  //   })
  // }


}
