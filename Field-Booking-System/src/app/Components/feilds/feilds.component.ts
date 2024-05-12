import { Component, OnInit } from '@angular/core';
import { FeildsService } from '../../sevices/feilds.service';
import { FeildComponent } from '../feild/feild.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feilds',
  standalone: true,
  imports: [
    FeildComponent,
    HttpClientModule,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  providers : [
    FeildsService
  ],
  templateUrl: './feilds.component.html',
  styleUrl: './feilds.component.css'
})

export class FeildsComponent implements OnInit {
  
  feilds:any;
  filteredFields: any;

  constructor(private service: FeildsService){}
  
  ngOnInit(): void {
    this.filteredFields = this.feilds;
    this.fetchFeilds();
  }

  fetchFeilds() {
    this.service.getAllFeilds().subscribe({
      next: (data) => {
        this.feilds = data;
        this.filteredFields = [...this.feilds];
      },
      error: (err) => { console.log("Error fetching fields"); }
    });
  }

  sort(selectedValue: string) {
    this.applyFilters(selectedValue);
  }
  
  
  applyFilters(filter: string) {
    let filtered = [...this.feilds];
  
    if (filter === "Low To High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filter === "High To Low") {
      filtered.sort((a, b) => b.price - a.price);
    }
    else if (filter !== 'reset') {
      filtered = filtered.filter(field => filter === field.type);
    }
  
    this.filteredFields = filtered;
  }
}
