import { UsersService } from './../../sevices/users.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
// import { UsersService } from '../../sevices/users.service';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, HttpClientModule, RouterOutlet, ToastModule,CommonModule],
  providers: [UsersService, MessageService],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent implements OnInit{
  
  constructor(private users: UsersService, private activeRouter: ActivatedRoute, private router: Router, private messageService: MessageService){
    // this.id = this.activeRouter.snapshot.params["id"];
  }

  id: any;
  user: any;
  checkUser:any;

  ngOnInit(): void {
    this.checkUser=this.users.isLogged;


    this.id = this.users.getUserId();

    this.users.getUser(this.id).subscribe({
      next:(res)=>{
        this.user = res
        // console.log("fron onintii  " + this.user.email);
        this.form
        .setValue({
            username: this.user.username,
            phone: this.user.phone,
            email: this.user.email
        })
      },
      error:(err)=>(console.log(err))
    });
  }

  
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.min(3)]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  submit(){
    console.log(this.form)
    if(this.form.valid) {
      console.log(this.id);
      this.users.updateUser(this.id,this.form.value).subscribe({
        next:(res)=>{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated successfully' });
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1000);          
        },
        error:(err)=>(console.log(err))
      })
    }
    else if (this.form['controls']['email'].invalid){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid email' });
    }
    else if (this.form['controls']['phone'].invalid){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid phone number' });
    }
    else if (this.form['controls']['username'].invalid){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid username' });
    }
  }


}
