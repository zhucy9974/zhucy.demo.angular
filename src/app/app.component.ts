import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-project';
  fullname = 'Chongyang3';
  criteriasearch:string;
  condition = true;
  dataObj = new Date();
  users: any[] = [
    {name: 'Eva', age: 45},
    {name: 'Aude', age: 33},
    {name: 'Anne', age: 17},
    {name: 'Marc', age: 4},
  ];

  constructor(translate: TranslateService){
    //translate.addLangs(['en_US', 'fr_FR','zh_CN']);
    translate.setDefaultLang("en");
    translate.use("en");
  }
}
