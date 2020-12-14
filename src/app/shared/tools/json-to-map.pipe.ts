import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'jsonToMap'})
export class JsonToMapPipe implements PipeTransform {
  transform(json, args:string[]) : any {
    let keys = [];
    for (let key in json) {
      keys.push({key: key, value: json[key]});
    }
    return keys;
  }
}