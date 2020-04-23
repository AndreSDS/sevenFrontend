import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, take } from 'rxjs/operators';

import { UserService } from '../../auth/user.service';
import { AuthenticationService } from '../../auth/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/users']);
    }
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
    this.submitted = true;

    //interrompe se form for inválido
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.registerUser(this.registerForm.value)
    .pipe(
      first(),
      take(1)
    ).subscribe(
      data => {
        this.router.navigate(['/login'], { queryParams: { registered: true }});
      },
      error => {
        this.error = error;
        this.loading = false;
      });
  }

}
