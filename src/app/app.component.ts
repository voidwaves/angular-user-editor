import { Component, OnInit, Input } from '@angular/core'
import { UserService, User } from './user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: User[] 
  selectedUser: User
  newUser: User = {
    id: 0,
    name: '',
    age: 0,
    city: ''
  }
  displayUserInput = false

  constructor(private userService: UserService){}

  toggleUserInput() {
    this.displayUserInput = !this.displayUserInput
  }

  getUsers() {
    this.refreshUsers(this.userService.getUsers())
  }

  selectUser(user: User) {
    this.selectedUser = user
  }
  
  addUser() {
    this.refreshUsers(this.userService.addUser(this.newUser))
    this.newUser = {
      id: 0,
      name: '',
      age: 0,
      city: ''
    }
  }

  deleteUser(user: User) {
    this.refreshUsers(this.userService.deleteUserById(user.id))
    this.selectedUser = undefined
  }

  refreshUsers(observable: Observable<User[]>) {
    observable.subscribe(users => this.users = users)
  }

  ngOnInit() {
    this.getUsers()
  }

}
