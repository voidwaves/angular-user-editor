import { Component, OnInit, Input } from '@angular/core'
import { UserService, User } from './user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(){}

  ngOnInit(){}
}
