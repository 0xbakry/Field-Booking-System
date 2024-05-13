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

  isFavorite = false;
  fields:any // fill field array from fields of specified type
  type:any;

  Favorite() {
    this.isFavorite = !this.isFavorite;
  }
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
    })
  }
}
