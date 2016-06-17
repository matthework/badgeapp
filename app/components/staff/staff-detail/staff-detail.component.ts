import {Component,OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Router} from 'angular2/router';
import {Staff,BadgeGroup} from '../staff';
import {StaffService} from '../staff.service';
import {Validators,FormBuilder,ControlGroup,AbstractControl} from 'angular2/common';
import {Badge} from '../../badge/badge';
import {BadgeService} from '../../badge/badge.service';
import {BadgeSet} from '../../badgeset/bs';
import {BSService} from '../../badgeset/bs.service';
import {Tier} from '../../tier/tier';
import {TierService} from '../../tier/tier.service';

@Component({
  selector: 'my-staff-detail',
  templateUrl: 'app/components/staff/staff-detail/staff-detail.component.html',
  styleUrls: ['app/components/staff/staff-detail/staff-detail.component.css']
})

export class StaffDetailComponent implements OnInit {

  staff: Staff;
  badges: Badge[] = [];
  badgesets: BadgeSet[] = [];
  tiers: Tier[] = [];
  brief = 0;
  gmap = {"A":0, "B":1, "C":2, "D":3, "E":4, "F":5};
  sortStaffBS = [];

  constructor(
    private _staffService: StaffService, 
    private _badgeService: BadgeService,
    private _bsService: BSService,  
    private _tierService: TierService,
    private _router: Router,
    private _routeParams: RouteParams) {}
  
  ngOnInit() {
    this.getStaff();
    this.getBadges();
    this.getBadgeSets();
    this.getTiers();
  }

  getStaff() {
    let id = this._routeParams.get('id');
    console.log('id from _routeParams: ', id); 
    this._staffService.getStaff(id).subscribe((staff) => {this.staff = staff;});
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
    this._router.navigate(['Staffs']);
    // location.reload();
  }

  toStaffEdit(sid:string) {
    this._router.navigate(['StaffEdit', { id: sid}]);
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
    this._router.navigate(['BadgeDetail', {id:bid}]);
  }

  getStaffBS(sbgs:BadgeGroup[]) {
    var allbset = [];
    var count = 0;
    var coreCount = 0;
    var core = false;
    if (this.badgesets != null) {
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

  getSortStaffBS(sbgs:BadgeGroup[]) {
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
    this._router.navigate(['BSDetail', { id: bsid}]);
  }

  goBack() {
    window.history.back();
  }

}

