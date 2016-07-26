import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Staff,BadgeGroup} from './staff';
import {StaffEditComponent} from './staff-edit/staff-edit.component';
import {StaffService} from './staff.service';
import {Badge} from '../badge/badge';
import {BadgeService} from '../badge/badge.service';
import {FilterArrayPipe} from '../pipe/filter-array-pipe';
import {BadgeSet} from '../badgeset/bs';
import {BSService} from '../badgeset/bs.service';
import {Tier} from '../tier/tier';
import {TierService} from '../tier/tier.service';

@Component({
	selector: 'my-staff',
	templateUrl: 'app/components/staff/staff.component.html',
	styleUrls: ['app/components/staff/staff.component.css'],
	directives: [StaffEditComponent],
	pipes: [FilterArrayPipe]
})
export class StaffComponent {

	// title: string = "Staff";
	staffs: Staff[] = [];
	badges: Badge[] = [];
	badgesets: BadgeSet[] = [];
	tiers: Tier[] = [];
	selectedStaff: Staff;
	active = false;
	desc = "";
	level = 0;
	showBS = false;
	gmap = {"A":0, "B":1, "C":2, "D":3, "E":4, "F":5};
	sortStaffBS = [];

	constructor(
		private _staffService: StaffService,  
		private _badgeService: BadgeService,
		private _bsService: BSService,
		private _tierService: TierService,
		private _router: Router) {}

	ngOnInit() {
		this.getStaffs();
		this.getBadges();
		this.getBadgeSets();
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

	onSelect(staff: Staff) { 
		this.selectedStaff = staff; 
	}

	toStaffs() {
		this._router.navigate(['/staffs']);
		// location.reload();
	}

	toStaffEdit(sid:string) {
		this._router.navigate(['/staff/edit',sid]);
	}
	
	toStaffDetail(sid:string) {
		this._router.navigate(['/staff/detail',sid]);
	}

	addStaff() {
		this._router.navigate(['/staff/new']);
	}

	removeStaff(id:string) {
		this._staffService.deleteStaff(id).subscribe();
		location.reload();
	}

	deleteStaffPop(id:string) {
		var r = confirm("Are you sure you want to delete this Staff ?");
		if (r == true) {
			this.removeStaff(id);
		}
	}

	getDesc(b:string, l:number) {
		this.desc = "";
		if (this.badges != null && l > 0 && b != "") {
			for (var i = 0; i < this.badges.length; i++) { 
				if (this.badges[i].name == b) {
					for (var j = 0; j < this.badges[i].badgelevels.length; j++) { 
						if (this.badges[i].badgelevels[j].level == l) {
								this.desc = this.badges[i].badgelevels[j].desc;
						}
					}
				}
			}
		}
		return this.desc;
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

	getTopStaffBS(sbgs:BadgeGroup[]) {
		var topBS = [];
		if (this.getSortStaffBS(sbgs) !=null && this.getSortStaffBS(sbgs).length > 0) {
			topBS.push(this.getSortStaffBS(sbgs)[0]._id);
			topBS.push(this.getSortStaffBS(sbgs)[0].name);
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

	toBSDetail(bsid:string){
		this._router.navigate(['/bs/detail',bsid]);
	}

}


