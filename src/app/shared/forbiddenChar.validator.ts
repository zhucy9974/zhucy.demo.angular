import {FormControl} from "@angular/forms";

export class ForbiddenCharValidator{
  char:string;
  constructor(char:string) {
    this.char = char;
  }

  validator(input:FormControl){
    return input.value.include(this.char)?{invalidChar:true}:null;
  }
}
