import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AddUserComponent } from 'src/app/pages/add-user/add-user.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { UpdateUserComponent } from 'src/app/pages/update-user/update-user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: ListUsersComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddUserComponent },
  { path: 'update', component: UpdateUserComponent},
  //qualquer outra rota redireciona pra home
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
