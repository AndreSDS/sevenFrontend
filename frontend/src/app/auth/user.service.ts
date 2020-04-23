import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router : Router,
    private route: ActivatedRoute) {}

  getAllUsers(){
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  registerUser(user: User){
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }

  delete(id)  {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }

}
