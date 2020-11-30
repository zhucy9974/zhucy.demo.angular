import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import {HttpClientModule, HttpClient} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InputComponent } from './form/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/*
export function createTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/','.json');
}*/

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [FilterPipe],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide:TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [FilterPipe,
  RouterModule,
  TranslateModule,
  FormsModule,
ReactiveFormsModule]
})
export class SharedModule { 
  
}
