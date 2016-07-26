import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Badge} from './badge';
import {BadgeDetailComponent} from './badge-detail/badge-detail.component';
import {BadgeEditComponent} from './badge-edit/badge-edit.component';
import {BadgeService} from './badge.service';
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
  selectedBadge: Badge;
  active = false;
  showBadges = false;
  showBCat = false;

  constructor (
      private _router: Router,
      private _badgeService: BadgeService,
      private auth: AuthService) {}

  ngOnInit() {
    this.getBadges();
  }

  getBadges() {
    this._badgeService.getBadges().subscribe(badges => { this.badges = badges});
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

}



