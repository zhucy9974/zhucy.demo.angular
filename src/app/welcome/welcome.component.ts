import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private translateService:TranslateService) { }

  ngOnInit(): void {
  }

  changeLanguage(language:string){
    this.translateService.use(language);
  }

}
