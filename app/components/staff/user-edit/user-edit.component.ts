import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

import {Staff,UserBGroup} from '../staff';
import {StaffService} from '../staff.service';
import {Badge} from '../../badge/badge';
import {BadgeService} from '../../badge/badge.service';
import {AuthService} from '../../auth/auth.service';

@Component({
    selector: 'my-user-edit',
    templateUrl: 'app/components/staff/user-edit/user-edit.component.html',
    styleUrls: ['app/components/staff/user-edit/user-edit.component.css']
})

export class UserEditComponent implements OnInit {

    staff: Staff;
    badges: Badge[] = [];
    active = false;
    newBID = "";
    newLevel = 0;
    newFocus = [];
    newStatus = false;
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

    toUserDetail(email:string) {
        this._router.navigate(['/user/detail',email]);
        location.reload();
    }

    updateStaff() {
        let value = JSON.stringify(this.staff)
        this._staffService.updateStaff(this.id,value).subscribe();
        console.log('you submitted value: ', value); 
        this.toUserDetail(this.staff.email);
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
        this.newFocus = [];
        this.newStatus = false;
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

    // getBadgesOptions() {
    //     var badgesOptions = [];
    //     if (this.badges != null) {
    //         for (var i = 0; i < this.badges.length; i++) { 
    //             if (this.badges[i].status=='Accepted') {
    //                 badgesOptions.push([this.badges[i]._id,this.badges[i].name]);
    //             }
    //         }
    //         // console.log('getBadgesOptions: ', badgesOptions);
    //         return badgesOptions.sort();
    //     }
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

    goBack() {
        window.history.back();
    }

}

