import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-fieldtypes',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterModule],
  templateUrl: './fieldtypes.component.html',
  styleUrl: './fieldtypes.component.css'
})
export class FieldtypesComponent {
  constructor(private router: Router) {}
  types:{name:string, type:string,  img:string}[]=[
    {name: "Padel Fields", type:"Padel",  img:"assets/img.jpg" },
    {name: "Basketball Fields", type:"Basketball", img:"assets/img2.jpg" },
    {name: "Football Fields", type:"Football",  img:"assets/img3.jpg"},
    {name: "Volleyball Fields", type:"Volleyball", img:"assets/img.jpg"},
    {name: "Handball Field", type:"Handball",  img:"assets/img2.jpg"}
  ];
  onLinkClick(name: string) {
    this.router.navigate(['fieldtypes', name]);
  }

}
