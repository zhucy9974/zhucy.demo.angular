import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input()
  fieldName: string;
  @Input()
  propField: FormControl;
  @Input()
  submitted: boolean;
  @Input()
  consultOnly: boolean;
  @Input()
  placeholderStr: string;
  @Input()
  labelStr: string;
  @Input()
  withPrepend: boolean = false;

  inputValue: string;

  @Output() inputValueChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  sendInputValue() {
    this.sharedService.sendInputValueChanged({ key: this.fieldName, value: this.inputValue });
  }

}
