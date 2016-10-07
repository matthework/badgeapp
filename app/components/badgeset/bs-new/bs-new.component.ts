import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {BadgeSet,BadgeGroup} from '../bs';
import {BSService} from '../bs.service';
import {Badge,BadgeLevel} from '../../badge/badge';
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
  
  badgesets: BadgeSet[];
  badges: Badge[] = [];
  tiers: Tier[] = [];
  active = false;
  gmap = {"A":0, "B":1, "C":2, "D":3, "E":4, "F":5};
  gradesOptions =["A", "B", "C", "D", "E", "F"]; 
  nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  prerequisite = false;
  numBadges = -1;
  coreBadge: BadgeGroup;
  newcbs: BadgeGroup[] = [];
  total =0;
  newTag = "";
  checked: string[] = [];
  addNew = false;
  newBID = "";
  newLevel = 0;
  newFocus = [];
  newL = 0;
  selectedLevel = 0;
  selectedBG: BadgeGroup;

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

  // newBGs = [{bid: "", badge: "", level: 0, focus: []},
  //           {bid: "", badge: "", level: 0, focus: []},
  //           {bid: "", badge: "", level: 0, focus: []},
  //           {bid: "", badge: "", level: 0, focus: []},
  //           {bid: "", badge: "", level: 0, focus: []},
  //           {bid: "", badge: "", level: 0, focus: []},
  //           {bid: "", badge: "", level: 0, focus: []},
  //           {bid: "", badge: "", level: 0, focus: []},
  //           {bid: "", badge: "", level: 0, focus: []},
  //           {bid: "", badge: "", level: 0, focus: []}];

  statusOptions = ['Accepted','Draft','NotUsed'];

  newBS = {index: 0, name: "", status: "Accepted", badgegroups: [], tier: 0, grade: "", pay: 0, tags: [], numbadges: this.numBadges, corebadges: this.newcbs, approved: true, inused:true, others:[]}

  constructor(
    private _bsService: BSService, 
    private _badgeService: BadgeService,
    private _tierService: TierService,
    private _router: Router,
    private auth: AuthService) {}

  ngOnInit() {
    this.getBadges();
    this.getBadgeSets();
    this.getTiers();
  }

  getBadges() {
    this._badgeService.getBadges().subscribe(badges => { this.badges = badges});
  }

  getBadgeSets() {
    this._bsService.getBadgeSets().subscribe(badgesets => { this.badgesets = badgesets});
  }

  getTiers() {
    this._tierService.getTiers().subscribe(tiers => { this.tiers = tiers});
  }

  onSelect(bg: BadgeGroup) { 
    this.selectedBG = bg;
  }

  addBadgeSet() {
    // var arr = this.newBS.badgegroups.filter(this.checkEmpty);
    // this.newBS.badgegroups = arr; //this.newBS.badgegroups.filter(this.checkEmpty);
    // this.total = 0;
    this.newBS.tier = +this.newBS.tier;
    for (var i = 0; i < this.newBS.badgegroups.length; i++) { 
      if (this.newBS.badgegroups[i].level != 0) {
        this.newBS.badgegroups[i].level = +this.newBS.badgegroups[i].level;
      }
      // if (this.newBS.badgegroups[i].badge != "" && this.newBS.badgegroups[i].level != 0){
      //   this.total += 1;
      // }
    }
    // if (this.numBadges==-1) {
    //   this.numBadges = Math.round(this.total/2);
    // }
    // this.newBS.numbadges = this.numBadges;
    this.newBS.pay = +this.getPay(this.newBS.tier, this.newBS.grade)
    console.log('you submitted total: ', this.total); 

    this.newBS.badgegroups.sort(this.toCompare);
    this.newBS.tags = this.newBS.tags.sort();
    // this.newBS.corebadges.sort(this.toCompare);
    let value = JSON.stringify(this.newBS)
    this._bsService.addBadgeSet(value).subscribe();
    console.log('you submitted value: ', value); 
    this.toBadgeSets();
  }

  addBadgeGroup(level:number) {
    this.newLevel = level;
    this.newBS.badgegroups.push({bid: this.newBID, badge: "", level: this.newLevel, focus: this.newFocus});
    // this.badgeset.badgegroups.sort(this.toCompare);
    // this.badgeset.corebadges.sort(this.toCompare);
    let value = JSON.stringify(this.newBS)
    // this._bsService.updateBadgeSet(this.newBS._id,value).subscribe();
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

  toBadgeSets() {
    this._router.navigate(['/badgeset']);
    this.getBadgeSets();
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
        if (this.badges[i].status=='Accepted') {
          badgesOptions.push([this.badges[i].name, this.badges[i]._id]);
        }
      }
    }
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
    this.newBS.corebadges.push({bid: "", badge: b, level: l, focus: []});
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
    this.newTag = "";
  }

  deleteTag(tag:string) {
    let index = this.newBS.tags.indexOf(tag);
    this.newBS.tags.splice(index,1);
  }

  updateChecked(option, event, bg) {
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
    for (var i = 0; i < this.newBS.badgegroups.length; i++) { 
      if(this.newBS.badgegroups[i].bid == this.selectedBG.bid && this.newBS.badgegroups[i].level == this.selectedBG.level) {
         this.newBS.badgegroups[i].focus = this.selectedBG.focus;
      }
   }
   this.updateBadgeSet();
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

  checkFocus(fc,focus) {
    var result = false;
    if(focus.includes(fc)) {
      result = true;
    }
    return result;
  }

  getBadgeName(bid:string) {
    var bname = "";
    for (var i = 0; i < this.badges.length; i++) { 
      if(this.badges[i]._id == bid) {
        bname = this.badges[i].name;
      }
    }
    // console.log('you submitted value: ', bname);
    return bname;
  }

  resetNewValue() {
    this.newBID = "";
    this.newLevel = 0;
    this.newFocus = [];
    this.selectedLevel = 0;
  }

  getBLs(bid:string) {
    var bls: BadgeLevel[];
    for (var i = 0; i < this.badges.length; i++) { 
      if(this.badges[i]._id == bid) {
        bls = this.badges[i].badgelevels;
      }
    }
    // console.log('you submitted value: ', bls);
    return bls;
  }

  updateBadgeSet() {
    if(this.newBS.tags == null) {
        this.newBS.tags = [];
    }
    for (var i = 0; i < this.newBS.badgegroups.length; i++) { 
      this.newBS.badgegroups[i].level = +this.newBS.badgegroups[i].level;
      if(this.newBS.badgegroups[i].focus == null) {
        this.newBS.badgegroups[i].focus = [];
      }
    }
    this.newBS.tier = +this.newBS.tier;
    this.newBS.pay = +this.getPay(this.newBS.tier, this.newBS.grade)
    this.newBS.badgegroups.sort(this.toCompare);
    this.newBS.tags = this.newBS.tags.sort();
    let value = JSON.stringify(this.newBS)
    // this._bsService.updateBadgeSet(this.id,value).subscribe();
    console.log('you submitted value: ', value); 
  }

   onSelectNewLevel(level:number) {
      this.newL = level;
      // console.log('you submitted value: ', this.newL);
      for (var i = 0; i < this.newBS.badgegroups.length; i++) { 
         if(this.newBS.badgegroups[i].bid == this.selectedBG.bid && this.newBS.badgegroups[i].level == this.selectedBG.level) {
            this.newBS.badgegroups[i].level = this.newL;
            this.newBS.badgegroups[i].focus = this.selectedBG.focus;
         }
      }
      this.updateBadgeSet();
   }

   onSelectedLevel(level:number) {
      this.selectedLevel = level;
   }

  deleteBadgeGroupPop(selectedGroup: BadgeGroup) {
    var isCore =false;
    for (var i = 0; i < this.newBS.corebadges.length; i++) { 
      if (this.newBS.corebadges[i].badge == selectedGroup.badge) {
        isCore = true;
      }
    }
    if (isCore) {
      var s = confirm("WARNING: PLEASE REMOVE THIS BADGE FROM COREBADGE BEFORE DELETE IT!")
    }else{
      var name = this.newBS.name.toUpperCase()
      var badge = this.getBadgeName(selectedGroup.bid).toUpperCase()
      var r = confirm("Are you sure you want to delete "+ badge + " from " + name +" ?");
      if (r == true) {
          this.removeBadgeGroup(selectedGroup);
      }
    }
  }
  
  removeBadgeGroup(selectedGroup: BadgeGroup) {
    let index = this.newBS.badgegroups.indexOf(selectedGroup);
    this.newBS.badgegroups.splice(index,1);
    let value = JSON.stringify(this.newBS)
    // this._bsService.updateBadgeSet(this.newBS._id,value).subscribe();
    console.log('you submitted value: ', value);
  }

}


