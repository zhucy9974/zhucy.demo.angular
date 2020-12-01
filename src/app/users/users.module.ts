import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import {SharedModule} from "../shared/shared.module";
import { SearchModule } from './search/search.module';
import { FormsModule } from '@angular/forms';
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
