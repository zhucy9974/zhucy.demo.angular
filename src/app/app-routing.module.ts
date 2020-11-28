import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {UsersComponent} from "./users/users.component";
import {Page404Component} from "./page404/page404.component";
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  {path:'',
  component:LoginComponent},
  {
    path:'users',
    component:UsersComponent
  },{
    path:'welcome',
    component:WelcomeComponent
  },
  {
    path:'**', //souvent on l'utilise pour 404
    component:Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
