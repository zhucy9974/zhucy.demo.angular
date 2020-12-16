import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Page } from './page.model';
import { PAGE_NAV_SIZE } from '../app.constants';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private localeChanged = new Subject<any>();
  private inputValueChanged = new Subject<any>();
  private showMsgDiv = new Subject<any>();
  private firstName = new Subject<string>();

  constructor(private router: Router) { }

  sendShowMsgDiv(data: any) {
    this.showMsgDiv.next(data);
  }


  sendInputValueChanged(data: any) {
    this.inputValueChanged.next(data);
  }

  sendFirstName(data: string) {
    this.firstName.next(data);
  }

  getShowMsgDiv(): Observable<any> {
    return this.showMsgDiv.asObservable();
  }

  getFirstName(): Observable<string> {
    return this.firstName.asObservable();
  }

  /*
  getLoginStatut(): Observable<any>{
    return this.isLogin.asObservable();
  }*/

  getInputValueChanged(): Observable<any> {
    return this.inputValueChanged.asObservable();
  }

  loadPageNavInfo(pageNav: Page): Page {

    pageNav.pagesOfNav = [];
    pageNav.currentPageLot = Math.ceil(pageNav.currentPage / PAGE_NAV_SIZE);
    const lastPageOfCurrentLot: number = PAGE_NAV_SIZE * (pageNav.currentPageLot);
    const isLastLot: boolean = lastPageOfCurrentLot >= pageNav.totalPages;

    var pageNaviFirst: number;
    var pageNaviLast: number;
    if (isLastLot) {
      pageNaviFirst = (pageNav.currentPageLot - 1) * PAGE_NAV_SIZE + 1;
      pageNaviLast = pageNav.totalPages;
    } else {
      pageNaviFirst = (pageNav.currentPageLot - 1) * PAGE_NAV_SIZE + 1;
      pageNaviLast = pageNav.currentPageLot * PAGE_NAV_SIZE;
    }

    for (var i = pageNaviFirst; i <= pageNaviLast; i++) {
      pageNav.pagesOfNav.push(i);
    }

    const numPageLot: number = Math.ceil(pageNav.totalPages / PAGE_NAV_SIZE);
    if (pageNav.currentPageLot > 1) {
      pageNav.hasLastPageLot = true;
      pageNav.hasNextPageLot = false;
    }
    if (pageNav.currentPageLot < numPageLot) {
      pageNav.hasNextPageLot = true;
      pageNav.hasLastPageLot = false;
    }
    return pageNav;
  }

  getPageNumByChangePageLot(pageNav: Page, forNext: boolean): number {
    var pageNum: number;
    if (forNext) {
      pageNum = pageNav.currentPageLot * PAGE_NAV_SIZE + 1;
    } else {
      pageNum = (pageNav.currentPageLot - 1) * PAGE_NAV_SIZE;
    }
    return pageNum;
  }

  checkLoginStatus() {
    const username: string = sessionStorage.getItem('username');
    if (username === null) {
      this.sendShowMsgDiv({ msgType: 'info', msg: 'Please login for going to the page which you want.' });
      this.router.navigate(['login']);
    }
  }

  getJsonHttpHeader():HttpHeaders{
    return new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  }

  sendLocaleChanged(locale:string){
    this.localeChanged.next(locale);
  }

  getLocaleChanged():Observable<string>{
    return this.localeChanged.asObservable();
  }

}
