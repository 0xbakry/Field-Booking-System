import { Component, OnInit } from '@angular/core';
import { FieldcardComponent } from '../fieldcard/fieldcard.component';
import { RouterLink, RouterModule } from '@angular/router';
import { FieldtypesComponent } from '../fieldtypes/fieldtypes.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FieldcardComponent, RouterLink, RouterModule, FieldtypesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  images: string[] = ["assets/img.jpg", "assets/img2.jpg", "assets/img3.jpg"]; 
  imageIndex: number = 0;
  ngOnInit() {
    setInterval(() => {
      this.nextImage();
    }, 5000);
  }
  nextImage(){
    this.imageIndex = (this.imageIndex + 1) % this.images.length; 
  }
  previousImage(){
    this.imageIndex--;
    if (this.imageIndex < 0) {
      this.imageIndex = this.images.length - 1;
    }
  }

}
