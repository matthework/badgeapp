import {Component,OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Router} from 'angular2/router';
import {Badge,BadgeLevel} from '../badge';
import {BadgeService} from '../badge.service';
import {Validators,FormBuilder,ControlGroup,AbstractControl} from 'angular2/common';

@Component({
  selector: 'my-badge-edit',
  templateUrl: 'app/components/badge/badge-edit/badge-edit.component.html',
  styleUrls: ['app/components/badge/badge-edit/badge-edit.component.css']
})

export class BadgeEditComponent implements OnInit {

  // title: string = "Edit Badge";
  badge: Badge;
  active = false;
  newLevel = 0;
  newDesc = "";

  constructor(
    private _badgeService: BadgeService, 
    private _router: Router,
    private _routeParams: RouteParams) {}

  ngOnInit() {
    let id = this._routeParams.get('id');
    console.log('id from _routeParams: ', id); 
    this._badgeService.getBadge(id).subscribe((badge) => {this.badge = badge;});
  }

  toBadges() {
    this._router.navigate(['Badges']);
    // location.reload();
  }

  toBadgeDetail() {
    let id = this._routeParams.get('id');
    this._router.navigate(['BadgeDetail', { id: id }]);
    // location.reload();
  }

  updateBadge() {
    this.badge.code = this.badge.code.toUpperCase();
    let id = this._routeParams.get('id');
    let value = JSON.stringify(this.badge)
    this._badgeService.updateBadge(id,value).subscribe();
    console.log('you submitted value: ', value); 
    this.toBadgeDetail();
  }

  addBadge() {
    this._router.navigate(['BadgeNew']);
  }

  removeBadge() {
    let id = this._routeParams.get('id');
    this._badgeService.deleteBadge(id).subscribe();
    this.toBadges();
  }

  deleteBadgePop() {
    var name = this.badge.name
    var r = confirm("Are you sure you want to delete Badge: " + name.toUpperCase() +" ?");
    if (r == true) {
      this.removeBadge();
    }
  }

  addBadgeLevel() {
    this.badge.badgelevels.push({level: this.newLevel, desc: this.newDesc});
    this.badge.badgelevels.sort(this.toCompare);
    let id = this._routeParams.get('id');
    let value = JSON.stringify(this.badge)
    // this._badgeService.updateBadge(id,value).subscribe();
    console.log('you submitted value: ', value);
    this.newLevel = 0;
    this.newDesc = "";
  }

  toCompare(a,b) {
    if (a.level < b.level)
      return -1;
    else if (a.level > b.level)
      return 1;
    else 
      return 0;
  }

  removeBadgeLevel(selectedLevel: BadgeLevel) {
    let index = this.badge.badgelevels.indexOf(selectedLevel);
    this.badge.badgelevels.splice(index,1);
    let id = this._routeParams.get('id');
    let value = JSON.stringify(this.badge)
    // this._badgeService.updateBadge(id,value).subscribe();
    console.log('you submitted value: ', value);
  }

  deleteBadgeLevelPop(selectedLevel: BadgeLevel) {
    var name = this.badge.name
    var level = selectedLevel.level
    var r = confirm("Are you sure you want to delete "+ name.toUpperCase() + " Level " + level +" ?");
    if (r == true) {
      this.removeBadgeLevel(selectedLevel);
    }
  }

  addTag(tag:string) {
    this.badge.tags.push(tag.toUpperCase());
  }

  deleteTag(tag:string) {
    let index = this.badge.tags.indexOf(tag);
    this.badge.tags.splice(index,1);
  }

  goBack() {
    window.history.back();
  }

}


