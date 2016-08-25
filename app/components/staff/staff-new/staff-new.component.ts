import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Staff} from '../staff';
import {StaffService} from '../staff.service';
import {Badge} from '../../badge/badge';
import {BadgeService} from '../../badge/badge.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'my-staff-new',
  templateUrl: 'app/components/staff/staff-new/staff-new.component.html',
  styleUrls: ['app/components/staff/staff-new/staff-new.component.css']
})

export class StaffNewComponent {
  
  badges: Badge[] = [];
  active = false;
  nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  newBGs = [{badge: "", level: 0, status: false},
            {badge: "", level: 0, status: false},
            {badge: "", level: 0, status: false},
            {badge: "", level: 0, status: false},
            {badge: "", level: 0, status: false},
            {badge: "", level: 0, status: false},
            {badge: "", level: 0, status: false},
            {badge: "", level: 0, status: false},
            {badge: "", level: 0, status: false},
            {badge: "", level: 0, status: false}];
  
  newStaff = {index: 0, fname: "", lname: "", position: "", salary: 0, email: "", phone: "", userbgroups: this.newBGs, active: false, brief:"", others: []}

  constructor(
      private _staffService: StaffService, 
      private _badgeService: BadgeService,
      private _router: Router,
      private auth: AuthService) {}

  ngOnInit() {
    this.getBadges();
  }

  getBadges() {
    this._badgeService.getBadges().subscribe(badges => { this.badges = badges});
  }

  addStaff() {
    for (var i = 0; i < this.newStaff.userbgroups.length; i++) { 
      if (this.newStaff.userbgroups[i].level != 0) {
        this.newStaff.userbgroups[i].level = +this.newStaff.userbgroups[i].level;
      }
    }
    this.newStaff.userbgroups.sort(this.toCompare);
    let value = JSON.stringify(this.newStaff)
    this._staffService.addStaff(value).subscribe();
    console.log('you submitted value: ', value); 
    this.toStaffs();
  }

  toCompare(a,b) {
    if (a.badge < b.badge)
      return -1;
    else if (a.badge > b.badge)
      return 1;
    else 
      return 0;
  }

  toStaffs() {
    this._router.navigate(['/staffs']);
    location.reload();
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
        if (this.badges[i].inused) {
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
    return levelsOptions.sort();
  }

  goBack() {
    window.history.back();
  }

}

