import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { Group } from '../demos/groups/group.model';
import { BaseEntityModel } from './base-entity.model';
import { PAGE_SIZE } from '../app.constants';
import { Page } from './page.model';
import { AppConfigService } from '../app.config.service';

export abstract class BaseEntityService<T extends BaseEntityModel, E>  {

  urlBase: string;
  urlGet: string;
  urlCreate: string;
  urlUpdate: string;
  urlDelete: string;

  private sendSubmitted = new Subject<boolean>();
  private criterias = new Subject<E>();
  private createOrUpdateEntityRes = new Subject<boolean>();

  entities: T[];

  constructor(entityType: string) {
    this.urlBase = AppConfigService.settings?.apiUrl + entityType;
    this.urlGet = AppConfigService.settings?.apiUrl + entityType + '/get';
    this.urlCreate = AppConfigService.settings?.apiUrl + entityType + '/post';
    this.urlUpdate = AppConfigService.settings?.apiUrl + entityType + '/patch';
    this.urlDelete = AppConfigService.settings?.apiUrl + entityType + '/delete';
  }

  abstract getHttp(): HttpClient;
  abstract getSharedService(): SharedService;

  get$(page: number, criterias: E): Observable<Page> {
    return this.getHttp().post<Page>(
      this.urlGet, { page: page, pageSize: PAGE_SIZE, criterias: criterias }
    );
  }

  delete(id: number): Observable<any> {
    return this.getHttp().post(this.urlDelete, { id: id }, { responseType: 'text' });
  }

  create(newEntity: Group): Observable<Group> {
    return this.getHttp().post<Group>(this.urlCreate, JSON.stringify(newEntity), { headers: this.getSharedService().getJsonHttpHeader() });
  }


  update(entity: Group): Observable<Group> {
    return this.getHttp().post<Group>(this.urlUpdate, JSON.stringify(entity), { headers: this.getSharedService().getJsonHttpHeader() });
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

  sendCriterias(criterias: E) {
    this.criterias.next(criterias);
  }
  getCriterias(): Observable<E> {
    return this.criterias.asObservable();
  }

  sendCreateOrUpdateEntityRes(res: boolean) {
    this.createOrUpdateEntityRes.next(res);
  }

  getCreateOrUpdateEntityRes(): Observable<any> {
    return this.createOrUpdateEntityRes.asObservable();
  }
}
