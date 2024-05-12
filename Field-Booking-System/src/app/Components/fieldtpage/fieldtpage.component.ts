import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fieldtpage',
  standalone: true,
  imports: [],
  templateUrl: './fieldtpage.component.html',
  styleUrl: './fieldtpage.component.css'
})
export class FieldtpageComponent implements OnInit {
  constructor(private route: ActivatedRoute){
  }
 // use service to get the fields
  fields:{name:string, type:string, price:number, img:string}[]=[
    {name: "HG Field", type:"Padel", price:50, img:"assets/img.jpg" },
    {name: "HR Field", type:"Basketball", price:50,img:"assets/img2.jpg" },
    {name: "HS Field", type:"Football", price:50, img:"assets/img3.jpg"},
    {name: "HS Field", type:"Football", price:50, img:"assets/img.jpg"},
    {name: "HS Field", type:"Football", price:50, img:"assets/img2.jpg"}
  ];
  fieldsarr:any // fill field array from fields of specified type
  type="Padel" ;
  ngOnInit(){
    // this.route.paramMap.subscribe(params => {
    //   this.type = params.get('name');
    // });
  }
  // for fields.type type== this.type

}
