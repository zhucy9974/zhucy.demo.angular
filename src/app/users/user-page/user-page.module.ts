import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [UserPageComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UserPageModule { }
