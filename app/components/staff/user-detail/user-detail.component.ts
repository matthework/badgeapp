import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

import {Staff,UserBGroup} from '../staff';
import {StaffService} from '../staff.service';
import {Badge} from '../../badge/badge';
import {BadgeService} from '../../badge/badge.service';
import {BadgeSet,BadgeGroup} from '../../badgeset/bs';
import {BSService} from '../../badgeset/bs.service';
import {Tier} from '../../tier/tier';
import {TierService} from '../../tier/tier.service';

import {AuthService} from '../../auth/auth.service';

import {YesNoPipe} from '../../pipe/yes-no-pipe';
import {ApprovedPipe} from '../../pipe/approved-pipe';

@Component({
  selector: 'my-user-detail',
  templateUrl: 'app/components/staff/user-detail/user-detail.component.html',
  styleUrls: ['app/components/staff/user-detail/user-detail.component.css'],
  pipes: [YesNoPipe,ApprovedPipe]
})

export class UserDetailComponent implements OnInit {

  staff: Staff;
  badges: Badge[] = [];
  badgesets: BadgeSet[] = [];
  tiers: Tier[] = [];
  gmap = {"A":0, "B":1, "C":2, "D":3, "E":4, "F":5};
  sortStaffBS = [];
  // sub: any;
  email: string;
  active = false;
  newBID = "";
  newLevel = 0;
  newFocus = [];
  newStatus = false;
  more = false;
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

