import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

import {BadgeSet,BadgeGroup} from '../bs';
import {BSService} from '../bs.service';
import {Badge} from '../../badge/badge';
import {BadgeService} from '../../badge/badge.service';
import {Tier} from '../../tier/tier';
import {TierService} from '../../tier/tier.service';
import {AuthService} from '../../auth/auth.service';

import {YesNoPipe} from '../../pipe/yes-no-pipe';

@Component({
  selector: 'my-badgeset-detail',
  templateUrl: 'app/components/badgeset/bs-detail/bs-detail.component.html',
  styleUrls: ['app/components/badgeset/bs-detail/bs-detail.component.css'],
  pipes: [YesNoPipe]
})

export class BSDetailComponent implements OnInit {

  badgesets: BadgeSet[];
  badgeset: BadgeSet;
  badges: Badge[] = [];
  tiers: Tier[] = [];
  active = false;
  gmap = {"A":0, "B":1, "C":2, "D":3, "E":4, "F":5};
  gradesOptions =["A", "B", "C", "D", "E", "F"]; 
  statusOptions = ['Accepted','Draft','NotUsed'];
  sub: any;
  id: string;
  newTag = "";
  more = false;
  edit = false;
  bsName = false;
  tg = false;
  tag = false;
  status =false;
  bedit =false;
  addNew = false;
  newBadge = "";
  newLevel = 0;
  newFocus = "";

  constructor(
    private _bsService: BSService,
    private _badgeService: BadgeService,
    private _tierService: TierService,
    private _router: Router,
    private route: ActivatedRoute,
    private auth: AuthService) {}

  ngOnInit() {
    this.getParams();
    this.getBadgeSet();
    this.getBadges();
    this.getTiers();
    // this.checkEmptyBadge();
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }

  getParams() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  getBadgeSet() {
    console.log('id from _routeParams: ', this.id); 
    this._bsService.getBadgeSet(this.id).subscribe(badgeset => {this.badgeset = badgeset});
  }

  getBadgeSets() {
    this._bsService.getBadgeSets().subscribe(badgesets => { this.badgesets = badgesets});
  }

  getBadges() {
    this._badgeService.getBadges().subscribe(badges => { this.badges = badges});
  }

  getTiers() {
    this._tierService.getTiers().subscribe(tiers => { this.tiers = tiers});
  }

  toBadgeSets() {
    this._router.navigate(['/badgeset']);
    this.getBadgeSets();
    // location.reload();
  }

  toBSEdit(bsid:string) {
    this._router.navigate(['/bs/edit',bsid]);
  }

  addBadgeSet() {
    this._router.navigate(['/bs/new']);
  }

  updateBadgeSet() {
    for (var i = 0; i < this.badgeset.badgegroups.length; i++) { 
      this.badgeset.badgegroups[i].level = +this.badgeset.badgegroups[i].level;
    }
    this.badgeset.tier = +this.badgeset.tier;
    this.badgeset.pay = +this.getPay(this.badgeset.tier, this.badgeset.grade)
    this.badgeset.badgegroups.sort(this.toCompare);
    this.badgeset.tags = this.badgeset.tags.sort();
    let value = JSON.stringify(this.badgeset)
    this._bsService.updateBadgeSet(this.id,value).subscribe();
    console.log('you submitted value: ', value); 
  }

  toCompare(a,b) {
    if (a.badge < b.badge)
      return -1;
    else if (a.badge > b.badge)
      return 1;
    else 
      return 0;
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
          if (this.badges[i].status == 'Accepted') {
            badgesOptions.push(this.badges[i].name);
          }
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

  getTiersOptions() {
    var tiersOptions =[];
    if (this.tiers != null) {
        for (var i = 0; i < this.tiers.length; i++) { 
          tiersOptions.push(this.tiers[i].tier);
        }
    }
    // console.log('getTiersOptions: ', tiersOptions);
    return tiersOptions.sort();
  }

  checkCore(b:string) {
    var result = "No";
    if (this.badgeset != null) {
        for (var i = 0; i < this.badgeset.corebadges.length; i++) { 
            if (this.badgeset.corebadges[i].badge == b) {
                result = "Yes";
            }
        }
    }
    return result;
  }

  toBadgeDetail(bname:string) {
    var bid = "";
    if (this.badges != null) {
        for (var i = 0; i < this.badges.length; i++) {   
            if (this.badges[i].name == bname) {
                bid = this.badges[i]._id;
            }
        }
    }
    this._router.navigate(['/badge/detail',bid]);
  }

  getMoreBadges(bgs:BadgeGroup[]) {
    var moreBadges = [];
    if (bgs != null) {
      for (var i = 0; i < bgs.length; i++) { 
        for (var j = 0; j < this.badges.length; j++) { 
          for (var k = 0; k < this.badges[j].badgelevels.length; k++) { 
            if (bgs[i].badge == this.badges[j].name && bgs[i].level>this.badges[j].badgelevels[k].level) {
              moreBadges.push({"badge": this.badges[j].name, "level": this.badges[j].badgelevels[k].level, "focus": bgs[i].focus, "current":false});
            }
            if (bgs[i].badge == this.badges[j].name && bgs[i].level==this.badges[j].badgelevels[k].level) {
              moreBadges.push({"badge": this.badges[j].name, "level": this.badges[j].badgelevels[k].level, "focus": bgs[i].focus, "current":true});
            }
          }
        }
        
      }
    }
    return moreBadges;
  }

  addTag(tag:string) {
    this.badgeset.tags.push(tag.toUpperCase());
  }

  deleteTag(tag:string) {
    let index = this.badgeset.tags.indexOf(tag);
    this.badgeset.tags.splice(index,1);
  }

  addBadgeGroup() {
    // pasrse string into number
    // this.badgeset.tier = +this.badgeset.tier;
    // for (var i = 0; i < this.badgeset.badgegroups.length; i++) { 
    //   this.badgeset.badgegroups[i].level = +this.badgeset.badgegroups[i].level;
    // }
    this.newLevel = +this.newLevel;
    this.badgeset.badgegroups.push({badge: this.newBadge, level: this.newLevel, focus: this.newFocus});
    // this.badgeset.badgegroups.sort(this.toCompare);
    // this.badgeset.corebadges.sort(this.toCompare);
    let value = JSON.stringify(this.badgeset)
    // this._bsService.updateBadgeSet(id,value).subscribe();
    console.log('you submitted value: ', value);
    this.newBadge = "";
    this.newLevel = 0;
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

  checkAdmin() {
    if(this.auth.isAdmin()) {
      this.bedit = true;
    }
  }

  // checkEmptyBadge() {
  //   if(this.badgeset.badgegroups == null) {
  //     this.bedit = true;
  //   }
  // }

  goBack() {
    window.history.back();
  }

}


