import { Pipe, PipeTransform } from '@angular/core';
import {Users} from '../common/users.interface';

@Pipe({
  name: 'searchPipe'
})
export class CustomEmailFilterPipe implements PipeTransform {

  transform(value, key: string, term: string) {
    return value.filter((item) => {
      if (item.hasOwnProperty(key)) {
        if (term) {
          let regExp = new RegExp('\\b' + term, 'gi');
          return regExp.test(item[key]);
        } else {
          return true;
        }
      } else {
        return false;
      }
    });
  }

}
