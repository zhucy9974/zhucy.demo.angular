import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutWebsiteComponent } from './about-website.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AboutWebsiteComponent],
  exports: [
    AboutWebsiteComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AboutWebsiteModule { }
