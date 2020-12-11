import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { UnderConstructionModule } from 'src/app/shared/under-construction/under-construction.module';



@NgModule({
  declarations: [RolesComponent],
  exports: [RolesComponent],
  imports: [
    CommonModule,
    UnderConstructionModule
  ]
})
export class RolesModule { }
