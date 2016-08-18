import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

import {Staff,BadgeGroup} from '../staff';
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
    newBadge = "";
    newLevel = 0;
    brief = 0;
    sub: any;
    id: string;

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
        // location.reload();
    }

    updateStaff() {
        // pasrse string into number
        for (var i = 0; i < this.staff.badgegroups.length; i++) { 
            this.staff.badgegroups[i].level = +this.staff.badgegroups[i].level;
        }
        if (this.staff.salary == "") {
            this.staff.salary = "$";
        }
        let value = JSON.stringify(this.staff)
        this._staffService.updateStaff(this.id,value).subscribe();
        console.log('you submitted value: ', value); 
        this.toStaffs();
    }

    addStaff() {
        this._router.navigate(['/staff/new']);
    }

    addBadgeGroup() {
        this.newLevel = +this.newLevel;
        this.staff.badgegroups.push({badge: this.newBadge, level: this.newLevel});
        let value = JSON.stringify(this.staff)
        // this._staffService.updateStaff(id,value).subscribe();
        console.log('you submitted value: ', value);
        this.newBadge = "";
        this.newLevel = 0;
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

    deleteBadgeGroupPop(selectedGroup: BadgeGroup) {
        var name = this.staff.fname.toUpperCase() + " " + this.staff.lname.toUpperCase();
        var badge = selectedGroup.badge.toUpperCase();
        var level = selectedGroup.level;
        var r = confirm("Are you sure you want to delete "+ badge + " " + level + " from " + name +" ?");
        if (r == true) {
            this.removeBadgeGroup(selectedGroup);
        }
    }

    removeBadgeGroup(selectedGroup: BadgeGroup) {
        let index = this.staff.badgegroups.indexOf(selectedGroup);
        this.staff.badgegroups.splice(index,1);
        let value = JSON.stringify(this.staff)
        // this._staffService.updateStaff(id,value).subscribe();
        console.log('you submitted value: ', value);
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
            // console.log('getBadgesOptions: ', badgesOptions);
            return badgesOptions.sort();
        }
    }

    getLevelsOptions(bname: string) {
        var levelsOptions = [];
        for (var i = 0; i < this.badges.length; i++) { 
            if (this.badges[i].name == bname) {
                for (var j = 0; j < this.badges[i].badgelevels.length; j++) { 
                    levelsOptions.push(this.badges[i].badgelevels[j].level);
                }
            }
        }
        // console.log('getBadgesOptions: ', badgesOptions);
        return levelsOptions.sort();
    }

    goBack() {
        window.history.back();
    }

}

