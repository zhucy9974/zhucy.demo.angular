import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from 'src/app/shared/form/input/input.module';



@NgModule({
  declarations: [UserPageComponent],
  exports: [UserPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    InputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserPageModule { }
