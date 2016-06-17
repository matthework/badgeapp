import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Router} from 'angular2/router';
import {Staff} from '../staff';
import {StaffService} from '../staff.service';
import {Validators,FormBuilder,ControlGroup,AbstractControl,Control} from 'angular2/common';
import {Badge} from '../../badge/badge';
import {BadgeService} from '../../badge/badge.service';

@Component({
  selector: 'my-staff-new',
  templateUrl: 'app/components/staff/staff-new/staff-new.component.html',
  styleUrls: ['app/components/staff/staff-new/staff-new.component.css']
})

export class StaffNewComponent {
  
  // title: string = "Add New Staff";
  badges: Badge[] = [];
  active = false;
  nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  brief = 0;

  newBGs = [{badge: "", level: 0},
          {badge: "", level: 0},
          {badge: "", level: 0},
          {badge: "", level: 0},
          {badge: "", level: 0},
          {badge: "", level: 0},
          {badge: "", level: 0},
          {badge: "", level: 0},
          {badge: "", level: 0},
          {badge: "", level: 0}];
  
  newStaff = {index: 0, fname: "", lname: "", position: "", salary: "", email: "", phone: "", badgegroups: this.newBGs, others: []}

  constructor(
      private _staffService: StaffService, 
      private _badgeService: BadgeService,
      private _router: Router,
      private _routeParams: RouteParams) {}

  ngOnInit() {
    this.getBadges();
  }

  getBadges() {
    this._badgeService.getBadges().subscribe(badges => { this.badges = badges});
  }

  addStaff() {
    for (var i = 0; i < this.newStaff.badgegroups.length; i++) { 
      if (this.newStaff.badgegroups[i].level != 0) {
        this.newStaff.badgegroups[i].level = +this.newStaff.badgegroups[i].level;
      }
    }
    if (this.newStaff.salary == "") {
      this.newStaff.salary = "$";
    }
    let value = JSON.stringify(this.newStaff)
    this._staffService.addStaff(value).subscribe();
    console.log('you submitted value: ', value); 
    this.toStaffs();
  }

  toStaffs() {
    this._router.navigate(['Staffs']);
    // location.reload();
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
        badgesOptions.push(this.badges[i].name);
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

