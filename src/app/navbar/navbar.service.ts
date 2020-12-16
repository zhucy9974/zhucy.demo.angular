import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private currentItem = new Subject<string>();

  constructor() { }

  sendCurrentItem(itemId: string) {
    this.currentItem.next(itemId);
  }
  getCurrentItem(): Observable<string> {
    return this.currentItem.asObservable();
  }
}
