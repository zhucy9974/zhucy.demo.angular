import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnderConstructionComponent } from './under-construction.component';



@NgModule({
  declarations: [UnderConstructionComponent],
  exports:[UnderConstructionComponent],
  imports: [
    CommonModule
  ]
})
export class UnderConstructionModule { }
