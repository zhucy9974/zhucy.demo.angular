import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserPageComponent } from './user-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputComponent } from 'src/app/shared/form/input/input.component';
import { InputModule } from 'src/app/shared/form/input/input.module';



@NgModule({
  declarations: [UserPageComponent],
  exports: [UserPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    InputModule
  ]
})
export class UserPageModule { }
