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
  newBadge = "";
  newLevel = 0;
  newStatus = false;

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

  getStaffBS(sbgs:UserBGroup[]) {
    var allbset = [];
    var count = 0;
    var coreCount = 0;
    var core = false;
    if (this.badgesets != null && sbgs != null) {
      for (var i = 0; i < this.badgesets.length; i++) { 
        for (var j = 0; j < this.badgesets[i].badgegroups.length; j++) {
          for (var k = 0; k < sbgs.length; k++) {      
            if (this.badgesets[i].badgegroups[j].badge == sbgs[k].badge && this.badgesets[i].badgegroups[j].level <= sbgs[k].level) {
              count += 1;
            }
          }
        }
        if (this.badgesets[i].corebadges == []) {
          core = true;
        }else {
          for (var m = 0; m < this.badgesets[i].corebadges.length; m++) {
            for (var k = 0; k < sbgs.length; k++) {      
              if (this.badgesets[i].corebadges[m].badge == sbgs[k].badge && this.badgesets[i].corebadges[m].level <= sbgs[k].level) {
                coreCount += 1;
              }
            }
          }
          if (coreCount == this.badgesets[i].corebadges.length) {
            core = true;
          }
        }
        
        if (count >= this.badgesets[i].numbadges && core && this.badgesets[i].numbadges >0 && this.badgesets[i].status=='Accepted') {
          allbset.push(this.badgesets[i]);
        }
        count = 0;
        coreCount = 0;
        core =false;
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

  findBadgeSet(bname:string, l:number) {
    var bset = [];
    if (this.sortStaffBS != null) {
      for (var i = 0; i < this.sortStaffBS.length; i++) { 
        for (var j = 0; j < this.sortStaffBS[i].badgegroups.length; j++) {   
          if (this.sortStaffBS[i].badgegroups[j].badge == bname && this.sortStaffBS[i].badgegroups[j].level <= l) {
            bset.push(this.sortStaffBS[i]);
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
                badgesOptions.push(this.badges[i].name);
            }
        }
    }
    return badgesOptions.sort();
  }

  // getNewBadgesOptions() {
  //     var badgesOptions = [];
  //     var userbgs = [];
  //     if (this.staff.userbgroups != null) {
  //         for (var j = 0; j < this.staff.userbgroups.length; j++) { 
  //             userbgs.push(this.staff.userbgroups[j].badge);
  //         }
  //     }
  //     if (this.badges != null) {
  //         for (var i = 0; i < this.badges.length; i++) { 
  //             let index = userbgs.indexOf(this.badges[i].name);
  //             if (this.badges[i].status=='Accepted' && index == -1) {
  //                 badgesOptions.push(this.badges[i].name);
  //             }
  //         }
  //     }
  //     return badgesOptions.sort();
  // }

  // getLevelsOptions(bname: string) {
  //     var levelsOptions = [];
  //     for (var i = 0; i < this.badges.length; i++) { 
  //         if (this.badges[i].name == bname) {
  //             for (var j = 0; j < this.badges[i].badgelevels.length; j++) { 
  //                 levelsOptions.push(this.badges[i].badgelevels[j].level);
  //             }
  //         }
  //     }
  //     // console.log('getBadgesOptions: ', badgesOptions);
  //     return levelsOptions.sort();
  // }

  getNewLevelsOptions(bname: string) {
    var levelsOptions = [];
    var userbgs = [];
    if (this.staff.userbgroups.length != 0) {
        for (var j = 0; j < this.staff.userbgroups.length; j++) { 
            userbgs.push(this.staff.userbgroups[j].badge);
        }
    }
    for (var i = 0; i < this.badges.length; i++) { 
      if (this.badges[i].name == bname) {
        for (var j = 0; j < this.badges[i].badgelevels.length; j++) { 
          let index = userbgs.indexOf(this.badges[i].name);
          if (this.staff.userbgroups.length != 0 && index != -1) {
            for (var k = 0; k < this.staff.userbgroups.length; k++) {
              if (this.staff.userbgroups[k].badge == bname && this.staff.userbgroups[k].level<this.badges[i].badgelevels[j].level) {
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
      this.staff.userbgroups.push({badge: this.newBadge, level: this.newLevel, status: this.newStatus});
      this.staff.userbgroups.sort(this.toCompare);
      let value = JSON.stringify(this.staff)
      this._staffService.updateStaff(this.staff._id,value).subscribe();
      console.log('you submitted value: ', value);
      this.newBadge = "";
      this.newLevel = 0;
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

  goBack() {
    window.history.back();
  }

}

