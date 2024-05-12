import { Component, OnInit } from '@angular/core';
import { FeildsService } from '../../sevices/feilds.service';
import { FeildComponent } from '../feild/feild.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-feilds',
  standalone: true,
  imports: [
    FeildComponent,
    HttpClientModule,
    RouterModule
  ],
  providers : [
    FeildsService
  ],
  templateUrl: './feilds.component.html',
  styleUrl: './feilds.component.css'
})

export class FeildsComponent implements OnInit {
  
  feilds:any;

  constructor(private service: FeildsService){}
  
  ngOnInit(): void {
    this.service.getAllFeilds().subscribe({
      next:(data)=>{
        this.feilds = data;
        console.log(data);
      },
      error:(err)=>{console.log("Error")}
    })
  }

}
