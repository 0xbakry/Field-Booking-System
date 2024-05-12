import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-feild',
  standalone: true,
  imports: [
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './feild.component.html',
  styleUrl: './feild.component.css'
})
export class FeildComponent {

  isFavorite = false;

  Favorite() {
    this.isFavorite = !this.isFavorite;
  }
  @Input() oneFeild:any;
}
