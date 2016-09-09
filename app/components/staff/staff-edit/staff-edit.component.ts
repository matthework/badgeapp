import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

import {Staff,UserBGroup} from '../staff';
import {StaffService} from '../staff.service';
import {Badge} from '../../badge/badge';
import {BadgeService} from '../../badge/badge.service';
import {AuthService} from '../../auth/auth.service';

@Component({
    selector: 'my-staff-edit',
    templateUrl: 'app/components/staff/staff-edit/staff-edit.component.html',
    styleUrls: ['app/components/staff/staff-edit/staff-edit.component.css']
})

export class StaffEditComponent implements OnInit {

    staff: Staff;
    badges: Badge[] = [];
    active = false;
    newBID = "";
    newLevel = 0;
    newFocus = [];
    newStatus = false;
    sub: any;
    id: string;
    statusOptions = ['Active','Inactive'];

    constructor(
        private _staffService: StaffService, 
        private _badgeService: BadgeService,
        private _router: Router,
        private route: ActivatedRoute,
        private auth: AuthService) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.getStaff();
        this.getBadges();
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

    toStaffs() {
        this._router.navigate(['/staffs']);
        location.reload();
    }

    updateStaff() {
        // pasrse string into number
        for (var i = 0; i < this.staff.userbgroups.length; i++) { 
            this.staff.userbgroups[i].level = +this.staff.userbgroups[i].level;
        }
        this.staff.userbgroups.sort(this.toCompare);
        let value = JSON.stringify(this.staff)
        this._staffService.updateStaff(this.id,value).subscribe();
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
  
    addStaff() {
        this._router.navigate(['/staff/new']);
    }

    addBadgeGroup() {
        this.newLevel = +this.newLevel;
        this.staff.userbgroups.push({bid: this.newBID, badge: "", level: this.newLevel, focus: this.newFocus, status: this.newStatus});
        let value = JSON.stringify(this.staff)
        // this._staffService.updateStaff(id,value).subscribe();
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

    getNewBadgesOptions() {
        var badgesOptions = [];
        var userbgs = [];
        if (this.staff.userbgroups != null) {
            for (var j = 0; j < this.staff.userbgroups.length; j++) { 
                userbgs.push(this.staff.userbgroups[j].bid);
            }
        }
        if (this.badges != null) {
            for (var i = 0; i < this.badges.length; i++) { 
                let index = userbgs.indexOf(this.badges[i]._id);
                if (this.badges[i].status=='Accepted') { // && index == -1) {
                    badgesOptions.push([this.badges[i].name,this.badges[i]._id]);
                }
            }
        }
        return badgesOptions.sort();
    }

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
  
    goBack() {
        window.history.back();
    }

}

