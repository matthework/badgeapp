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

  constructor(
    private _staffService: StaffService, 
    private _badgeService: BadgeService,
    private _bsService: BSService,  
    private _tierService: TierService,
    private _router: Router,
    private route: ActivatedRoute,
    private auth: AuthService) {}
  
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getStaff();
    this.getBadges();
    this.getBadgeSets();
    this.getTiers();
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
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

  toStaffEdit(sid:string) {
    this._router.navigate(['/staff/edit',sid]);
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
        
        if (count >= this.badgesets[i].numbadges && core && this.badgesets[i].numbadges >0 && this.badgesets[i].inused) {
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
    if (allbset != null) {
      for (var i = 0; i < allbset.length; i++) { 
        allbset[i].pay = this.getPay(allbset[i].tier, allbset[i].grade);
        this.sortStaffBS.push(allbset[i]);
      }
    }
    // sortStaffBS = sortStaffBS.sort(this.toCompareDes);
    // this.topBS = sortStaffBS[0];
    // console.log('you submitted topBS: ', sortStaffBS); 
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

  getTopBS() {
    var topBS = this.sortStaffBS[0];
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

  goBack() {
    window.history.back();
  }

}

