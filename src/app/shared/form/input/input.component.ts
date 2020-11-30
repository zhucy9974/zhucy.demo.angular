import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'custom-form-input',
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

  inputValue: string;

  @Output() inputValueChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  sendInputValue(){
    console.info(this.inputValue);
    this.inputValueChanged.emit({key:this.fieldName,value:this.inputValue});
    console.info(22);
  }

}
