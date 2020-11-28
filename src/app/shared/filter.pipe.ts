import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
}) 
export class FilterPipe implements PipeTransform {

  transform(users: any[], criteria: string): any[] {
    if (!users) {
      return [];
    }
    if (!criteria) {
      return users;
    }
    return users.filter(user => {
      return user.name.toLowerCase().includes(criteria.toLowerCase());
    });
  }

}
