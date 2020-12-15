import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemosComponent } from './demos.component';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { RolesModule } from './roles/roles.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [DemosComponent],
  exports: [DemosComponent],
  imports: [
    CommonModule,
    UsersModule,
    GroupsModule,
    RolesModule,
    SharedModule
  ]
})
export class DemosModule { }
