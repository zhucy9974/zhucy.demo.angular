import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutWebsiteComponent } from './about-website.component';



@NgModule({
  declarations: [AboutWebsiteComponent],
  exports: [
    AboutWebsiteComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AboutWebsiteModule { }
