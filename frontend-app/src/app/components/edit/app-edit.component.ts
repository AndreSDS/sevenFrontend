import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeService } from '../home/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-app-edit',
  templateUrl: './app-edit.component.html',
  styleUrls: ['./app-edit.component.css']
})
export class EditComponent implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private homeService: HomeService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.route.params
    .pipe(
      map((params: any) => params['id']),
      switchMap(id => this.homeService.editUserById(id)
      )
    ).subscribe( user => this.updateForm(user));
    
    this.form = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required]],
      website: [null]
    });

  }

  updateForm(user){
    this.form.patchValue({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website
    });
  }

  updateUser(){
    this.homeService.upDateUser(this.form.value).subscribe(
      success => {
        alert(`Usuário ${this.form.value.name}, atualizado com sucesso!`)
        //  this.router.navigate(['/']);
        console.log(this.form.value);
      },
      error => console.log(error)
      );
  }

  cancelUpdate(){
      this.form.reset();
      this.router.navigate(['/']);
  }

}
