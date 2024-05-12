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
  types:{name:string,  img:string}[]=[
    {name: "Padel Fields",  img:"assets/img.jpg" },
    {name: "Basketball Fields", img:"assets/img2.jpg" },
    {name: "Football Fields",  img:"assets/img3.jpg"},
    {name: "Tennis Fields", img:"assets/img.jpg"},
    {name: "Cricket Field",  img:"assets/img2.jpg"}
  ];
  onLinkClick(name: string) {
    this.router.navigate(['/fielsType', name]);
  }

}
