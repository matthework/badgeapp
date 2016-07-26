import {Pipe} from '@angular/core';

// # Filter Array of Objects
@Pipe({ name: 'filter' })
export class FilterArrayPipe {
  transform(value, args) {
      if (!args) {
        return value;
      } else if (value) {
        return value.filter(item => {
          for (let key in item) {
            if ((typeof item[key] === 'string' || item[key] instanceof String) && 
                ((item[key].toLowerCase()).indexOf(args[0].toLowerCase()) !== -1)) {
              return true;
            }
          }
        });
      }
  }
}