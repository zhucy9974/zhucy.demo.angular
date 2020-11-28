import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  criteria: string;
  @Output() search: EventEmitter<string> = new EventEmitter();

  constructor(private sharedService:SharedService) { }

  ngOnInit(): void {
  }

  sendCriteria() {
    //console.info(this.criteria);
    this.sharedService.sendMessage(this.criteria);
  }

  public sendMessage(){
    //this.sharedService.sendMessage('test');
  }


}
