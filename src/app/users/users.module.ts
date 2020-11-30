import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import {SharedModule} from "../shared/shared.module";
import {NavbarModule} from "../navbar/navbar.module"
import { SearchComponent } from '../navbar/search/search.component';
import { SearchModule } from '../navbar/search/search.module';
import { FormsModule } from '@angular/forms';
import { UserPageComponent } from './user-page/user-page.component';
import { InputComponent } from '../shared/form/input/input.component';
import { UserPageModule } from './user-page/user-page.module';



@NgModule({
    declarations: [UsersComponent],
    exports: [
        UsersComponent
    ],
    imports: [
      CommonModule,
      SharedModule,
      SearchModule,
      FormsModule,
      UserPageModule
    ]
})
export class UsersModule { }
