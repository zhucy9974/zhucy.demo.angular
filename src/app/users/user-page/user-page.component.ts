import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  @Input() consultOnly:boolean;
  @Input() userToShow:User;

  @Output() onUserCreated: EventEmitter<any> = new EventEmitter<any>();

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  createUser(){
    const users$ = this.userService.createUser(this.userToShow);
    console.info(users$);
    this.onUserCreated.emit(users$);
  }

}
