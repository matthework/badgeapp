import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Badge} from '../badge/badge';
import {BadgeService} from '../badge/badge.service';
import {BadgeSet,BadgeGroup} from '../badgeset/bs';
import {BSService} from '../badgeset/bs.service';
import {Staff,UserBGroup} from '../staff/staff';
import {StaffService} from '../staff/staff.service';

import {AuthService} from '../auth/auth.service';

import {ApprovedPipe} from '../pipe/approved-pipe';

@Component({
    selector: 'my-main',
    templateUrl: 'app/components/main/main.component.html',
    styleUrls: ['app/components/main/main.component.css'],
    pipes: [ApprovedPipe]
})

export class MainComponent implements OnInit{

  	badges: Badge[] = [];
  	badgesets: BadgeSet[] = [];
	staffs: Staff[] = [];
	staff: Staff;
	email: string;
	sortStaffBS = [];
	
	constructor(private auth: AuthService,
				private _router: Router,
				private _staffService: StaffService,
				private _badgeService: BadgeService,
    			private _bsService: BSService) {}

	ngOnInit() {
		if (this.auth.userProfile) {
			this.email = this.auth.userProfile.email;
			this.getStaffByEmail();
		}
    	this.getStaffs();
	}

	getStaffs() {
		this._staffService.getStaffs().subscribe(staffs => { this.staffs = staffs});
	}

	getStaffByEmail() {
		
		console.log('email from _routeParams: ', this.email); 
		this._staffService.getStaffByEmail(this.email).subscribe((staff) => {this.staff = staff;});
	}

	checkProfile() {
		var hasProfile = false;
		if (this.auth.userProfile != null && this.staffs != null) {
			for (var i = 0; i < this.staffs.length; i++) { 
				var name = this.staffs[i].fname + " " + this.staffs[i].lname;
				if(this.staffs[i].email==this.auth.userProfile.email){
					hasProfile = true;
					break;
				}
			}
		}
		// console.log('you submitted value: ', hasProfile); 
		return hasProfile;
	}

	addNewUser(email:string) {
		this._router.navigate(['/user/new',email]);
	}

	toUserDetail(email:string) {
		this._router.navigate(['/user/detail',email]);
	}

	toPerson() {
		this._router.navigate(['/staffs']);
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

	checkNumPending() {
		var numOfPending = 0;
		if (this.staffs != null && this.staffs.length != 0) {
			for (var i = 0; i < this.staffs.length; i++) { 
				for (var j = 0; j < this.staffs[i].userbgroups.length; j++) { 
					if (!this.staffs[i].userbgroups[j].status) {
						numOfPending += 1;
					}
				}
			}
		}else {
			numOfPending = 0;
		}
		return numOfPending;
	}

	checkPendingStaff() {
		var numOfStaff = 0;
		if (this.staffs != null && this.staffs.length != 0) {
			for (var i = 0; i < this.staffs.length; i++) { 
				var b = false;
				for (var j = 0; j < this.staffs[i].userbgroups.length; j++) { 
					if (!this.staffs[i].userbgroups[j].status) {
						b = true;
					}
				}
				if (b) {
					numOfStaff += 1;
				}
			}
		}else {
			numOfStaff = 0;
		}
		return numOfStaff;
	}
}


