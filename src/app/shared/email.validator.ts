import {FormControl} from "@angular/forms";


export function emailValidator(param:string) {
  return function emailValidator(input:FormControl){
    return input.value.includes(param)?{invalidChar:true}:null;
  }
}



/*
export function emailValidator(input:FormControl) {
  return input.value.includes('#')?{invalidChar:true}:null;
}*/
