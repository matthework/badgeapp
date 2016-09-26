import {Injectable,Pipe} from '@angular/core';

// Filter Array of Objects
@Injectable()
@Pipe({name:'filter'})
export class FilterArrayPipe {
  transform(value, args) {
    if (!args) {
      return value;
    } else if (value) {
      return value.filter(item => {
        for (let key of Object.keys(item)) {
          // console.log('you submitted value: ', key);
          if ((typeof item[key] === 'string' || item[key] instanceof String) && key != '_id' && key != 'timestamp' &&
            (item[key].toLowerCase().indexOf(args.toLowerCase()) !== -1)) {
            console.log('you submitted value: ', item[key]);
            return true;
          }else if ((typeof item[key] === 'number' || item[key] instanceof Number) &&
            (item[key].toString().indexOf(args) !== -1)) {
            console.log('you submitted value2: ', item[key]);
            return true;
          }
        }
      });
    }
  }
}

