import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { UserSearch } from './user-search.model';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  animations: [
    trigger('visibility', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0, height: '0px' })),
      transition('true => false', animate('.2s')),
      transition('false => true', animate('.2s'))
    ])
  ],
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  needMoreCriteria: boolean = false;
  criteria: string;
  criterias: UserSearch;
  @Output() search: EventEmitter<string> = new EventEmitter();

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  sendCriteria() {
    //console.info(this.criteria);
    this.sharedService.sendMessage(this.criteria);
  }

  public sendMessage() {
    //this.sharedService.sendMessage('test');
  }

  needMoreCriteriaFn(flag: boolean) {
    this.needMoreCriteria = flag;
  }


}
