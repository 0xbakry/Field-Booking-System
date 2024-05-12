import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeildsService } from '../../sevices/feilds.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-fieldcard',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  providers : [FeildsService],
  templateUrl: './fieldcard.component.html',
  styleUrl: './fieldcard.component.css'
})
export class FieldcardComponent implements OnInit {
fields:any;
constructor(private service: FeildsService){}
ngOnInit(){
  this.service.getAllFeilds().subscribe({
    next:(data)=>{
      this.fields = data;
      console.log(data);
    },
    error:(err)=>{console.log(err)}
  })
}
}
