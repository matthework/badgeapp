import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Badge} from '../badge/badge';
import {BadgeService} from '../badge/badge.service';
import {BadgeSet,BadgeGroup} from '../badgeset/bs';
import {BSService} from '../badgeset/bs.service';
import {Staff,UserBGroup} from '../staff/staff';
import {StaffService} from '../staff/staff.service';
import {Tier} from '../tier/tier';
import {TierService} from '../tier/tier.service';

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
	tiers: Tier[] = [];
	email: string;
	gmap = {"A":0, "B":1, "C":2, "D":3, "E":4, "F":5};
	sortStaffBS = [];
	
	constructor(private auth: AuthService,
				private _router: Router,
				private _staffService: StaffService,
				private _badgeService: BadgeService,
    			private _bsService: BSService,
    			private _tierService: TierService) {}

	ngOnInit() {
		if (this.auth.userProfile) {
			this.email = this.auth.userProfile.email;
			this.getStaffByEmail();
		}
	    this.getBadges();
    	this.getBadgeSets();
    	this.getStaffs();
    	this.getTiers();
	}

	getStaffs() {
		this._staffService.getStaffs().subscribe(staffs => { this.staffs = staffs});
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


