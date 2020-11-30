import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UsersModule} from "./users/users.module";
import {NavbarModule} from "./navbar/navbar.module";

import {LOCALE_ID, NgModule} from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from "@angular/common";
import {LoginModule} from "./login/login.module";
import { Page404Component } from './page404/page404.component';
import {RouterModule} from "@angular/router";
import { WelcomeComponent } from './welcome/welcome.component';
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader"
import { HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//registerLocaleData(localeFr, 'fr-FR');


@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsersModule,
    NavbarModule,
    LoginModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    /*{provide:LOCALE_ID, useValue: 'fr-FR'}*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
