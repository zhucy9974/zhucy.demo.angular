import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demos',
  templateUrl: './demos.component.html',
  styleUrls: ['./demos.component.scss']
})
export class DemosComponent implements OnInit {

  componentToShow: string = 'users';

  constructor() { }

  ngOnInit(): void {
  }

  changeComponentToShow(val: string) {
    this.componentToShow = val;
  }

  
  activeItem(event) {
    $('.user-sider-bar a').each(function (index) {
      $(this).removeClass('text-primary');
      $(this).removeClass('text-secondary');
      if ($(this).text() == event.target.innerText) {
        $(this).addClass('text-primary');
      } else {
        $(this).addClass('text-secondary');
      }
    });
  }

}
