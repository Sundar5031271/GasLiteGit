import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  loginForm!: FormGroup;
  usernameVal: FormControl = new FormControl('',[
    Validators.required,
    Validators.maxLength(40),
    Validators.minLength(3)
  ]);
  passwordVal: FormControl = new FormControl('',[
    Validators.required
  ]);

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: this.usernameVal,
      pass:  this.passwordVal
    });

  }

  loginSubmit(loginForm: FormGroup) {
    if(this.loginForm.valid) {
      this.auth.login(this.loginForm.value.username, this.loginForm.value.pass) 
      .subscribe((data: any) => {
        console.log('loginSubmit => '+data);
        if(data === true) {
          this.router.navigate(['home/channel']);
        } else {
          alert('login failed...!')
        }
       })
      // alert('username : ' + this.loginForm.value.username + ', password : ' + this.loginForm.value.pass);
      // this.router.navigate(['home/channel']);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
