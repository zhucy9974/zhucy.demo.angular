import { Component, Input, OnChanges, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UserService } from "./user.service";
import { User } from '../shared/user.model';
import { Observable, of, Subject, Subscription } from "rxjs";
import { SharedService } from '../shared/shared.service';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as $ from 'jquery';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnChanges {
  @ViewChild('modalDeleted')
  public modalDeleted: TemplateRef<any>;

  @Input() criteria: string;
  @Input() search: string;

  //façon async
  users: User[];
  users$: Observable<User[]> = of([]);
  userToShow: User = null;
  consultOnly: boolean = false;
  userIndexToDelete: number;

  private isDead$ = new Subject();

  constructor(private userService: UserService, private sharedService: SharedService, private modalService: NgbModal) { }

  /* façon async et await
  async ngOnInit() {
    this.users = await this.userService.get();
  }*/

  //façon observable1
  /*
  ngOnInit():void {
    this.userService.get$().subscribe(res => this.users=res);
  }*/

  //façon observable2. l'avantage, il va desuscript automatiquement
  ngOnInit(): void {
    this.users$ = this.userService.get$();
    this.sharedService.getMessage().subscribe(value => {
      this.search = value;
    });
  }

  ngOnChanges(v1) {
    //console.info(message:)
  }

  trackByUserId(user: any): string {
    return user.id
  }

  add() {
    this.consultOnly = false;
    this.userToShow = User.newUser();
    //this.users$ = this.userService.add();
  }

  userCreated(data: any) {
    console.info(12121);
    this.users$ = data;
  }

  toDelete(index: number) {
    this.userIndexToDelete = index;
  }

  delete() {
    console.info(this.userIndexToDelete)
    this.userService.delete(this.userIndexToDelete);
  }

  dataChanged(id: number, attr: string, event) {
    console.info(id);
    let userToModifier: User = null;
    userToModifier = this.getModifedUserById(id);
    if (userToModifier == null) {
      userToModifier = new User();
      userToModifier.id = id;
      this.userService.usersModifed.push(userToModifier);
    }

    userToModifier[attr] = event.target.innerText;

  }

  isDataModified(id: number, attr: string) {
    const userModifed = this.getModifedUserById(id);
    if (userModifed == null) {
      return false;
    }

    const userOrigine = this.getUserById(id);
    if (userOrigine == null) {
      return false;
    }

    if (userModifed[attr] == undefined) {
      return false;
    }

    if (userModifed[attr] != userOrigine[attr]) {
      console.info(attr);
      return true;
    }

    return false;
  }

  private getUserById(id: number) {
    let user1: User = null;
    this.userService.users.forEach((user: User) => {
      if (user.id == id) {
        user1 = user;
      }
    });
    return user1;
  }

  private getModifedUserById(id: number) {
    let user1: User = null;
    this.userService.usersModifed.forEach((user: User) => {
      if (user.id == id) {
        user1 = user;
      }
    });
    return user1;
  }

  showUserDetail(id: number) {
    this.consultOnly = true;
    this.userToShow = this.getUserById(id);
  }

  modifyUserInfo(id: number) {
    this.consultOnly = false;
    this.userToShow = this.getUserById(id);
  }


}
