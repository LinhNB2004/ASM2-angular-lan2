import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LayoutAdminComponent } from '../../layout-admin/layout-admin.component';
import { User } from '../../interfaces/User';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LayoutAdminComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  user: User = {} as User;
  userForm: FormGroup = {} as FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {}
  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }
  handleSubmit() {
    if (this.userForm.valid) {
      this.userService.Register(this.userForm.value).subscribe({
        next: (data) => {
          console.log('Đăng ký thành công', data);
          alert('Đăng ký thành công, Chuyển hướng sang Login');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log('Đăng ký thất bại!', err);
          alert(`Đăng ký thất bại!, ${err.error}`);
        },
      });
    } else {
      alert('form is not valid!');
      console.log('form is not valid!');
    }
  }
}
