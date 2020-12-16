import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupPageComponent } from './group-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputModule } from 'src/app/shared/form/input/input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [GroupPageComponent],
  exports:[GroupPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    InputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GroupPageModule { }
