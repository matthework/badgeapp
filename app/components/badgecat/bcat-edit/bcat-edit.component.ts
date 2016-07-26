import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

import {BadgeCat,BGroup} from '../bcat';
import {BCatService} from '../bcat.service';
import {Badge} from '../../badge/badge';
import {BadgeService} from '../../badge/badge.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'my-badgecat-edit',
  templateUrl: 'app/components/badgecat/bcat-edit/bcat-edit.component.html',
  styleUrls: ['app/components/badgecat/bcat-edit/bcat-edit.component.css']
})

export class BCatEditComponent implements OnInit {

  badgecat: BadgeCat;
  badges: Badge[] = [];
  active = false;
  newBadge = "";
  newLevels = [];
  newBG = {badge: "", levels: []};
  sub: any;
  id: string;

  constructor(
    private _bcatService: BCatService,
    private _badgeService: BadgeService,
    private _router: Router,
    private route: ActivatedRoute,
    private auth: AuthService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getBadgeCat();
    this.getBadges();
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }

  getBadgeCat() {
    console.log('id from _routeParams: ', this.id); 
    this._bcatService.getBadgeCat(this.id).subscribe(badgecat => {this.badgecat = badgecat});
  }

  getBadges() {
    this._badgeService.getBadges().subscribe(badges => { this.badges = badges});
  }

  toBadgeCats() {
    this._router.navigate(['/badgecat']);
  }

  updateBadgeCat() {
    this.badgecat.bgroups.sort(this.toCompare);
    for (var i = 0; i < this.badgecat.bgroups.length; i++) { 
      this.badgecat.bgroups[i].levels.sort();
    }
    let value = JSON.stringify(this.badgecat)
    this._bcatService.updateBadgeCat(this.id,value).subscribe();
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
  
  addBadgeCat() {
    this._router.navigate(['/bcat/new']);
  }

  removeBadgeCat() {
    this._bcatService.deleteBadgeCat(this.id).subscribe();
    this.toBadgeCats();
  }

  deleteBadgeCatPop() {
    var name = this.badgecat.name
    var r = confirm("Are you sure you want to delete Badge Category: " + name.toUpperCase() +" ?");
    if (r == true) {
      this.removeBadgeCat();
    }
  }

  deleteBGroupPop(bg: BGroup) {
    var name = this.badgecat.name.toUpperCase()
    var badge = bg.badge.toUpperCase()
    var r = confirm("Are you sure you want to delete "+ badge + " from " + name +" ?");
    if (r == true) {
        this.removeBGroup(bg);
    }
  }

  removeBGroup(bg: BGroup) {
    let index = this.badgecat.bgroups.indexOf(bg);
    this.badgecat.bgroups.splice(index,1);
    let value = JSON.stringify(this.badgecat)
    console.log('you submitted value: ', value);
  }

  getBadgesOptions() {
    var badgesOptions = [];
    if (this.badges != null) {
      for (var i = 0; i < this.badges.length; i++) { 
        badgesOptions.push(this.badges[i].name);
      }
    }
    // console.log('getBadgesOptions: ', badgesOptions);
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
    // console.log('getBadgesOptions: ', badgesOptions);
    return levelsOptions.sort();
  }

  addLevel(bg:BGroup, level:number) {
    level = +level;
    bg.levels.push(level);
  }

  deleteLevel(bg:BGroup, level:number) {
    let index = bg.levels.indexOf(level);
    bg.levels.splice(index,1);
  }

  deleteLevelPop(bg:BGroup, level:number) {
    var name = bg.badge;
    var r = confirm("Are you sure you want to delete Badge: " + name.toUpperCase() + " Level: "+ level +" ?");
    if (r == true) {
      this.deleteLevel(bg, level);
    }
  }

  addNewLevel(badge:string, level:number) {
    level = +level;
    this.newBG.badge = badge;
    this.newBG.levels.push(level);
  }

  deleteNewLevel(level:number) {
    let index = this.newBG.levels.indexOf(level);
    this.newBG.levels.splice(index,1);
  }

  addBGroup() {
    if (this.newBG.levels.length != 0) {
      this.badgecat.bgroups.push(this.newBG);
    }
    this.newBG = {badge: "", levels: []};
  }

  goBack() {
    window.history.back();
  }

}


