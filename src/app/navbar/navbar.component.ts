import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { UserService } from '../users/user.service';
import { User } from '../shared/user.model';
import { Observable, of } from 'rxjs';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() name:string = 'Chongyang1';
  @Output() search: EventEmitter<string> = new EventEmitter();
  loginUserName:string;
  isLogin:boolean = false;

  user$: Observable<User>;
  LoginUser:User;
  constructor( private userService:UserService,
    private sharedService:SharedService,
    private router:Router,
    private translateService:TranslateService) {
    //setTimeout(()=>this.name='Chongyang2',2000);
  }

  ngOnInit() {
    
    this.user$ =  this.userService.getLoginUser();
    this.sharedService.getLoginStatut().subscribe(value => {
      this.isLogin = value;
    });

  }

  changedSearch(value){
    this.search.emit(value); 
  }

  logout(){
    this.sharedService.sendLoginStatut(false);
    this.router.navigate(['']);
  }

  changeLanguage(language:string){
    this.translateService.use(language);
  }
}
