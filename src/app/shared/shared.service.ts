import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private msg = new Subject<any>();
  private isLogin = new Subject<any>();
  private inputValueChanged = new Subject<any>();
  
  constructor() { }

  sendMessage(message: string){
    this.msg.next(message);
  }

  sendLoginStatut(message: boolean){
    this.isLogin.next(message);
  }

  sendInputValueChanged(data:any){
    this.inputValueChanged.next(data);
  }

  clearMessage(){
    this.msg.next();
  }

  getMessage(): Observable<any>{
    return this.msg.asObservable();
  }

  getLoginStatut(): Observable<any>{
    return this.isLogin.asObservable();
  }

  getInputValueChanged(): Observable<any>{
    return this.inputValueChanged.asObservable();
  }
}
