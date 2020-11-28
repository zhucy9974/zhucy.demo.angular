import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import {SharedModule} from "../shared/shared.module";
import {NavbarModule} from "../navbar/navbar.module"
import { SearchComponent } from '../navbar/search/search.component';
import { SearchModule } from '../navbar/search/search.module';
import { FormsModule } from '@angular/forms';
import { UserPageComponent } from './user-page/user-page.component';



@NgModule({
    declarations: [UsersComponent, UserPageComponent],
    exports: [
        UsersComponent
    ],
    imports: [
      CommonModule,
      SharedModule,
      NavbarModule,
      SearchModule,
      FormsModule
    ]
})
export class UsersModule { }
