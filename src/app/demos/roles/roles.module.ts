import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';



@NgModule({
  declarations: [RolesComponent],
  exports: [RolesComponent],
  imports: [
    CommonModule
  ]
})
export class RolesModule { }
