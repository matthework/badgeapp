import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {BadgeSet,BadgeGroup} from '../bs';
import {BSService} from '../bs.service';
import {Badge} from '../../badge/badge';
import {Tier} from '../../tier/tier';
import {BadgeService} from '../../badge/badge.service';
import {TierService} from '../../tier/tier.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'my-badgeset-new',
  templateUrl: 'app/components/badgeset/bs-new/bs-new.component.html',
  styleUrls: ['app/components/badgeset/bs-new/bs-new.component.css']
})

export class BSNewComponent{
  
  badges: Badge[] = [];
  tiers: Tier[] = [];
  active = false;
  gmap = {"A":0, "B":1, "C":2, "D":3, "E":4, "F":5};
  gradesOptions =["A", "B", "C", "D", "E", "F"]; 
  nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  prerequisite = false;
  numBadges = 0;
  coreBadge: BadgeGroup;
  newcbs: BadgeGroup[] = [];
  total =0;
  newTag = "";

  newBGs = [{badge: "", level: 0},
            {badge: "", level: 0},
            {badge: "", level: 0},
            {badge: "", level: 0},
            {badge: "", level: 0},
            {badge: "", level: 0},
            {badge: "", level: 0},
            {badge: "", level: 0},
            {badge: "", level: 0},
            {badge: "", level: 0}];

  newBS = {index: 0, name: "", badgegroups: this.newBGs, tier: 0, grade: "", pay: 0, tags: [], numbadges: this.numBadges, corebadges: this.newcbs, approved: false, inused:false, others:[]}

  constructor(
    private _bsService: BSService, 
    private _badgeService: BadgeService,
    private _tierService: TierService,
    private _router: Router,
    private auth: AuthService) {}

  ngOnInit() {
    this.getBadges();
    this.getTiers();
  }

  getBadges() {
    this._badgeService.getBadges().subscribe(badges => { this.badges = badges});
  }

  getTiers() {
    this._tierService.getTiers().subscribe(tiers => { this.tiers = tiers});
  }

  addBadgeSet() {
    // var arr = this.newBS.badgegroups.filter(this.checkEmpty);
    // this.newBS.badgegroups = arr; //this.newBS.badgegroups.filter(this.checkEmpty);
    this.total = 0;
    this.newBS.tier = +this.newBS.tier;
    for (var i = 0; i < this.newBS.badgegroups.length; i++) { 
      if (this.newBS.badgegroups[i].level != 0) {
        this.newBS.badgegroups[i].level = +this.newBS.badgegroups[i].level;
      }
      if (this.newBS.badgegroups[i].badge != "" && this.newBS.badgegroups[i].level != 0){
        this.total += 1;
      }
    }
    this.newBS.numbadges = Math.round(this.total/2);
    console.log('you submitted total: ', this.total); 

    this.newBS.badgegroups.sort(this.toCompare);
    this.newBS.corebadges.sort(this.toCompare);
    let value = JSON.stringify(this.newBS)
    this._bsService.addBadgeSet(value).subscribe();
    console.log('you submitted value: ', value); 
    this.toBadgeSets();
  }

  toCompare(a,b) {
    if (a.badge < b.badge)
      return -1;
    else if (a.badge > b.badge)
      return 1;
    else 
      return 0;
  }

  toBadgeSets() {
    this._router.navigate(['/badgeset']);
    // location.reload();
  }

  goBack() {
    window.history.back();
  }

  getPay(t:number, g:string) {
    var pay = 0;
    if (this.tiers != null && t != 0 && g != "") {
      for (var i = 0; i < this.tiers.length; i++) { 
        if (this.tiers[i].tier == t) {
          pay = this.tiers[i].grades[this.gmap[g]];
        }
      }
    }
    return pay;
  }

  getDesc(b:string, l:number) {
    var desc = "";
    if (this.badges != null && l > 0 && b != "") {
      for (var i = 0; i < this.badges.length; i++) { 
        if (this.badges[i].name == b) {
          for (var j = 0; j < this.badges[i].badgelevels.length; j++) { 
            if (this.badges[i].badgelevels[j].level == l) {
              desc = this.badges[i].badgelevels[j].desc;
            }
          }
        }
      }
    }
    return desc;
  }

  getBadgesOptions() {
    var badgesOptions = [];
    if (this.badges != null) {
      for (var i = 0; i < this.badges.length; i++) { 
        if (this.badges[i].inused) {
          badgesOptions.push(this.badges[i].name);
        }
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

  getTiersOptions() {
    var tiersOptions = [];
    if (this.tiers != null) {
      for (var i = 0; i < this.tiers.length; i++) { 
        tiersOptions.push(this.tiers[i].tier);
      }
    }
    return tiersOptions.sort();
  }

  getTotalBadges(bgs:BadgeGroup[]) {
    this.total = 0;
    if (bgs != null) {
      for (var i = 0; i < bgs.length; i++) { 
        if (bgs[i].badge != "" && bgs[i].level != 0) {
          this.total += 1;
        }
      }
    }
    // if (this.total == 1) {
    //   this.numBadges = 1;
    // }else{

    // }
    this.numBadges = Math.round(this.total/2);
    
    return this.total;
  }

  getCoreBadgesOptions(bgs:BadgeGroup[]) {
    var corebadgesOptions = [];
    if (bgs != null) {
      for (var i = 0; i < bgs.length; i++) { 
        if (bgs[i].badge != "" && bgs[i].level != 0) {
          corebadgesOptions.push(bgs[i].badge + " - " + bgs[i].level);
        }
      }
    }
    return corebadgesOptions.sort();
  }

  addCoreBadge(cb:BadgeGroup) {
    var array = cb.toString().split(' - ');
    console.log('you submitted cb value: ', array); 
    var b = array[0];
    var l = +array[1]; // parse into number
    this.newBS.corebadges.push({badge: b, level: l});
  }

  deleteCoreBadgePop(corebadge:BadgeGroup) {
    var name = this.newBS.name.toUpperCase()
    var cbadge = (corebadge.badge + " " + corebadge.level).toUpperCase()
    var r = confirm("Are you sure you want to delete CORE BADGE "+ cbadge + " from " + name +" ?");
    if (r == true) {
      this.removeCoreBadge(corebadge);
    }
  }

  removeCoreBadge(selectedCoreBadge:BadgeGroup) {
    let index = this.newBS.corebadges.indexOf(selectedCoreBadge);
    this.newBS.corebadges.splice(index,1);
  }

  addNumBadges() {
    // this.newBS.numbadges = this.numBadges;
     console.log('you submitted this.numBadges: ', this.numBadges); 
  }

  addTag(tag:string) {
    this.newBS.tags.push(tag.toUpperCase());
  }

  deleteTag(tag:string) {
    let index = this.newBS.tags.indexOf(tag);
    this.newBS.tags.splice(index,1);
  }
  
}


