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
  
  newTag = "";

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

  newBadge = {index: 0, name: "", code: "", overview: "", badgelevels: this.newbls, tags: [], approved: false, inused: false};

  constructor(
    private _badgeService: BadgeService, 
    private _router: Router,
    private _routeParams: RouteParams) {}

  addBadge() {
    // this.newBadge.badgelevels = this.newBadge.badgelevels.filter(this.checkEmpty);
    this.newBadge.code = this.newBadge.code.toUpperCase();
    let value = JSON.stringify(this.newBadge);
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

  addTag(tag:string) {
    this.newBadge.tags.push(tag.toUpperCase());
  }

  deleteTag(tag:string) {
    let index = this.newBadge.tags.indexOf(tag);
    this.newBadge.tags.splice(index,1);
  }
  
  goBack() {
    window.history.back();
  }
  
}



