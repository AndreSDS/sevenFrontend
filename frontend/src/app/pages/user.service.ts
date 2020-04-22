import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router : Router,
    private route: ActivatedRoute) {}

  getAllUsers(){
    return this.http.get<User[]>(`${config.apiUrl}/users`);
  }

  addUser(user: User){
    return this.http.post(`${config.apiUrl}/add`, user);
  }

  updateUserById(id)  {
    this.router.navigate(['update', id], { relativeTo: this.route });
  }

}
