import {Pipe} from '@angular/core';

@Pipe({ name: 'approved_pending' })
export class ApprovedPipe {
  transform(value, args) {
    if (value) {
      return 'Approved';
    }
    return 'Pending';
  }
}