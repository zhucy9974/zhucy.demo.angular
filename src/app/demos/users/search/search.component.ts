import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserSearchCriterias } from './user-search-criterias.model';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { UserService } from '../user.service';

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

  fieldsForOrder = {
    username: 'userMgt.search_username',
    firstName: 'userMgt.search_firstName',
    city: 'userMgt.list_city',
    companyName: 'userMgt.list_company'
  };

  needMoreCriteria: boolean = false;
  criterias: UserSearchCriterias = new UserSearchCriterias();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  submitSearch() {
    this.userService.sendCriterias(this.criterias);
  }

  clearCriterias() {
    this.criterias = new UserSearchCriterias();
    this.userService.sendCriterias(this.criterias);
  }

  needMoreCriteriaFn(flag: boolean) {
    this.needMoreCriteria = flag;
  }

}
