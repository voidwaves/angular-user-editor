import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router'
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss']
})
export class FormViewComponent implements OnInit {

  newUser: User = {
    name: '',
    age: 0,
    city: ''
  }

  constructor(
    private userService: UserService,
    private router: Router
  ){}

  addUser() {
    this.userService.addUser(this.newUser).subscribe(_ => this.goBack())
  }

  goBack() {
    this.router.navigateByUrl('/list')
  }

  ngOnInit() {
  }
}
