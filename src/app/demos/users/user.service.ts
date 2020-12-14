import { Injectable } from '@angular/core';
//import axios from 'axios';
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { User } from './user.model';
import { interval, Observable, of, Subject } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import * as $ from 'jquery';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../shared/shared.service';
import { Page } from 'src/app/shared/page.model';
import { PAGE_SIZE, PAGE_NAV_SIZE, BACKEND_SERVER_BASE_URL } from '../../app.constants';
import { UserSearchCriterias } from './search/user-search-criterias.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = BACKEND_SERVER_BASE_URL +'user/get';
  urlCreateUser = BACKEND_SERVER_BASE_URL +'user/post';
  urlUpdateUser = BACKEND_SERVER_BASE_URL +'user/patch';
  urlDeleteUser = BACKEND_SERVER_BASE_URL +'user/delete';

  private sendSubmitted = new Subject<boolean>();
  private criterias = new Subject<UserSearchCriterias>();

  users: User[];
  usersModifed: User[] = [];

  constructor(private http: HttpClient, private translateService: TranslateService, private sharedService: SharedService) { }

  get$(page: number, criterias:UserSearchCriterias): Observable<Page> {
    return this.transfererUserListPage(
      this.http.post<Page>(
        this.url, { page: page, pageSize: PAGE_SIZE, criterias:criterias }
      )
    );
  }

  transfererUserListPage(userList$: Observable<Page>) {
    return userList$.pipe(map(page => {
      page.elements.map((user: User) => this.transfererUser(user));
      this.users = page.elements;
      return page;
    }));
  }

  transfererUser(user: User) {
    user.address.fullAddresse = (user.address.street == null ? '' : (user.address.street + ' '))
      + (user.address.zipcode == null ? '' : (user.address.zipcode + ' ')) + (user.address.city == null ? '' : user.address.city);
    if (user.address.geo?.lat != null && user.address.geo?.lng != null) {
      user.address.fullAddresse = user.address.fullAddresse + ' (' + user.address.geo.lat + ', ' + user.address.geo.lng + ')';
    }

    user.company.allCompanyInfo = this.translateService.instant('userMgt.userPage_co_name') + ' : ' + (user.company.name == null ? '' : user.company.name) + '\n' +
      this.translateService.instant('userMgt.userPage_co_catch_phrase') + ' : ' + (user.company.catchPhrase == null ? '' : user.company.catchPhrase) + '\n' +
      this.translateService.instant('userMgt.userPage_co_bs') + ' : ' + (user.company.bs == null ? '' : user.company.bs);
  }

  delete(index: number) {
    this.http.post(this.urlDeleteUser, { id: this.users[index].id }, { responseType: 'text' }).subscribe((val: string) => {
      console.log("POST call successful value returned in body",
        val);
      this.users.splice(index, 1);
      this.sharedService.sendShowMsgDiv({ msgType: 'success', msg: 'The user is deleted successfully.' });
      $("#btn_delete2").click();
    });

  }

  createUser(newUser: User): Observable<User> {
    const newIndex = this.users.length + 1;
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<User>(this.urlCreateUser, JSON.stringify(newUser), { headers: headers }).pipe(
      tap((data: User) => {
        console.log("POST call successful value returned in body",
          data);
        this.transfererUser(data);
        this.sharedService.sendShowMsgDiv({ msgType: 'success', msg: 'The user is created successfully.' });
        $("#btn_add2").click();
      })
    );
  }


  updateUser(user: User): Observable<User> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<User>(this.urlUpdateUser, JSON.stringify(user), { headers: headers }).pipe(
      tap((data: User) => {
        this.transfererUser(data);
        this.sharedService.sendShowMsgDiv({ msgType: 'success', msg: 'The user is modified successfully.' });
        $("#btn_add2").click();
      })

    );
  }


  getUsers() {
    return this.users;
  }

  resetSubmitFlag() {
    this.sendSubmitted.next(false);
  }

  getSubmitFlag(): Observable<boolean> {
    return this.sendSubmitted.asObservable();
  }

  sendCriterias(criterias: UserSearchCriterias){
    this.criterias.next(criterias);
  }
  getCriterias(): Observable<UserSearchCriterias> {
    return this.criterias.asObservable();
  }
}
