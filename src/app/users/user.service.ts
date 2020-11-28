import { Injectable } from '@angular/core';
//import axios from 'axios';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {User} from '../shared/user.model';
import {interval, Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[];
  usersModifed: User[] = [];

  url = 'http://localhost:8080/demo/user/getUsers';
  url2 = 'http://localhost:8080/demo/user/findById?id=';

  urlCreateUser = 'http://localhost:8080/demo/user/createUser';
  urlDeleteUser = 'http://localhost:8080/demo/user/delete';
  //url = 'https://jsonplaceholder.typicode.com/users';
  private userLogin:User;

  constructor(private http: HttpClient) { }

  async get(): Promise<User[]> {
    const res = await this.http.get<User[]>(this.url).toPromise();
    this.users = await res;
    return res;
  }

  get$(): Observable<User[]> {
    return this.transfererUserList(this.http.get<User[]>(this.url));
  }

  transfererUserList(userList$: Observable<User[]>) {
    return userList$.pipe(
      map(users=>users.map((user:User)=>{
        user.address.fullAddresse=user.address.street+' '
          +user.address.zipcode+' '+user.address.city;
        return user;
      })),
      map(users=> this.users = users)
    );
  }

  delete(index:number){
    this.http.post(this.urlDeleteUser,{id:this.users[index].id},{responseType: 'text'}).subscribe((val:string)=>{
      console.log("POST call successful value returned in body", 
      val);
      this.users.splice(index,1);
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
    console.info(newIndex);
    //pas bien
    //this.users.push({name: 'Test${newIndex}', age: 15, id: newIndex});

    //bien
    //this.users = [...this.users, {name: 'Test${newIndex}', email: 15, id: newIndex}];

    const user = new User();
    user.id = newIndex;
    user.name = 'Chongyang';
    user.email = 'zhucy@gmail.com';
    user.address = {street: 'Happy', zipcode: '74000', city: 'Annecy'};
    console.info(user);
    this.users = [...this.users, user];
    return this.transfererUserList(of(this.users));
  }

  createUser(newUser:User): Observable<User[]> {
    const newIndex = this.users.length + 1;
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.http.post(this.urlCreateUser,JSON.stringify(newUser),{headers: headers}).subscribe((val:User)=>{
      console.log("POST call successful value returned in body", 
      val);
      //JSON.parse(val);
     this.users = [...this.users,val];
    });
    
    return this.transfererUserList(of(this.users));
  }

  checkEmail(input: FormControl){
    return this.http.get<User>(this.url).pipe(
      map(user=>{
        return user.email == input.value?{emailNotExists:true}:null;
      })
    );
  }

  getLoginUser(){
    return this.http.get<User>(this.url2+'23').pipe(
      map(user=>{
        return user;
      })
    );
  }

  getUsers(){
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


}
