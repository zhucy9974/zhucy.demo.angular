import { Component, OnInit } from '@angular/core';
import { Group } from './group.model';
import { GroupsService } from './groups.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';
import { Page } from 'src/app/shared/page.model';
import { GroupSearchCriterias } from './search/group-search-criterias.model';
import { of, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as $ from 'jquery';

@Component({
  selector: 'app-demo-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  entityType: string = 'groups';

  pageNav: Page;
  criterias: GroupSearchCriterias = new GroupSearchCriterias();

  entities$: Observable<Group[]> = of([]);
  entityToShow: Group = null;
  consultOnly: boolean = false;
  idOfentityToDelete: number;

  token: String = '';

  constructor(private groupService: GroupsService,
    private sharedService: SharedService,
    private router: Router) {
    this.sharedService.checkLoginStatus();
  }

  ngOnInit(): void {
    this.loadEntityListPage(this.groupService.get$(1, this.criterias));
    this.groupService.getCriterias().subscribe(data => {
      this.criterias = data;
      this.loadEntityListPage(this.groupService.get$(1, data));
    }
    );
    this.groupService.getCreateOrUpdateEntityRes().subscribe(res => {
      if (res)
        this.loadEntityListPage(this.groupService.get$(this.pageNav.currentPage, this.criterias));
    });
  }

  private loadEntityListPage(page: Observable<Page>) {
    page.subscribe((page: Page) => {
      this.entities$ = of(page.elements);
      this.pageNav = this.sharedService.loadPageNavInfo(page);

    });
  }

  ngAfterViewChecked() {
    const hMainDiv = document.documentElement.clientHeight;
    const hNavbar = parseInt($('#navbar_div').css('height'));
    $('#' + this.entityType + '_main_div').css('height', hMainDiv - hNavbar);
  }

  trackByEntityId(entity: any): string {
    return entity.id
  }

  add() {
    this.consultOnly = false;
    this.entityToShow = new Group();
    //this.entities$ = this.groupService.add();
  }

  async entityCreated(data: Observable<Group>) {
    const entity: Group = await data.toPromise();
    const entities: Group[] = await this.entities$.toPromise();
    entities.push(entity);
    this.entities$ = of(entities);
  }

  toDelete(id: number) {
    this.idOfentityToDelete = id;
  }

  delete() {
    this.groupService.delete(this.idOfentityToDelete).subscribe((val: string) => {
      console.log("POST call successful value returned in body",
        val);
      this.sharedService.sendShowMsgDiv({ msgType: 'success', msg: 'The group is deleted successfully.' });
      this.loadEntityListPage(this.groupService.get$(this.pageNav.currentPage, this.criterias));
      $("#btn_delete2").click();
    });
  }

  private async loadEntityById(id: number) {
    const entities:Group[] = await this.entities$.toPromise();
    entities.forEach((entity: Group) => {
      if (entity.id == id) {
        this.entityToShow = entity;
      }
    });

  }

  showEntityDetail(id: number) {
    this.consultOnly = true;
    console.info(id);
    this.loadEntityById(id);
  }

  modifyEntityInfo(id: number) {
    this.consultOnly = false;
    this.loadEntityById(id);
  }

  resetSubmitFlag() {
    this.groupService.resetSubmitFlag();
  }

  getEntities(event) {
    this.loadEntityListPage(this.groupService.get$(parseInt(event.target.innerText), this.criterias));
  }

  getPageLot(forNext: boolean) {
    this.loadEntityListPage(this.groupService.get$(this.sharedService.getPageNumByChangePageLot(this.pageNav, forNext), this.criterias));
  }

}
