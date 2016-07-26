import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {BadgeCat,BGroup} from '../bcat';
import {BCatService} from '../bcat.service';
import {Badge} from '../../badge/badge';
import {BadgeService} from '../../badge/badge.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'my-badgecat-new',
  templateUrl: 'app/components/badgecat/bcat-new/bcat-new.component.html',
  styleUrls: ['app/components/badgecat/bcat-new/bcat-new.component.css']
})

export class BCatNewComponent{
  
  badges: Badge[] = [];
  active = false;
  nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  newLevel = 0;

  newBGs = [{badge: "", levels: []},
            {badge: "", levels: []},
            {badge: "", levels: []},
            {badge: "", levels: []},
            {badge: "", levels: []},
            {badge: "", levels: []},
            {badge: "", levels: []},
            {badge: "", levels: []},
            {badge: "", levels: []},
            {badge: "", levels: []}];

  newBCat = {name: "", bgroups: this.newBGs, root:"", others:[]}

  constructor(
    private _bcatService: BCatService, 
    private _badgeService: BadgeService,
    private _router: Router,
    private auth: AuthService) {}

  ngOnInit() {
    this.getBadges();
  }

  getBadges() {
    this._badgeService.getBadges().subscribe(badges => { this.badges = badges});
  }

  addBadgeCat() {
    this.newBCat.bgroups.sort(this.toCompare);
    for (var i = 0; i < this.newBCat.bgroups.length; i++) { 
      this.newBCat.bgroups[i].levels.sort();
    }
    let value = JSON.stringify(this.newBCat)
    this._bcatService.addBadgeCat(value).subscribe();
    console.log('you submitted value: ', value); 
    this.toBadgeCats();
  }

  toCompare(a,b) {
    if (a.badge < b.badge)
      return -1;
    else if (a.badge > b.badge)
      return 1;
    else 
      return 0;
  }

  toBadgeCats() {
    this._router.navigate(['/badgecat']);
    // location.reload();
  }

  goBack() {
    window.history.back();
  }

  getBadgesOptions() {
    var badgesOptions = [];
    if (this.badges != null) {
      for (var i = 0; i < this.badges.length; i++) { 
        badgesOptions.push(this.badges[i].name);
      }
    }
    return badgesOptions.sort();
  }

  getLevelsOptions(bname: string) {
    var levelsOptions = [];
    if (this.badges != null) {
      for (var i = 0; i < this.badges.length; i++) { 
        if (this.badges[i].name == bname) {
          for (var j = 0; j < this.badges[i].badgelevels.length; j++) { 
            levelsOptions.push(this.badges[i].badgelevels[j].level);
          }
        }
      }
    }
    return levelsOptions.sort();
  }

  addLevel(i:number, level:number) {
    level = +level;
    this.newBCat.bgroups[i].levels.push(level);
  }

  deleteLevel(i:number, level:number) {
    let index = this.newBCat.bgroups[i].levels.indexOf(level);
    this.newBCat.bgroups[i].levels.splice(index,1);
  }
  
}


