import { Injectable } from '@angular/core';
import { PAGE_SIZE, PAGE_NAV_SIZE } from '../../app.constants';
import { Subject, Observable } from 'rxjs';
import { GroupSearchCriterias } from './search/group-search-criterias.model';
import { Group } from './group.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/shared/shared.service';
import { BaseEntityService } from 'src/app/shared/base-entity.service';

@Injectable({
  providedIn: 'root'
})
export class GroupsService extends BaseEntityService<Group, GroupSearchCriterias>{

  constructor(private http: HttpClient,
    private translateService: TranslateService,
    private sharedService: SharedService) {
    super('group');
  }

  getSimpleGroupList():Observable<Group[]> {
    return this.http.get<Group[]>(this.urlBase + "/getSimpleList");
  }

  getHttp(): HttpClient {
    return this.http;
  }
  getSharedService(): SharedService {
    return this.sharedService;
  }

}
