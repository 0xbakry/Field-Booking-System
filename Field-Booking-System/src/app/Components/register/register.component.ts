import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { UsersService } from '../../sevices/users.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, HttpClientModule, RouterOutlet, ToastModule],
  providers: [UsersService, MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private users: UsersService, private activeRouter: ActivatedRoute, private router: Router, private messageService: MessageService){}

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.min(3)]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(1)])
  })

  submit(){
    console.log(this.form)
    if(this.form.valid) {
      
      
      this.users.registerUser(this.form.value).subscribe({
        next:(res)=>{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registered successfully' });
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);          
        },
        error:(err)=>(console.log(err))
      })
    }
    else if (this.form['controls']['email'].invalid){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid email' });
    }
    else if (this.form['controls']['password'].invalid){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid password' });
    }
    else if (this.form['controls']['phone'].invalid){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid phone number' });
    }
    else if (this.form['controls']['username'].invalid){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid username' });
    }

  }

}
