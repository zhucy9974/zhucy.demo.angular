import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { UsersComponent } from "./demos/users/users.component";
import { Page404Component } from "./page404/page404.component";
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutWebsiteComponent } from './about-website/about-website.component';
import { AboutMeComponent } from './about-me/about-me.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'users',
    component: UsersComponent
  }, {
    path: '',
    component: WelcomeComponent
  },{
    path: 'welcome',
    component: WelcomeComponent
  }, {
    path: 'aboutWebsite',
    component: AboutWebsiteComponent
  },{
    path: 'aboutMe',
    component: AboutMeComponent
  },
  {
    path: '**', //souvent on l'utilise pour 404
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
