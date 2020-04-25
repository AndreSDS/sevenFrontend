import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { HeaderComponent } from '../components/header/app-header.component';
import { FooterComponent } from '../components/footer/app-footer.component';
import { HomeComponent } from '../components/home/home.component';
import { EditComponent } from '../components/edit/app-edit.component';
import { CreateComponent } from '../components/create/create.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    EditComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    EditComponent,
    CreateComponent
  ]
})
export class SharedModule { }