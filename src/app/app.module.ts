import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UsersModule} from "./demos/users/users.module";
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
import { AboutWebsiteComponent } from './about-website/about-website.component';
import { AboutWebsiteModule } from './about-website/about-website.module';
import { AboutMeComponent } from './about-me/about-me.component';
import { AboutMeModule } from './about-me/about-me.module';
import { WelcomeModule } from './welcome/welcome.module';
import { CookieService } from "ngx-cookie-service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemosComponent } from './demos/demos.component';
import { DemosModule } from './demos/demos.module';

//registerLocaleData(localeFr, 'fr-FR');


@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DemosModule,
    NavbarModule,
    LoginModule,
    NgbModule,
    AboutWebsiteModule,
    AboutMeModule,
    WelcomeModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
