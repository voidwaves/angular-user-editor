import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  userList: User[]

  constructor(private userService: UserService) { }

  getUsers() {
    this.userService.getUsers().subscribe(users => this.userList = users)
  }

  ngOnInit(): void {
    this.getUsers()
  }

}
