import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private msg = new Subject<any>();
  //private isLogin = new Subject<any>();
  private inputValueChanged = new Subject<any>();
  private showLogingRequisInfo = new Subject<boolean>();
  private firstName = new Subject<string>();

  constructor() { }

  sendMessage(message: string) {
    this.msg.next(message);
  }

  /*
  sendLoginStatut(message: boolean){
    this.isLogin.next(message);
  }*/

  sendFlagShowLogingRequisInfo(data: boolean) {
    console.info(data);
    this.showLogingRequisInfo.next(data);
  }


  sendInputValueChanged(data: any) {
    this.inputValueChanged.next(data);
  }

  sendFirstName(data:string){
    this.firstName.next(data);
  }

  clearMessage() {
    this.msg.next();
  }

  getMessage(): Observable<any> {
    return this.msg.asObservable();
  }

  getFlagShowLogingRequisInfo(): Observable<any> {
    return this.showLogingRequisInfo.asObservable();
  }

  getFirstName():Observable<string>{
    return this.firstName.asObservable();
  }

  /*
  getLoginStatut(): Observable<any>{
    return this.isLogin.asObservable();
  }*/

  getInputValueChanged(): Observable<any> {
    return this.inputValueChanged.asObservable();
  }
}
