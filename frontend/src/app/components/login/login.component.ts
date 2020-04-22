import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, take } from 'rxjs/operators';

import { AuthenticationService } from '../../auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    //direcionar pra home se já estiver autenticado
    (this.authenticationService.currentUserValue) ? this.router.navigate(['/users']) : '';
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/users';
  }

  onSubmit() {
    this.submitted = true;

    //se form estiver invalid para o submit
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
      .pipe(
        first(),
        take(1))
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          this.loading = false;
        });
  }

}
