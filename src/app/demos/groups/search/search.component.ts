import { Component, OnInit } from '@angular/core';
import { GroupSearchCriterias } from './group-search-criterias.model';
import { GroupsService } from '../groups.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  fieldsForOrder = {
    name: 'field.groupName',
    dateCreate: 'field.dateCreate'
  };

  criterias: GroupSearchCriterias = new GroupSearchCriterias();

  constructor(private groupService: GroupsService) { }

  ngOnInit(): void {
  }

  submitSearch() {
    this.groupService.sendCriterias(this.criterias);
  }

  clearCriterias() {
    this.criterias = new GroupSearchCriterias();
    this.groupService.sendCriterias(this.criterias);
  }

}