import { Component, OnInit } from '@angular/core';
import { FeildsService } from '../../sevices/feilds.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-feild-details',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterModule
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

  constructor(myActivated:ActivatedRoute, private service:FeildsService){
    this.id = myActivated.snapshot.params["id"];
  }

  ngOnInit() {
    this.service.getFeildByID(this.id).subscribe({
      next:(data)=>{
        this.feild = data;
        console.log(this.feild);
        
      },
      error:(err)=>{console.log(err)}
    })
  }


}
