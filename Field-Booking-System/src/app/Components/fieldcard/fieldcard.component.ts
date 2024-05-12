import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fieldcard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './fieldcard.component.html',
  styleUrl: './fieldcard.component.css'
})
export class FieldcardComponent {
fields:{name:string, type:string, price:number, img:string}[]=[
  {name: "HG Field", type:"Padel", price:50, img:"assets/img.jpg" },
  {name: "HR Field", type:"Basketball", price:50,img:"assets/img2.jpg" },
  {name: "HS Field", type:"Football", price:50, img:"assets/img3.jpg"},
  {name: "HS Field", type:"Football", price:50, img:"assets/img.jpg"},
  {name: "HS Field", type:"Football", price:50, img:"assets/img2.jpg"}
];
}
