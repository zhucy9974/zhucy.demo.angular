import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewChecked(){
    const hMainDiv = document.documentElement.clientHeight;
    const hNavbar = parseInt($('#navbar_div').css('height'));
    $('#about_me_main_div').css('height',hMainDiv-hNavbar);
  }

}
