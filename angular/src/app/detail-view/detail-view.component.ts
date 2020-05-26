import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {

  user: User
  isEditing: boolean = false
  editedUser: User

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  getUser() {
    const id = +this.route.snapshot.paramMap.get('id')
    this.userService.getUserById(id).subscribe(result => {
      this.user = result.data.user
      this.editedUser = {...result.data.user}
    })
  }

  deleteUser(user: User) {
    this.userService.deleteUserById(user.id).subscribe(_ => this.goBack())
  }

  editUser() {
    this.userService.editUser(this.editedUser).subscribe(_ => this.toggleEditing())
  }

  ngOnInit(): void {
    this.getUser()
  }

  toggleEditing() {
    this.isEditing = !this.isEditing
    this.editedUser = {...this.user}
  }

  goBack() {
    this.router.navigateByUrl('/list')
  }
}
