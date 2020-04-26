import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeService } from '../home/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required]],
      website: [null]
    });
  }

  createUser(){
    this.submitted = true;
    if(this.form.valid){
      this.homeService.createUsers(this.form.value).subscribe(
        success => {
          alert(`Usuário ${this.form.value.name}, cadastrado com sucesso!`)
          this.router.navigate(['/']);
          console.log(this.form.value);
        },
        error => console.log(error)
        );
    }
  }

  cancelCreate(){
    this.submitted = false;
    this.form.reset();
    this.router.navigate(['/']);
  }

}
