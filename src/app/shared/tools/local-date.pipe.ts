import { PipeTransform, Pipe, OnInit } from '@angular/core';
import { Session } from 'protractor';
import { TranslateService } from '@ngx-translate/core';
import { formatDate, getLocaleId, getLocaleDateFormat } from '@angular/common';
import { SharedService } from '../shared.service';

@Pipe({ name: 'localDate' })
export class LocalDatePipe implements PipeTransform,OnInit {

    //private locale:string = 'en';

    constructor(private translateService: TranslateService, private sharedService:SharedService) {
        
    }
    ngOnInit(): void {
        //this.sharedService.getLocaleChanged().subscribe(locale=>this.locale = locale);
    }

    transform(value: string, format: string, locale:string) {
        //const local: string = this.translateService.getDefaultLang();
        console.info(locale);
        return formatDate(value, format, locale);
    }

}