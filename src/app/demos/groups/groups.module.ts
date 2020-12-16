import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchModule } from './search/search.module';
import { GroupPageModule } from './group-page/group-page.module';

@NgModule({
  declarations: [GroupsComponent],
  exports: [GroupsComponent],
  imports: [
    CommonModule,
    SharedModule,
    SearchModule,
    GroupPageModule
  ]
})
export class GroupsModule { }
