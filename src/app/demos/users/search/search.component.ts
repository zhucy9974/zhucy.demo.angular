import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
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

  needMoreCriteria: boolean = false;
  criteria: string;
  criterias: UserSearchCriterias = new UserSearchCriterias();
  @Output() search: EventEmitter<string> = new EventEmitter();

  constructor(private sharedService: SharedService, private userService: UserService) { }

  ngOnInit(): void {
  }

  //ancienne façon, recherche rapide sur la page
  sendCriteria() {
    //console.info(this.criteria);
    this.sharedService.sendMessage(this.criteria);
  }

  submitSearch(){
    
    this.userService.sendCriterias(this.criterias);
  }

  clearCriterias(){
    this.criterias = new UserSearchCriterias();
    this.userService.sendCriterias(this.criterias);
  }

  public sendMessage() {
    //this.sharedService.sendMessage('test');
  }

  needMoreCriteriaFn(flag: boolean) {
    this.needMoreCriteria = flag;
  }


}
