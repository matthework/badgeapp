import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Badge} from './badge';
import {BadgeDetailComponent} from './badge-detail/badge-detail.component';
import {BadgeEditComponent} from './badge-edit/badge-edit.component';
import {BadgeService} from './badge.service';

import {BadgeSet} from '../badgeset/bs';
import {BSService} from '../badgeset/bs.service';

import {AuthService} from '../auth/auth.service';

import {FilterArrayPipe} from '../pipe/filter-array-pipe';
import {YesNoPipe} from '../pipe/yes-no-pipe';

@Component({
    selector: 'my-badge',
    templateUrl: 'app/components/badge/badge.component.html',
    styleUrls: ['app/components/badge/badge.component.css'],
    directives: [BadgeDetailComponent,BadgeEditComponent],
    pipes: [FilterArrayPipe,YesNoPipe]
})

export class BadgeComponent implements OnInit {

  badges: Badge[] = [];
  badgesets: BadgeSet[] = [];
  selectedBadge: Badge;
  active = true;
  showBadges = false;
  showBCat = false;

  constructor (
      private _router: Router,
      private _badgeService: BadgeService,
      private _bsService: BSService,
      private auth: AuthService) {}

  ngOnInit() {
    this.getBadges();
    this.getBadgeSets();
  }

  getBadges() {
    this._badgeService.getBadges().subscribe(badges => { this.badges = badges});
  }

  getBadgeSets() {
    this._bsService.getBadgeSets().subscribe(badgesets => { this.badgesets = badgesets});
    if (this.badgesets == null) {
      this.active = true;
    }
  }

  onSelect(badge: Badge) { 
    this.selectedBadge = badge;
  }

  toDetail() {
    this._router.navigate(['/badge/detail', this.selectedBadge._id]);
  }

  toEdit(bid:string) {
    this._router.navigate(['/badge/edit', bid]);
  }

  addBadge() {
    this._router.navigate(['/badge/new']);
  }

  removeBadge(id:string) {
    // let id = this.selectedBadge._id;
    this._badgeService.deleteBadge(id).subscribe();
    this.removeBadgeFromBS(id);
    location.reload();
  }

  deleteBadgePop(id:string) {
    var r = confirm("Are you sure you want to delete this Badge ?");
    if (r == true) {
      this.removeBadge(id);
    }
  }

  toBadges() {
    this._router.navigate(['/badges']);
    location.reload();
  }

  showBadgeCat() {
    this.showBCat = true;
    this._router.navigate(['/badgecat']);
  }

  removeBadgeFromBS(bid: string) {
    if (this.badgesets != null) {
      for (var i = 0; i < this.badgesets.length; i++) { 
        for (var j = 0; j < this.badgesets[i].badgegroups.length; j++) { 
          if (this.badgesets[i].badgegroups[j].bid == bid) {
            let index = this.badgesets[i].badgegroups.indexOf(this.badgesets[i].badgegroups[j]);
            this.badgesets[i].badgegroups.splice(index,1);
          }
        }
        let value = JSON.stringify(this.badgesets[i])
        this._bsService.updateBadgeSet(this.badgesets[i]._id,value).subscribe();
        console.log('you submitted value: ', value);
      }
    }
  }

}



