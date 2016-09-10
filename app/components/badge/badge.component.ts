import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Badge} from './badge';
import {BadgeDetailComponent} from './badge-detail/badge-detail.component';
import {BadgeService} from './badge.service';

import {BadgeSet} from '../badgeset/bs';
import {BSService} from '../badgeset/bs.service';

import {Staff,UserBGroup} from '../staff/staff';
import {StaffService} from '../staff/staff.service';

import {AuthService} from '../auth/auth.service';

import {FilterArrayPipe} from '../pipe/filter-array-pipe';
import {YesNoPipe} from '../pipe/yes-no-pipe';

@Component({
    selector: 'my-badge',
    templateUrl: 'app/components/badge/badge.component.html',
    styleUrls: ['app/components/badge/badge.component.css'],
    directives: [BadgeDetailComponent],
    pipes: [FilterArrayPipe,YesNoPipe]
})

export class BadgeComponent implements OnInit {

  badges: Badge[] = [];
  badgesets: BadgeSet[] = [];
  staffs: Staff[] = [];
  selectedBadge: Badge;
  active = true;
  showBadges = false;

  constructor (
      private _router: Router,
      private _badgeService: BadgeService,
      private _bsService: BSService,
      private _staffService: StaffService,
      private auth: AuthService) {}

  ngOnInit() {
    this.getStaffs();
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

  getStaffs() {
    this._staffService.getStaffs().subscribe(staffs => { this.staffs = staffs});
  }

  onSelect(badge: Badge) { 
    this.selectedBadge = badge;
  }

  toDetail() {
    this._router.navigate(['/badge/detail', this.selectedBadge._id]);
  }

  addBadge() {
    this._router.navigate(['/badge/new']);
  }

  removeBadge(id:string) {
    // let id = this.selectedBadge._id;
    this._badgeService.deleteBadge(id).subscribe();
    this.removeBadgeFromBS(id);
    this.removeBadgeFromPerson(id);
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

  removeBadgeFromBS(bid: string) {
    if (this.badgesets != null) {
      for (var i = 0; i < this.badgesets.length; i++) { 
        var indexArray = [];
        for (var j = 0; j < this.badgesets[i].badgegroups.length; j++) { 
          if (this.badgesets[i].badgegroups[j].bid == bid) {
            let index = this.badgesets[i].badgegroups.indexOf(this.badgesets[i].badgegroups[j]);
            indexArray.push(index);
            
          }
        }
        for (var k = indexArray.length -1; k >= 0; k--) {
          this.badgesets[i].badgegroups.splice(indexArray[k],1);
        }
        let value = JSON.stringify(this.badgesets[i]);
        this._bsService.updateBadgeSet(this.badgesets[i]._id,value).subscribe();
        // console.log('you submitted value: ', value);
      }
    }
  }

  removeBadgeFromPerson(bid: string) {
    if (this.staffs != null) {
      for (var i = 0; i < this.staffs.length; i++) { 
        var indexArray = [];
        for (var j = 0; j < this.staffs[i].userbgroups.length; j++) { 
          if (this.staffs[i].userbgroups[j].bid == bid) {
            let index = this.staffs[i].userbgroups.indexOf(this.staffs[i].userbgroups[j]);
            indexArray.push(index);
            
          }
        }
        for (var k = indexArray.length -1; k >= 0; k--) {
          this.staffs[i].userbgroups.splice(indexArray[k],1);
        }
        let value = JSON.stringify(this.staffs[i]);
        this._staffService.updateStaff(this.staffs[i]._id,value).subscribe();
        // console.log('you submitted value: ', value);
      }
    }
  }
}



