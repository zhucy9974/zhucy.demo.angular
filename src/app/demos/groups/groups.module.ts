import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import { UnderConstructionModule } from 'src/app/shared/under-construction/under-construction.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [GroupsComponent, SearchComponent],
  exports: [GroupsComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class GroupsModule { }
