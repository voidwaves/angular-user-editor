import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
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
    private location: Location
  ){}

  addUser() {
    this.userService.addUser(this.newUser)
  }

  goBack() {
    this.location.back()
  }

  ngOnInit(): void {
  }

}
