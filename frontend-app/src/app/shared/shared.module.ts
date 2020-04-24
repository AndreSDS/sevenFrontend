import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { HeaderComponent } from '../components/header/app-header.component';
import { FooterComponent } from '../components/footer/app-footer.component';
import { LoginComponent } from '../components/login/app-login.component';
import { RegisterComponent } from '../components/register/app-register.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class SharedModule { }
