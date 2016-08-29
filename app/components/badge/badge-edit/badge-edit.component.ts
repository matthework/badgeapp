import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

import {Badge,BadgeLevel} from '../badge';
import {BadgeService} from '../badge.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'my-badge-edit',
  templateUrl: 'app/components/badge/badge-edit/badge-edit.component.html',
  styleUrls: ['app/components/badge/badge-edit/badge-edit.component.css']
})

export class BadgeEditComponent implements OnInit {

  badge: Badge;
  active = false;
  newLevel = 0;
  newDesc = "";
  sub: any;
  id: string;
  statusOptions = ['Accepted','Draft','NotUsed'];

  constructor(
    private _badgeService: BadgeService, 
    private _router: Router,
    private route: ActivatedRoute,
    private auth: AuthService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        this.id = params['id'];
    });
    this.getBadge();
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }

  getBadge() {
    console.log('id from _routeParams: ', this.id); 
    this._badgeService.getBadge(this.id).subscribe((badge) => {this.badge = badge;});
  }

  toBadges() {
    this._router.navigate(['/badges']);
    location.reload();
  }

  toBadgeDetail() {
    this._router.navigate(['/badge/detail',this.id]);
    location.reload();
  }

  updateBadge() {
    this.badge.code = this.badge.code.toUpperCase();
    // if(!this.badge.approved) {
    //   this.badge.inused = false;
    // }
    let value = JSON.stringify(this.badge)
    this._badgeService.updateBadge(this.id,value).subscribe();
    console.log('you submitted value: ', value); 
    this.toBadges();
    // this.toBadgeDetail();
  }

  addBadge() {
    this._router.navigate(['/badge/new']);
  }

  removeBadge() {
    this._badgeService.deleteBadge(this.id).subscribe();
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
    let value = JSON.stringify(this.badge)
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
    let value = JSON.stringify(this.badge)
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

  goBack() {
    window.history.back();
  }

}


