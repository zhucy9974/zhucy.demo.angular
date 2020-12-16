import { Component, Input, OnChanges, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UserService } from "./user.service";
import { User } from './user.model';
import { Observable, of, Subject, Subscription } from "rxjs";
import { SharedService } from '../../shared/shared.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Page } from 'src/app/shared/page.model';
import { UserSearchCriterias } from './search/user-search-criterias.model';


@Component({
  selector: 'app-demo-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];

  pageNav: Page;
  criterias: UserSearchCriterias = new UserSearchCriterias();

  users$: Observable<User[]> = of([]);
  userToShow: User = null;
  consultOnly: boolean = false;
  userIndexToDelete: number;

  token: String = '';

  private isDead$ = new Subject();

  constructor(private userService: UserService,
    private sharedService: SharedService,
    private router: Router) {
    this.sharedService.checkLoginStatus();
  }

  ngOnInit(): void {
    this.loadUserListPage(this.userService.get$(1, this.criterias));
    this.userService.getCriterias().subscribe(data => {
      this.criterias = data;
      this.loadUserListPage(this.userService.get$(1, data));
    }
    );
    this.userService.getCreateOrUpdateUserRes().subscribe(res => {
      if (res)
        this.loadUserListPage(this.userService.get$(this.pageNav.currentPage, this.criterias));
    });
  }

  private loadUserListPage(page: Observable<Page>) {
    page.subscribe((page: Page) => {
      this.users$ = of(page.elements);
      this.pageNav = this.sharedService.loadPageNavInfo(page);

    });
  }

  ngAfterViewChecked() {
    const hMainDiv = document.documentElement.clientHeight;
    const hNavbar = parseInt($('#navbar_div').css('height'));
    $('#users_main_div').css('height', hMainDiv - hNavbar);
  }

  trackByUserId(user: any): string {
    return user.id
  }

  add() {
    this.consultOnly = false;
    this.userToShow = User.newUser();
    //this.users$ = this.userService.add();
  }

  /*
  async userCreated(data: Observable<User>) {
    const user: User = await data.toPromise();
    const users: User[] = await this.users$.toPromise();
    users.push(user);
    this.users$ = of(users);
  }*/

  toDelete(index: number) {
    this.userIndexToDelete = index;
  }

  delete() {
    this.userService.delete(this.userIndexToDelete).subscribe((val: string) => {
      console.log("POST call successful value returned in body",
        val);
      this.sharedService.sendShowMsgDiv({ msgType: 'success', msg: 'The user is deleted successfully.' });
      this.loadUserListPage(this.userService.get$(this.pageNav.currentPage, this.criterias));
      $("#btn_delete2").click();
    });
  }

  dataChanged(id: number, attr: string, event) {
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

  resetSubmitFlag() {
    this.userService.resetSubmitFlag();
  }

  getUsers(event) {
    this.loadUserListPage(this.userService.get$(parseInt(event.target.innerText), this.criterias));
  }

  getPageLot(forNext: boolean) {
    this.loadUserListPage(this.userService.get$(this.sharedService.getPageNumByChangePageLot(this.pageNav, forNext), this.criterias));
  }

}
