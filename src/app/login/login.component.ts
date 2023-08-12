import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup;
  responseMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private api: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = fb.group({
      userName: fb.control('', [Validators.required]),
      password: fb.control('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
      ]),
    });
  }

  login() {
    let loginInfo = {
      userName: this.loginForm.get('userName')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.api.loginUser(loginInfo).subscribe((result:any) => {
        console.log(result);
        if(result)
        {
          localStorage.setItem('token',result.token);
          this.router.navigate([''])
        }
        else{
          this.toastr.success('Invalid credentials')
        }
      });
    // this.api.loginUser(loginInfo).subscribe({
    //   next: (res: any) => {
    //     if (res.toString() === 'Invalid')
    //       this.responseMsg = 'Invalid Credentials!';
    //     else {
    //       this.responseMsg = '';
    //       //this.api.saveToken(res.toString());
    //       //let isActive = this.api.getTokenUserInfo()?.active ?? false;
    //       //if (isActive) this.router.navigateByUrl('/books/library');
    //       // else {
    //       //   this.responseMsg = 'You are not Active!';
    //       //   this.api.deleteToken();
    //       // }
    //     }
    //   },
    //   error: (err: any) => {
    //     console.log('Error: ');
    //     console.log(err);
    //   },
    // });
  }

  getUserNameErrors() {
    if (this.userName.hasError('required')) return 'Email is required!';
    if (this.userName.hasError('email')) return 'Email is invalid.';
    return '';
  }

  getPasswordErrors() {
    if (this.Password.hasError('required')) return 'Password is required!';
    if (this.Password.hasError('minlength'))
      return 'Minimum 8 characters are required!';
    if (this.Password.hasError('maxlength'))
      return 'Maximum 15 characters are required!';
    return '';
  }

  get userName(): FormControl {
    return this.loginForm.get('userName') as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
