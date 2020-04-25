import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users;
  
  constructor(
    private homeService: HomeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.homeService.getUsers().pipe(take(1)).subscribe(data => {
      this.users = data;
    })
  }

  editUser(id){
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

}
