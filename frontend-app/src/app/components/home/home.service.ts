import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  apiUsers: string = "http://localhost:8000/users";

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(this.apiUsers);
  }

  createUsers(user){
    return this.http.post(this.apiUsers, {user}).pipe(take(1));
  }

  editUserById(id){
    return this.http.get(`${this.apiUsers}/${id}`).pipe(take(1));
  }

  upDateUser(user){
    return this.http.put(`${this.apiUsers}/${user.id}`, {user}).pipe(take(1));
  }
}
