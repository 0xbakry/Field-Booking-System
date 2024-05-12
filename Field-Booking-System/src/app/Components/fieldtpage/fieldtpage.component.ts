import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FeildsService } from '../../sevices/feilds.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fieldtpage',
  standalone: true,
  imports: [HttpClientModule, RouterModule, FormsModule, CommonModule],
  providers:[FeildsService],
  templateUrl: './fieldtpage.component.html',
  styleUrl: './fieldtpage.component.css'
})
export class FieldtpageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private service: FeildsService){
  }

  fields:any // fill field array from fields of specified type
  type:any;
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.type = params['type'];
    });
    this.service.getFeildsByType(this.type).subscribe({
      next:(data)=>{
        this.fields = data;
        console.log(data);
      },
      error:(err)=>{console.log("Error")}
    })
  }
  // for fields.type type== this.type

}
