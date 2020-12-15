import { Injectable } from '@angular/core';
import { PAGE_SIZE, PAGE_NAV_SIZE, BACKEND_SERVER_BASE_URL } from '../../app.constants';
import { Subject, Observable } from 'rxjs';
import { GroupSearchCriterias } from './search/group-search-criterias.model';
import { Group } from './group.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/shared/shared.service';
import { UserSearchCriterias } from '../users/search/user-search-criterias.model';
import { Page } from 'src/app/shared/page.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  entityType: string = "group";

  urlGet: string = BACKEND_SERVER_BASE_URL + this.entityType + '/get';
  urlCreate: string = BACKEND_SERVER_BASE_URL + this.entityType + '/post';
  urlUpdate: string = BACKEND_SERVER_BASE_URL + this.entityType + '/patch';
  urlDelete: string = BACKEND_SERVER_BASE_URL + this.entityType + '/delete';

  private sendSubmitted = new Subject<boolean>();
  private criterias = new Subject<GroupSearchCriterias>();
  private createOrUpdateEntityRes = new Subject<boolean>();

  entities: Group[];

  constructor(private http: HttpClient, private translateService: TranslateService, private sharedService: SharedService) { }

  get$(page: number, criterias: GroupSearchCriterias): Observable<Page> {
    return this.http.post<Page>(
      this.urlGet, { page: page, pageSize: PAGE_SIZE, criterias: criterias }
    );
  }

  delete(index: number): Observable<any> {
    return this.http.post(this.urlDelete, { id: this.entities[index].id }, { responseType: 'text' });

  }

  create(newEntity: Group): Observable<Group> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<Group>(this.urlCreate, JSON.stringify(newEntity), { headers: headers });
  }


  update(entity: Group): Observable<Group> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<Group>(this.urlUpdate, JSON.stringify(entity), { headers: headers });
  }


  getEntities() {
    return this.entities;
  }

  resetSubmitFlag() {
    this.sendSubmitted.next(false);
  }

  getSubmitFlag(): Observable<boolean> {
    return this.sendSubmitted.asObservable();
  }

  sendCriterias(criterias: GroupSearchCriterias) {
    this.criterias.next(criterias);
  }
  getCriterias(): Observable<GroupSearchCriterias> {
    return this.criterias.asObservable();
  }

  sendCreateOrUpdateEntityRes(res: boolean) {
    this.createOrUpdateEntityRes.next(res);
  }

  getCreateOrUpdateEntityRes(): Observable<any> {
    return this.createOrUpdateEntityRes.asObservable();
  }
}
