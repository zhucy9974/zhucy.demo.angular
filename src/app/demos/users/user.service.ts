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
import { PAGE_SIZE, PAGE_NAV_SIZE } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[];
  usersModifed: User[] = [];

  private sendSubmitted = new Subject<boolean>();

  url = 'http://213.44.249.81:8080/demo/user/getUsers';
  url2 = 'http://213.44.249.81:8080/demo/user/findById?id=';

  urlCreateUser = 'http://213.44.249.81:8080/demo/user/createUser';
  urlUpdateUser = 'http://213.44.249.81:8080/demo/user/patch';
  urlDeleteUser = 'http://213.44.249.81:8080/demo/user/delete';
  //url = 'https://jsonplaceholder.typicode.com/users';
  private userLogin: User;

  constructor(private http: HttpClient, private translateService: TranslateService, private sharedService: SharedService) { }

  async get(): Promise<User[]> {
    const res = await this.http.get<User[]>(this.url).toPromise();
    this.users = await res;
    return res;
  }

  get$(page: number): Observable<Page> {
    return this.transfererUserListPage(
      this.http.post<Page>(
        this.url, { page: page, pageSize: PAGE_SIZE }
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

  transfererUserList(userList$: Observable<User[]>) {
    return userList$.pipe(
      map(users => {
        users.map((user: User) => {
          this.transfererUser(user);
        });
        return users;
      })
    );
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

  add1(): any[] {
    const newIndex = this.users.length + 1;
    //pas bien
    //this.users.push({name: 'Test${newIndex}', age: 15, id: newIndex});

    //bien, commenté, car le type de la liste user est changé
    //this.users = [...this.users, {name: 'Test${newIndex}', email: 15, id: newIndex}];
    return this.users;
  }

  add(): Observable<User[]> {
    const newIndex = this.users.length + 1;
    //pas bien
    //this.users.push({name: 'Test${newIndex}', age: 15, id: newIndex});

    //bien
    //this.users = [...this.users, {name: 'Test${newIndex}', email: 15, id: newIndex}];

    const user = new User();
    user.id = newIndex;
    //user.name = 'Chongyang';
    user.email = 'zhucy@gmail.com';
    user.address = { street: 'Happy', zipcode: '74000', city: 'Annecy' };
    this.users = [...this.users, user];
    return this.transfererUserList(of(this.users));
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
      //catchError()
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
      //catchError()
    );
  }


  /*
  checkEmail(input: FormControl) {
    return this.http.get<User>(this.url).pipe(
      map(user => {
        return user.email == input.value ? { emailNotExists: true } : null;
      })
    );
  }*/

  getLoginUser() {
    return this.http.get<User>(this.url2 + '23').pipe(
      map(user => {
        return user;
      })
    );
  }

  getUsers() {
    return this.users;
  }
  /*
    loadUserByEmail2(email: string):Observable<User>{
      const users = this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
      users.forEach
      var user1:User = null;
      users.forEach(user => {
      
        if(email==user.email){
          console.info('test');
          user1 =  user;
        }
      });
  
      return user1;
      
    }*/

  resetSubmitFlag() {
    this.sendSubmitted.next(false);
  }

  getSubmitFlag(): Observable<boolean> {
    return this.sendSubmitted.asObservable();
  }
}
