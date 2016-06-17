import {Pipe} from 'angular2/core';

@Pipe({ name: 'yes_no' })
export class YesNoPipe {
  transform(value, args) {
    if (value) {
      return 'Yes';
    }
    return 'No';

  }
}