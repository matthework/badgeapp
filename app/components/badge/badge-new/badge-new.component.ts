import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Router} from 'angular2/router';
import {Badge} from '../badge';
import {BadgeService} from '../badge.service';
import {Validators,FormBuilder,ControlGroup,AbstractControl,Control} from 'angular2/common';

@Component({
  selector: 'my-badge-new',
  templateUrl: 'app/components/badge/badge-new/badge-new.component.html',
  styleUrls: ['app/components/badge/badge-new/badge-new.component.css']
})

export class BadgeNewComponent {
  
  // title: string = "Add New Badge";

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

  newBadge = {index: 0, name: "", overview: "", badgelevels: this.newbls, approved: false, inused: false};

  constructor(
    private _badgeService: BadgeService, 
    private _router: Router,
    private _routeParams: RouteParams) {}

  addBadge() {
    // this.newBadge.badgelevels = this.newBadge.badgelevels.filter(this.checkEmpty);
    let value = JSON.stringify(this.newBadge)
    this._badgeService.addBadge(value).subscribe();
    console.log('you submitted value: ', value); 
    this.toBadges();
  }

  // checkEmpty(item) {
  //   if (item.desc != "") {
  //     return item;
  //   }
  // }

  toBadges() {
    this._router.navigate(['Badges']);
    // location.reload();
  }

  goBack() {
    window.history.back();
  }
  
}

