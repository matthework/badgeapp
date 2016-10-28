import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

import {Staff,UserBGroup} from '../staff';
import {StaffService} from '../staff.service';
import {Badge,BadgeLevel} from '../../badge/badge';
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
  staffs: Staff[] = [];
  badges: Badge[] = [];
  badgesets: BadgeSet[] = [];
  selectedUG: UserBGroup;
  tiers: Tier[] = [];
  newUser = {index: 0, fname: "", lname: "", status: "Active", position: "", salary: 0, email: "", phone: "", userbgroups: [], active: true, brief:"", others: []}
  gmap = {"A":0, "B":1, "C":2, "D":3, "E":4, "F":5};
  sortStaffBS = [];
  // sub: any;
  email: string;
  addNew = false;
  newBID = "";
  newLevel = 0;
  newFocus = [];
  newApproved = false;
  selectedLevel = 0;
  more = false;
  edit = false;
  userName = false;
  pos = false;
  brief = false;
  newL = 0;
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
    if (this.auth.authenticated()) {
      this.email = this.auth.userProfile.email;
      this.getStaffByEmail();
    }
    this.getStaffs();
    this.getBadges();
    this.getBadgeSets();
    this.getTiers();
  }

  onSelect(ug: UserBGroup) { 
    this.selectedUG = ug;
  }
  
  getStaffs() {
    this._staffService.getStaffs().subscribe(staffs => { this.staffs = staffs});
  }

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
    this._router.navigate(['/badge/detail',bid]);
  }

  updateStaff() {
      for (var i = 0; i < this.staff.userbgroups.length; i++) { 
          this.staff.userbgroups[i].badge = this.getBadgeName(this.staff.userbgroups[i].bid);
      }
      this.staff.userbgroups.sort(this.toCompare);
      this.staff.userbgroups.sort(this.sortApproved);
      let value = JSON.stringify(this.staff)
      this._staffService.updateStaff(this.staff._id,value).subscribe();
      console.log('you submitted value: ', value); 
  }

  addNewUser() {
    this.newUser.email = this.auth.userProfile.email;
    let value = JSON.stringify(this.newUser)
    this._staffService.addStaff(value).subscribe();
    console.log('you submitted value: ', value);
    this.toUserDetail(this.newUser.email);
  }

  toUserDetail(email:string) {
    this._router.navigate(['/user/detail',email]);
    location.reload();
  }

  getStaffBS(sbgs:UserBGroup[]) {
    var allbset = [];
    var coreCount = 0;
    var ncCount = 0;
    var focusCheck = false;
    var totolCore = 0;
    if (this.badgesets != null && sbgs != null) {
      for (var i = 0; i < this.badgesets.length; i++) { 
        for (var j = 0; j < this.badgesets[i].badgegroups.length; j++) {
          if (this.badgesets[i].badgegroups[j].iscore) {
            totolCore += 1;
          }
        }

        for (var j = 0; j < this.badgesets[i].badgegroups.length; j++) {
          for (var k = 0; k < sbgs.length; k++) { 
            var a1 = sbgs[k].focus;
            var a2 = this.badgesets[i].badgegroups[j].focus;
            if (a1.length >= a2.length && a2.every(function(v,i) { return a1.includes(v)})) {
              focusCheck = true;
            }   
            if (focusCheck && sbgs[k].approved && this.badgesets[i].badgegroups[j].bid == sbgs[k].bid && this.badgesets[i].badgegroups[j].level <= sbgs[k].level) {
              if (this.badgesets[i].badgegroups[j].iscore) {
                coreCount += 1;
              }else{
                ncCount += 1;
              }
            }
            focusCheck = false;
          }

        }
        if (coreCount == totolCore && ncCount >= (this.badgesets[i].badgegroups.length-totolCore)*4/5 && this.badgesets[i].status=='Accepted') {
          allbset.push(this.badgesets[i]);
        }
        totolCore = 0;
        coreCount = 0;
        ncCount = 0;
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
  
  // getNewLevelsOptions(bid: string) {
  //   var levelsOptions = [];
  //   var userbgs = [];
  //   if (this.staff.userbgroups.length != 0) {
  //       for (var j = 0; j < this.staff.userbgroups.length; j++) { 
  //           userbgs.push(this.staff.userbgroups[j].bid);
  //       }
  //   }
  //   for (var i = 0; i < this.badges.length; i++) { 
  //     if (this.badges[i]._id == bid) {
  //       for (var j = 0; j < this.badges[i].badgelevels.length; j++) { 
  //         let index = userbgs.indexOf(this.badges[i]._id);
  //         if (this.staff.userbgroups.length != 0) { // && index != -1) {
  //           for (var k = 0; k < this.staff.userbgroups.length; k++) {
  //             if (this.staff.userbgroups[k].bid == bid ) { //&& this.staff.userbgroups[k].level<this.badges[i].badgelevels[j].level) {
  //               levelsOptions.push(this.badges[i].badgelevels[j].level);
  //             }
  //           }
  //         }else{
  //           levelsOptions.push(this.badges[i].badgelevels[j].level);
  //         }
  //       }
  //     }
  //   }
  //   return levelsOptions.sort();
  // }

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

  addUserBGroup(level:number) {
    // this.newLevel = +this.newLevel;
    this.newLevel = level;
    this.staff.userbgroups.push({bid: this.newBID, badge: this.getBadgeName(this.newBID), level: this.newLevel, focus: this.newFocus, approved: this.newApproved});
    let value = JSON.stringify(this.staff)
    // this._staffService.updateStaff(this.staff._id,value).subscribe();
    this.updateStaff();
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

  sortApproved(a,b) {
    if (a.approved > b.approved)
      return -1;
    else if (a.approved < b.approved)
      return 1;
    else 
      return 0;
  }

  getMoreBadges(bgs:UserBGroup[]) {
    var moreBadges = [];
    if (bgs != null) {
      for (var i = 0; i < bgs.length; i++) { 
        for (var j = 0; j < this.badges.length; j++) { 
          for (var k = 0; k < this.badges[j].badgelevels.length; k++) { 
            if (bgs[i].bid == this.badges[j]._id && bgs[i].level>this.badges[j].badgelevels[k].level) {
              moreBadges.push({"approved":bgs[i].approved, "bid": this.badges[j]._id, "level": this.badges[j].badgelevels[k].level, "focus":"", "current":false});
            }
            if (bgs[i].bid == this.badges[j]._id && bgs[i].level==this.badges[j].badgelevels[k].level) {
              moreBadges.push({"approved":bgs[i].approved, "bid": this.badges[j]._id, "level": this.badges[j].badgelevels[k].level, "focus":bgs[i].focus, "current":true});
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

  checkProfile() {
    var hasProfile = false;
    if (this.auth.userProfile != null && this.staffs != null) {
      for (var i = 0; i < this.staffs.length; i++) { 
        if(this.staffs[i].email==this.auth.userProfile.email){
          hasProfile = true;
          break;
        }
      }
    }
    return hasProfile;
  }

  resetNewValue() {
    this.newBID = "";
    this.newLevel = 0;
    this.newFocus = [];
    this.newApproved = false;
    this.selectedLevel = 0;
  }

  onSelectedLevel(level:number) {
    this.selectedLevel = level;
  }

  onSelectNewLevel(level:number) {
    this.newL = level;
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

  goBack() {
    window.history.back();
  }

}