  constructor(
    private _staffService: StaffService, 
    private _badgeService: BadgeService,
    private _bsService: BSService,  
    private _tierService: TierService,
    private _router: Router,
    private route: ActivatedRoute,
    private auth: AuthService) {}
  
  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
    //   this.email = params['email'];
    // });
    if (this.auth.authenticated()) {
      this.email = this.auth.userProfile.email;
      this.getStaffByEmail();
    }
    this.getBadges();
    this.getBadgeSets();
    this.getTiers();
  }

  // ngOnDestroy() {
  //     this.sub.unsubscribe();
  // }

  getStaffByEmail() {
    console.log('email from _routeParams: ', this.email); 
    this._staffService.getStaffByEmail(this.email).subscribe((staff) => {this.staff = staff;});
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

  toStaffs() {
    this._router.navigate(['/staffs']);
    location.reload();
  }

  toUserEdit(sid:string) {
    this._router.navigate(['/user/edit',sid]);
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

  toBadgeDetail(bid:string) {
    // var bid = "";
    // if (this.badges != null) {
    //   for (var i = 0; i < this.badges.length; i++) {   
    //     if (this.badges[i].name == bname) {
    //       bid = this.badges[i]._id;
    //     }
    //   }
    // }
    this._router.navigate(['/badge/detail',bid]);
  }

  getStaffBS(sbgs:UserBGroup[]) {
    var allbset = [];
    var count = 0;
    var focusCheck = false;
    if (this.badgesets != null && sbgs != null) {
      for (var i = 0; i < this.badgesets.length; i++) { 
        for (var j = 0; j < this.badgesets[i].badgegroups.length; j++) {
          for (var k = 0; k < sbgs.length; k++) {   
            var a1 = sbgs[k].focus;
            var a2 = this.badgesets[i].badgegroups[j].focus;
            if (a1.length >= a2.length && a2.every(function(v,i) { return a1.includes(v)})) {
              focusCheck = true;
            }    
            if (focusCheck && sbgs[k].status && this.badgesets[i].badgegroups[j].bid == sbgs[k].bid && this.badgesets[i].badgegroups[j].level <= sbgs[k].level) {
              count += 1;
            }
            focusCheck = false;
          }
        }
        if (count >= this.badgesets[i].badgegroups.length && this.badgesets[i].status=='Accepted') {
          allbset.push(this.badgesets[i]);
        }
        count = 0;
      }
    }
    return allbset;
  }

  getSortStaffBS(sbgs:UserBGroup[]) {
    var pay = "";
    this.sortStaffBS = [];
    var allbset = this.getStaffBS(sbgs);
    if (allbset != null && sbgs != null) {
      for (var i = 0; i < allbset.length; i++) { 
        allbset[i].pay = this.getPay(allbset[i].tier, allbset[i].grade);
        this.sortStaffBS.push(allbset[i]);
      }
    }
    return this.sortStaffBS.sort(this.toCompareDes);
  }

  toCompareDes(a,b) {
    if (a.pay > b.pay)
      return -1;
    else if (a.pay < b.pay)
      return 1;
    else 
      return 0;
  }

  getTopStaffBS(sbgs:UserBGroup[]) {
    var topBS = [];
    if (this.getSortStaffBS(sbgs) !=null && this.getSortStaffBS(sbgs).length > 0) {
      topBS.push(this.getSortStaffBS(sbgs)[0]._id);
      topBS.push(this.getSortStaffBS(sbgs)[0].name);
      topBS.push(this.getSortStaffBS(sbgs)[0].tier);
      topBS.push(this.getSortStaffBS(sbgs)[0].grade);
    }
    return topBS;
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

  findBadgeSet(sbgs:UserBGroup[], bid:string, l:number) {
    var bset = [];
    var sortStaffBS = this.getSortStaffBS(sbgs);
    if (sortStaffBS != null && sortStaffBS.length > 0) {
      for (var i = 0; i < sortStaffBS.length; i++) { 
        for (var j = 0; j < sortStaffBS[i].badgegroups.length; j++) {   
          if (sortStaffBS[i].badgegroups[j].bid == bid && sortStaffBS[i].badgegroups[j].level <= l) {
            bset.push(sortStaffBS[i]);
          }
        }
      }
    }
    return bset;
  }

  toBSDetail(bsid:string){
    this._router.navigate(['/bs/detail',bsid]);
  }

  getBadgesOptions() {
    var badgesOptions = [];
    if (this.badges != null) {
        for (var i = 0; i < this.badges.length; i++) { 
            if (this.badges[i].status=='Accepted') {
                badgesOptions.push([this.badges[i].name,this.badges[i]._id]);
            }
        }
    }
    return badgesOptions.sort();
  }

  getNewLevelsOptions(bid: string) {
    var levelsOptions = [];
    var userbgs = [];
    if (this.staff.userbgroups.length != 0) {
        for (var j = 0; j < this.staff.userbgroups.length; j++) { 
            userbgs.push(this.staff.userbgroups[j].bid);
        }
    }
    for (var i = 0; i < this.badges.length; i++) { 
      if (this.badges[i]._id == bid) {
        for (var j = 0; j < this.badges[i].badgelevels.length; j++) { 
          let index = userbgs.indexOf(this.badges[i]._id);
          if (this.staff.userbgroups.length != 0 && index != -1) {
            for (var k = 0; k < this.staff.userbgroups.length; k++) {
              if (this.staff.userbgroups[k].bid == bid && this.staff.userbgroups[k].level<this.badges[i].badgelevels[j].level) {
                levelsOptions.push(this.badges[i].badgelevels[j].level);
              }
            }
          }else{
            levelsOptions.push(this.badges[i].badgelevels[j].level);
          }
        }
      }
    }
    return levelsOptions.sort();
  }

  addBadgeGroup() {
      this.newLevel = +this.newLevel;
      this.staff.userbgroups.push({bid: this.newBID, badge: "", level: this.newLevel, focus: this.newFocus, status: this.newStatus});
      this.staff.userbgroups.sort(this.toCompare);
      let value = JSON.stringify(this.staff)
      this._staffService.updateStaff(this.staff._id,value).subscribe();
      console.log('you submitted value: ', value);
      this.newBID = "";
      this.newLevel = 0;
      this.newFocus = [];
      this.newStatus = false;
  }

  toCompare(a,b) {
    if (a.badge < b.badge)
      return -1;
    else if (a.badge > b.badge)
      return 1;
    else 
      return 0;
  }

  addNewUser(email:string) {
    this._router.navigate(['/user/new',email]);
  }

  getMoreBadges(bgs:UserBGroup[]) {
    var moreBadges = [];
    if (bgs != null) {
      for (var i = 0; i < bgs.length; i++) { 
        for (var j = 0; j < this.badges.length; j++) { 
          for (var k = 0; k < this.badges[j].badgelevels.length; k++) { 
            if (bgs[i].bid == this.badges[j]._id && bgs[i].level>this.badges[j].badgelevels[k].level) {
              moreBadges.push({"status":bgs[i].status, "bid": this.badges[j]._id, "level": this.badges[j].badgelevels[k].level, "focus":bgs[i].focus, "current":false});
            }
            if (bgs[i].bid == this.badges[j]._id && bgs[i].level==this.badges[j].badgelevels[k].level) {
              moreBadges.push({"status":bgs[i].status, "bid": this.badges[j]._id, "level": this.badges[j].badgelevels[k].level, "focus":bgs[i].focus, "current":true});
            }
          }
        }
        
      }
    }
    return moreBadges;
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

  goBack() {
    window.history.back();
  }

}

