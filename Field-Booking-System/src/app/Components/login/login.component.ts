import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { UsersService } from '../../sevices/users.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, HttpClientModule, RouterOutlet, ToastModule],
  providers: [UsersService, MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  id = "";

  constructor(private users: UsersService, private activeRouter: ActivatedRoute, private router: Router, private messageService: MessageService){}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(0)])
  })

  submit(){

    if(this.form.valid) {
      console.log(this.form.value);
      this.users.loginUser(this.form.value["email"], this.form.value["password"]).subscribe({
        next:(res)=>{console.log(res)
          
          if(Object.keys(res).length) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'logged in successfully' });
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1000);
            //this.users.setUserId(res[0].id);
            this.users.setUser(res[0].id, res[0].username);
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Wrong email or password' });
          }
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

    
    
  }
  

}
