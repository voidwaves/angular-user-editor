import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {

  user: User

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ){}

  getUser() {
    const id = +this.route.snapshot.paramMap.get('id')
    this.userService.getUserById(id).subscribe(user => this.user = user)
  }

  deleteUser(user: User) {
    this.userService.deleteUserById(user.id).subscribe()
  }

  ngOnInit(): void {
    this.getUser()
  }

  goBack() {
    this.location.back()
  }
}
