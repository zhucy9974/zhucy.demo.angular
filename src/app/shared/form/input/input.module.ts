import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { SharedModule } from '../../shared.module';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';



@NgModule({
  declarations: [InputComponent],
  exports: [InputComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InputModule { }
