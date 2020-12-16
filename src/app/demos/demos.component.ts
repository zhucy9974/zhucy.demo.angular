import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar/navbar.service';

@Component({
  selector: 'app-demos',
  templateUrl: './demos.component.html',
  styleUrls: ['./demos.component.scss']
})
export class DemosComponent implements OnInit {

  componentToShow: string = 'users';

  constructor(private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.navbarService.sendCurrentItem('demos');
  }

  changeComponentToShow(val: string) {
    this.componentToShow = val;
  }

  activeItem(event) {
    $('.demos-sider-bar a').each(function (index) {
      $(this).removeClass('text-primary');
      $(this).removeClass('text-secondary');
      //remove all the space for comparing
      if ($(this).text().replace(/\s/g, '') == event.target.innerText.replace(/\s/g, '')) {
        $(this).addClass('text-primary');
      } else {
        $(this).addClass('text-secondary');
      }
    });
  }

}
