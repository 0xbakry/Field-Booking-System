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
    {name: "Padel Fields", type:"Padel",  img:"assets/Padel.png" },
    {name: "Basketball Fields", type:"Basketball", img:"assets/Basketball.png" },
    {name: "Football Fields", type:"Football",  img:"assets/Football.png"},
    {name: "Volleyball Fields", type:"Volleyball", img:"assets/Volleyball.png"},
    {name: "Handball Field", type:"Handball",  img:"assets/Handball.png"},
    {name: "Tennis Field", type:"Tennis",  img:"assets/Tennis.png"},
  ];
  onLinkClick(name: string) {
    this.router.navigate(['fieldtypes', name]);
  }

}
