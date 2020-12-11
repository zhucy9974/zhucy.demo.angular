import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import { UnderConstructionModule } from 'src/app/shared/under-construction/under-construction.module';



@NgModule({
  declarations: [GroupsComponent],
  exports: [GroupsComponent],
  imports: [
    CommonModule,
    UnderConstructionModule
  ]
})
export class GroupsModule { }
