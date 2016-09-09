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
  newBID = "";
  newLevel = 0;
  newFocus = [];
  labels = [  "I understand... ", 
          "I participate... ", 
          "I contribute... ", 
          "I lead... ", 
          "I advise... ", 
          "I can teach... ", 
          "I plan sophisticated... ",
          "I have achieved wide recognition... ", 
          "I am a world leading... "
        ];
  focusOptions = [];

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
    if(this.badgeset.tags == null) {
        this.badgeset.tags = [];
    }
    for (var i = 0; i < this.badgeset.badgegroups.length; i++) { 
      this.badgeset.badgegroups[i].level = +this.badgeset.badgegroups[i].level;
      if(this.badgeset.badgegroups[i].focus == null) {
        this.badgeset.badgegroups[i].focus = [];
      }
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

  getDesc(bid:string, l:number) {
    var desc = "";
    if (this.badges != null && l > 0 && bid != "") {
        for (var i = 0; i < this.badges.length; i++) { 
            if (this.badges[i]._id == bid) {
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
            badgesOptions.push([this.badges[i].name,this.badges[i]._id]);
          }
        }
    }
    // console.log('getBadgesOptions: ', badgesOptions);
    return badgesOptions.sort();
  }

  getLevelsOptions(bid: string) {
    var levelsOptions = [];
    if (this.badges != null) {
        for (var i = 0; i < this.badges.length; i++) { 
            if (this.badges[i]._id == bid) {
                for (var j = 0; j < this.badges[i].badgelevels.length; j++) { 
                    levelsOptions.push(this.badges[i].badgelevels[j].level);
                }
            }
        }
    }
    // console.log('getBadgesOptions: ', badgesOptions);
    return levelsOptions.sort();
  }

  getFocusOptions(bid:string) {
    var focusOptions = [];
    if (this.badges != null) {
        for (var i = 0; i < this.badges.length; i++) { 
            if (this.badges[i]._id == bid && this.badges[i].focus != null) {
              for (var j = 0; j < this.badges[i].focus.length; j++) { 
                focusOptions.push(this.badges[i].focus[j]);
              }
            }
        }
    }
    return focusOptions.sort();
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

  toBadgeDetail(bid:string) {
    this._router.navigate(['/badge/detail',bid]);
  }

  getMoreBadges(bgs:BadgeGroup[]) {
    var moreBadges = [];
    if (bgs != null) {
      for (var i = 0; i < bgs.length; i++) { 
        for (var j = 0; j < this.badges.length; j++) { 
          for (var k = 0; k < this.badges[j].badgelevels.length; k++) { 
            if (bgs[i].bid == this.badges[j]._id && bgs[i].level>this.badges[j].badgelevels[k].level) {
              moreBadges.push({"bid": this.badges[j]._id, "level": this.badges[j].badgelevels[k].level, "focus": bgs[i].focus, "current":false});
            }
            if (bgs[i].bid == this.badges[j]._id && bgs[i].level==this.badges[j].badgelevels[k].level) {
              moreBadges.push({"bid": this.badges[j]._id, "level": this.badges[j].badgelevels[k].level, "focus": bgs[i].focus, "current":true});
            }
          }
        }
        
      }
    }
    return moreBadges;
  }

  addTag(tag:string) {
    if(this.badgeset.tags == null) {
        this.badgeset.tags = [];
    }
    this.badgeset.tags.push(tag.toUpperCase());
    this.newTag = "";
    this.tag = true;
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
    this.badgeset.badgegroups.push({bid: this.newBID, badge: "", level: this.newLevel, focus: this.newFocus});
    // this.badgeset.badgegroups.sort(this.toCompare);
    // this.badgeset.corebadges.sort(this.toCompare);
    let value = JSON.stringify(this.badgeset)
    // this._bsService.updateBadgeSet(id,value).subscribe();
    console.log('you submitted value: ', value);
    this.newBID = "";
    this.newLevel = 0;
    this.newFocus = [];
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

  getBadgeName(bid:string) {
    var bname = "";
    for (var i = 0; i < this.badges.length; i++) { 
      if(this.badges[i]._id == bid) {
        bname = this.badges[i].name;
      }
    }
    return bname;
  }

  resetNewValue() {
    this.newBID = "";
    this.newLevel = 0;
  }

  checkEmptyTags() {
      if (this.badgeset.tags != null) {
          if (this.badgeset.tags.length == 0) {
              return true;
          }else {
              return false;
          }
      }else {
          return true;
      }

  }

  updateChecked(option, event, bg) {
    // this.checked = focus;
    console.log('event.target.value ' + event.target.value);
    var index = bg.focus.indexOf(option);
    if(event.target.checked) {
      console.log('add');
      if(index === -1) {
        bg.focus.push(option);
      }
    } else {
      console.log('remove');
      if(index !== -1) {
        bg.focus.splice(index, 1);
      }
    }
    //this.checked[option]=event.target.value; // or `event.target.value` not sure what this event looks like
    console.log(bg.focus);
    // bg.focus = bg.focus;
  }

  updateCheckedNew(option, event, focus) {
    console.log('event.target.value ' + event.target.value);
    var index = focus.indexOf(option);
    if(event.target.checked) {
      console.log('add');
      if(index === -1) {
        focus.push(option);
      }
    } else {
      console.log('remove');
      if(index !== -1) {
        focus.splice(index, 1);
      }
    }
    console.log(focus);
    this.newFocus = focus;
  }

  goBack() {
    window.history.back();
  }

}


