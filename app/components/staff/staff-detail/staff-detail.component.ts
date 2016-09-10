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
  selector: 'my-staff-detail',
  templateUrl: 'app/components/staff/staff-detail/staff-detail.component.html',
  styleUrls: ['app/components/staff/staff-detail/staff-detail.component.css'],
  pipes: [YesNoPipe,ApprovedPipe]
})

export class StaffDetailComponent implements OnInit {

  staff: Staff;
  badges: Badge[] = [];
  badgesets: BadgeSet[] = [];
  tiers: Tier[] = [];
  gmap = {"A":0, "B":1, "C":2, "D":3, "E":4, "F":5};
  sortStaffBS = [];
  sub: any;
  id: string;
  more = false;
  staffName = false;
  pos = false;
  email = false;
  sta = false;
  brief = false;
  bedit =false;
  newBID = "";
  newLevel = 0;
  newFocus = [];
  newStatus = false;
  addNew = false;
  statusOptions = ['Active','Inactive'];

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
    this.getParams();
    this.getStaff();
    this.getBadges();
    this.getBadgeSets();
    this.getTiers();
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }

  getParams() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  getStaff() {
    console.log('id from _routeParams: ', this.id); 
    this._staffService.getStaff(this.id).subscribe((staff) => {this.staff = staff;});
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

  toBadgeDetail(bid:string) {
    this._router.navigate(['/badge/detail',bid]);
  }

  updateStaff() {
      // pasrse string into number
      for (var i = 0; i < this.staff.userbgroups.length; i++) { 
          this.staff.userbgroups[i].level = +this.staff.userbgroups[i].level;
      }
      this.staff.userbgroups.sort(this.toCompare);
      let value = JSON.stringify(this.staff)
      this._staffService.updateStaff(this.staff._id,value).subscribe();
  }

  toCompare(a,b) {
      if (a.badge < b.badge)
        return -1;
      else if (a.badge > b.badge)
        return 1;
      else 
        return 0;
  }

  addStaff() {
      this._router.navigate(['/staff/new']);
  }

  addBadgeGroup() {
      this.newLevel = +this.newLevel;
      this.staff.userbgroups.push({bid: this.newBID, badge: "", level: this.newLevel, focus: this.newFocus, status: this.newStatus});
      let value = JSON.stringify(this.staff)
      console.log('you submitted value: ', value);
      this.newBID = "";
      this.newLevel = 0;
      this.newFocus =[];
      this.newStatus = false;
  }

  removeStaff() {
      this._staffService.deleteStaff(this.id).subscribe();
      this.toStaffs();
  }

  deleteStaffPop() {
      var fname = this.staff.fname;
      var lname = this.staff.lname;
      var name = fname.toUpperCase() + " " + lname.toUpperCase();
      var r = confirm("Are you sure you want to delete Staff: " + name +" ?");
      if (r == true) {
          this.removeStaff();
      }
  }

  deleteBadgeGroupPop(selectedGroup: UserBGroup) {
      var name = this.staff.fname.toUpperCase() + " " + this.staff.lname.toUpperCase();
      var badge = selectedGroup.badge.toUpperCase();
      var level = selectedGroup.level;
      var r = confirm("Are you sure you want to delete "+ badge + " " + level + " from " + name +" ?");
      if (r == true) {
          this.removeBadgeGroup(selectedGroup);
      }
  }

  removeBadgeGroup(selectedGroup: UserBGroup) {
      let index = this.staff.userbgroups.indexOf(selectedGroup);
      this.staff.userbgroups.splice(index,1);
      let value = JSON.stringify(this.staff)
      // this._staffService.updateStaff(id,value).subscribe();
      console.log('you submitted value: ', value);
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
            if (a1.length >= a2.length) {
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
    this.sortStaffBS = [];
    var allbset = this.getStaffBS(sbgs);
    if (allbset != null) {
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
  
  // getTopBS() {
  //   var topBS = this.sortStaffBS[0];
  //   return topBS;
  // }

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

  getBadgesOptions() {
      var badgesOptions = [];
      if (this.badges != null) {
          for (var i = 0; i < this.badges.length; i++) { 
              if (this.badges[i].status=='Accepted') {
                  badgesOptions.push([this.badges[i].name,this.badges[i]._id]);
              }
          }
          // console.log('getBadgesOptions: ', badgesOptions);
          return badgesOptions.sort();
      }
  }

  // getNewBadgesOptions() {
  //     var badgesOptions = [];
  //     var userbgs = [];
  //     if (this.staff.userbgroups != null) {
  //         for (var j = 0; j < this.staff.userbgroups.length; j++) { 
  //             userbgs.push(this.staff.userbgroups[j].bid);
  //         }
  //     }
  //     if (this.badges != null) {
  //         for (var i = 0; i < this.badges.length; i++) { 
  //             let index = userbgs.indexOf(this.badges[i]._id);
  //             if (this.badges[i].status=='Accepted') { // && index == -1) {
  //                 badgesOptions.push([this.badges[i].name,this.badges[i]._id]);
  //             }
  //         }
  //     }
  //     return badgesOptions.sort();
  // }

  getLevelsOptions(bid: string) {
      var levelsOptions = [];
      for (var i = 0; i < this.badges.length; i++) { 
          if (this.badges[i]._id == bid) {
              for (var j = 0; j < this.badges[i].badgelevels.length; j++) { 
                  levelsOptions.push(this.badges[i].badgelevels[j].level);
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
      console.log(bg.focus);
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

  checkAdmin() {
    if(this.auth.isAdmin()) {
      this.bedit = true;
    }
  }
  
  resetNewValue() {
    this.newBID = "";
    this.newLevel = 0;
  }
  
  goBack() {
    window.history.back();
  }

}

