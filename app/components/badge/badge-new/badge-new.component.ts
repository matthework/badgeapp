import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Badge} from '../badge';
import {BadgeService} from '../badge.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'my-badge-new',
  templateUrl: 'app/components/badge/badge-new/badge-new.component.html',
  styleUrls: ['app/components/badge/badge-new/badge-new.component.css']
})

export class BadgeNewComponent {

  newbls = [
            {level: 1, desc:""},
            {level: 2, desc:""},
            {level: 3, desc:""},
            {level: 4, desc:""},
            {level: 5, desc:""},
            {level: 6, desc:""},
            {level: 7, desc:""},
            {level: 8, desc:""},
            {level: 9, desc:""}];

  statusOptions = ['Accepted','Draft','NotUsed'];

  newBadge = {index: 0, name: "", code: "", overview: "", status: "Accepted", badgelevels: this.newbls, approved: true, inused: true};

  constructor(
    private _badgeService: BadgeService, 
    private _router: Router,
    private auth: AuthService) {}

  addBadge() {
    this.newBadge.code = this.newBadge.code.toUpperCase();
    let value = JSON.stringify(this.newBadge);
    this._badgeService.addBadge(value).subscribe();
    console.log('you submitted value: ', value); 
    this.toBadges();
  }

  toBadges() {
    this._router.navigate(['/badges']);
    location.reload();
  }
  
  goBack() {
    window.history.back();
  }
  
}



