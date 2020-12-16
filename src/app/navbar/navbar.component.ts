import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../demos/users/user.service';
import { User } from '../demos/users/user.model';
import { Observable, of } from 'rxjs';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';
import { NavbarService } from './navbar.service';
import { registerLocaleData, getLocaleId } from '@angular/common';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() name: string = 'Chongyang1';
  @Output() search: EventEmitter<string> = new EventEmitter();
  loginUserName: string;
  isLogin: boolean = false;
  firstName: string;

  user$: Observable<User>;
  LoginUser: User;

  showMsgDiv: boolean = false;
  msgDivType: string;
  msgDivContent: string;
  constructor(private userService: UserService,
    private sharedService: SharedService,
    private router: Router,
    private translateService: TranslateService,
    private navbarService: NavbarService) {
    //setTimeout(()=>this.name='Chongyang2',2000);
  }

  ngOnInit() {
    this.sharedService.getFirstName().subscribe((data: string) => {
      this.firstName = data;
    });
    if (this.firstName == null) {
      this.firstName = sessionStorage.getItem('firstName');
    }
    this.sharedService.getShowMsgDiv().subscribe((data: any) => {
      this.showMsgDiv = true;
      this.msgDivType = data['msgType'];
      this.msgDivContent = data['msg'];
      setTimeout(() => {
        this.showMsgDiv = false;
      }, 3000);
    });

    this.navbarService.getCurrentItem().subscribe((itemId: string) => {
      $(".nav-item-tochange").removeClass("active");
      $("#navbar_" + itemId).addClass("active");
    });

  }




  //code laisser pour l'exemple
  /*
  this.user$ =  this.userService.getLoginUser();
  this.sharedService.getLoginStatut().subscribe(value => {
    this.isLogin = value;
  });*/



  changedSearch(value) {
    this.search.emit(value);
  }

  logout() {
    //this.sharedService.sendLoginStatut(false);
    sessionStorage.clear();
    this.firstName = null;
    this.router.navigate(['']);
  }

  changeLanguage(language: string) {
    this.translateService.use(language);
    this.sharedService.sendLocaleChanged(language);
  }

  activeItem(event) {
    this.showMsgDiv = false;
    $(".nav-item-tochange").removeClass("active");
    $(".nav-item-tochange").each(function (index) {
      if (event.target.innerText == $(this).text()) {
        $(this).addClass("active");
      }
    });
  }

  closeMsgDiv() {
    this.showMsgDiv = false;
  }

}
