import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../user.service';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss']
})
export class FormViewComponent implements OnInit {

  newUser = {
    id: 0,
    name: '',
    age: 0,
    city: ''
  }

  constructor(
    private userService: UserService,
    private router: Router
  ){}

  addUser() {
    this.userService.addUser(this.newUser.name, this.newUser.age, this.newUser.city).subscribe()
  }

  goBack() {
    this.router.navigateByUrl('/list')
  }

  ngOnInit(): void {
  }

}
