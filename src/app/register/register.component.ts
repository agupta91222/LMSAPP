import { Component } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { user } from '../shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  hide = true;
  responseMsg: string = '';
  registerForm: FormGroup;
  request:user = {
    userName: null,
    name: null,
    email: null,
    password: null,
    address: null,
    IsActive: null
  };
  constructor(private fb: FormBuilder, private api: AuthenticationService, private toastr: ToastrService,private router: Router) {
    this.registerForm = fb.group(
      {
        userName: fb.control('', [Validators.required]),
        name: fb.control('', [Validators.required]),
        email: fb.control('', [Validators.required, Validators.email]),
        password: fb.control('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
        ]),
        rpassword: fb.control(''),
      },
      {
        validators: [repeatPasswordValidator],
      } as AbstractControlOptions
    );
  }
  register() {
   
    this.request.userName = this.registerForm.get('userName')?.value;
    this.request.name = this.registerForm.get('name')?.value;
    this.request.email = this.registerForm.get('email')?.value;
    this.request.password =  this.registerForm.get('password')?.value;
    this.request.address = '';
    this.request.IsActive = true;
    this.api.RegisterUser(this.request).subscribe({
      next: (res: any) => {
        this.toastr.success('Registered successfully')
        this.router.navigate(['login'])
      },
      error: (err: any) => {
        this.toastr.error(err)
      },
    });
  }
  getFirstNameErrors() {
    if (this.userName.hasError('required')) return 'Field is requied!';
    return '';
  }
  getLastNameErrors() {
    if (this.name.hasError('required')) return 'Field is requied!';
    return '';
  }
  getEmailErrors() {
    if (this.Email.hasError('required')) return 'Email is required!';
    if (this.Email.hasError('email')) return 'Email is invalid.';
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
    return this.registerForm.get('userName') as FormControl;
  }
  get name(): FormControl {
    return this.registerForm.get('name') as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get Password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get RPassword(): FormControl {
    return this.registerForm.get('rpassword') as FormControl;
  }
}

export const repeatPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const pwd = control.get('password')?.value;
  const rpwd = control.get('rpassword')?.value;
  if (pwd === rpwd) {
    control.get('rpassword')?.setErrors(null);
    return null;
  } else {
    control.get('rpassword')?.setErrors({ rpassword: true });
    return { rpassword: true };
  }

}
