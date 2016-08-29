import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

import {BadgeSet,BadgeGroup} from '../bs';
import {BSService} from '../bs.service';
import {Badge} from '../../badge/badge';
import {Tier} from '../../tier/tier';
import {BadgeService} from '../../badge/badge.service';
import {TierService} from '../../tier/tier.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'my-badgeset-edit',
  templateUrl: 'app/components/badgeset/bs-edit/bs-edit.component.html',
  styleUrls: ['app/components/badgeset/bs-edit/bs-edit.component.css']
})

export class BSEditComponent implements OnInit {

  badgeset: BadgeSet;
  badges: Badge[] = [];
  tiers: Tier[] = [];
  active = false;
  newBadge = "";
  newLevel = 0;
  gmap = {"A":0, "B":1, "C":2, "D":3, "E":4, "F":5};
  gradesOptions =["A", "B", "C", "D", "E", "F"]; 
  prerequisite = false;
  coreBadge: BadgeGroup;
  total =0;
  sub: any;
  id: string;
  statusOptions = ['Accepted','Draft','NotUsed'];

  constructor(
    private _bsService: BSService,
    private _badgeService: BadgeService,
    private _tierService: TierService,
    private _router: Router,
    private route: ActivatedRoute,
    private auth: AuthService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getBadgeSet();
    this.getBadges();
    this.getTiers();
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }

  getBadgeSet() {
    console.log('id from _routeParams: ', this.id); 
    this._bsService.getBadgeSet(this.id).subscribe(badgeset => {this.badgeset = badgeset});
  }

  getBadges() {
    this._badgeService.getBadges().subscribe(badges => { this.badges = badges});
  }

  getTiers() {
    this._tierService.getTiers().subscribe(tiers => { this.tiers = tiers});
  }

  toBadgeSets() {
    this._router.navigate(['/badgeset']);
    location.reload();
  }

  updateBadgeSet() {
    this.total = 0;
    // pasrse string into number
    this.badgeset.tier = +this.badgeset.tier;
    for (var i = 0; i < this.badgeset.badgegroups.length; i++) { 
      this.badgeset.badgegroups[i].level = +this.badgeset.badgegroups[i].level;
      if (this.badgeset.badgegroups[i].badge != "" && this.badgeset.badgegroups[i].level != 0){
        this.total += 1;
      }
    }
    this.badgeset.pay = +this.getPay(this.badgeset.tier, this.badgeset.grade)
    console.log('you submitted total: ', this.total); 
    this.badgeset.badgegroups.sort(this.toCompare);
    this.badgeset.corebadges.sort(this.toCompare);
    let value = JSON.stringify(this.badgeset)
    this._bsService.updateBadgeSet(this.id,value).subscribe();
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
  
  addBadgeSet() {
    this._router.navigate(['/bs/new']);
  }

  addBadgeGroup() {
    // pasrse string into number
    // this.badgeset.tier = +this.badgeset.tier;
    // for (var i = 0; i < this.badgeset.badgegroups.length; i++) { 
    //   this.badgeset.badgegroups[i].level = +this.badgeset.badgegroups[i].level;
    // }
    this.newLevel = +this.newLevel;
    this.badgeset.badgegroups.push({badge: this.newBadge, level: this.newLevel});
    // this.badgeset.badgegroups.sort(this.toCompare);
    // this.badgeset.corebadges.sort(this.toCompare);
    let value = JSON.stringify(this.badgeset)
    // this._bsService.updateBadgeSet(id,value).subscribe();
    console.log('you submitted value: ', value);
    this.newBadge = "";
    this.newLevel = 0;
  }

  removeBadgeSet() {
    this._bsService.deleteBadgeSet(this.id).subscribe();
    this.toBadgeSets();
  }

  deleteBadgeSetPop() {
    var name = this.badgeset.name
    var r = confirm("Are you sure you want to delete BadgeSet: " + name.toUpperCase() +" ?");
    if (r == true) {
      this.removeBadgeSet();
    }
  }

  deleteBadgeGroupPop(selectedGroup: BadgeGroup) {
    var isCore =false;
    for (var i = 0; i < this.badgeset.corebadges.length; i++) { 
      if (this.badgeset.corebadges[i].badge == selectedGroup.badge) {
        isCore = true;
      }
    }
    if (isCore) {
      var s = confirm("WARNING: PLEASE REMOVE THIS BADGE FROM COREBADGE BEFORE DELETE IT!")
    }else{
      var name = this.badgeset.name.toUpperCase()
      var badge = selectedGroup.badge.toUpperCase()
      var r = confirm("Are you sure you want to delete "+ badge + " from " + name +" ?");
      if (r == true) {
          this.removeBadgeGroup(selectedGroup);
      }
    }
  }

  removeBadgeGroup(selectedGroup: BadgeGroup) {
    let index = this.badgeset.badgegroups.indexOf(selectedGroup);
    this.badgeset.badgegroups.splice(index,1);
    let value = JSON.stringify(this.badgeset)
    // this._bsService.updateBadgeSet(id,value).subscribe();
    console.log('you submitted value: ', value);
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
        if (this.badges[i].status=='Accepted') {
          badgesOptions.push(this.badges[i].name);
        }
      }
    }
    // console.log('getBadgesOptions: ', badgesOptions);
    return badgesOptions.sort();
  }

  getNewBadgesOptions() {
      var badgesOptions = [];
      var currentBGs = [];
      if (this.badgeset.badgegroups != null) {
          for (var j = 0; j < this.badgeset.badgegroups.length; j++) { 
              currentBGs.push(this.badgeset.badgegroups[j].badge);
          }
      }
      if (this.badges != null) {
          for (var i = 0; i < this.badges.length; i++) { 
              let index = currentBGs.indexOf(this.badges[i].name);
              if (this.badges[i].status=='Accepted' && index == -1) {
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
    // console.log('getBadgesOptions: ', badgesOptions);
    return levelsOptions.sort();
  }

  getTiersOptions() {
    var tiersOptions =[];
    if (this.tiers != null) {
      for (var i = 0; i < this.tiers.length; i++) { 
        tiersOptions.push(this.tiers[i].tier);
      }
    }
    tiersOptions.push(0);
    // console.log('getTiersOptions: ', tiersOptions);
    return tiersOptions.sort();
  }

  // updateNumBadges(num:number) {
  //   this.badgeset.numbadges = Math.round(num/2);
  // }

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

  deleteCoreBadgePop(corebadge:BadgeGroup) {
    var name = this.badgeset.name.toUpperCase()
    var cbadge = (corebadge.badge + " " + corebadge.level).toUpperCase()
    var r = confirm("Are you sure you want to delete CORE BADGE "+ cbadge + " from " + name +" ?");
    if (r == true) {
      this.removeCoreBadge(corebadge);
    }
  }

  removeCoreBadge(selectedCoreBadge:BadgeGroup) {
    let index = this.badgeset.corebadges.indexOf(selectedCoreBadge);
    this.badgeset.corebadges.splice(index,1);
  }

  addCoreBadge(cb:BadgeGroup) {
    var array = cb.toString().split(' - ');
    console.log('you submitted cb value: ', array); 
    var b = array[0];
    var l = +array[1]; // parse into number
    this.badgeset.corebadges.push({badge: b, level: l});
  }

  addTag(tag:string) {
    this.badgeset.tags.push(tag.toUpperCase());
  }

  deleteTag(tag:string) {
    let index = this.badgeset.tags.indexOf(tag);
    this.badgeset.tags.splice(index,1);
  }

  goBack() {
    window.history.back();
  }

}


