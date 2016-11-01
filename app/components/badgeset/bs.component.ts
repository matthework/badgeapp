import {Component,OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';

import {BadgeSet} from './bs';
import {BadgeGroup} from './bs';
import {Badge} from '../badge/badge';
import {Tier} from '../tier/tier';
import {BSDetailComponent} from './bs-detail/bs-detail.component';
import {BSService} from './bs.service';
import {BadgeService} from '../badge/badge.service';
import {TierService} from '../tier/tier.service';
import {AuthService} from '../auth/auth.service';

import {FilterArrayPipe} from '../pipe/filter-array-pipe';
import {YesNoPipe} from '../pipe/yes-no-pipe';

@Component({
	selector: 'my-badgeset',
	templateUrl: 'app/components/badgeset/bs.component.html',
	styleUrls: ['app/components/badgeset/bs.component.css'],
	directives: [],
	pipes: [FilterArrayPipe,YesNoPipe]
})

export class BSComponent implements OnInit {

	badges: Badge[] = [];
	badgesets: BadgeSet[] = [];
	tiers: Tier[] = [];
	selectedBadgeSet: BadgeSet;
	active = true;
	gmap = {"A":0, "B":1, "C":2, "D":3, "E":4, "F":5};
	desc = "";
	level = 0;
	showBS = false;
	showCompare = false;
	bsname1 = "";
	bsname2 = "";
	bsname3 = "";
    labels = [  "I understand... ", 
          "I participate... ", 
          "I contribute... ", 
          "I lead... ", 
          "I advise... ", 
          "I can teach... ", 
          "I plan sophisticated... ",
          "I have achieved wide recognition... ", 
          "I am a world leading... "
        ];

	constructor (
		private _router: Router,
		private _bsService: BSService,
		private _badgeService: BadgeService,
		private _tierService: TierService,
		private auth: AuthService) {}

	ngOnInit() {
		this.getBadgeSets();
		this.getBadges();
		this.getTiers();
	}

	getBadgeSets() {
		this._bsService.getBadgeSets().subscribe(badgesets => { this.badgesets = badgesets});
		if (this.badgesets == null) {
			this.active = true;
		}
		// this.badgesets.sort(this.toCompare);
	}

	// toCompare(a,b) {
	// 	if (a.index < b.index)
	// 		return -1;
	// 	else if (a.index > b.index)
	// 		return 1;
	// 	else 
	// 		return 0;
	// }

	getBadges() {
		this._badgeService.getBadges().subscribe(badges => { this.badges = badges});
	}

	getTiers() {
		this._tierService.getTiers().subscribe(tiers => { this.tiers = tiers});
	}

	onSelect(badgeset: BadgeSet) { 
		this.selectedBadgeSet = badgeset;
	}

	toBSDetail(bsid:string) {
		this._router.navigate(['/bs/detail',bsid]);
	}

	addBadgeSet() {
		this._router.navigate(['/bs/new']);
	}

	removeBadgeSet(id:string) {
		this._bsService.deleteBadgeSet(id).subscribe();
		location.reload();
	}

	deleteBadgeSetPop(id:string) {
		var r = confirm("Are you sure you want to delete this BadgeSet ?");
		if (r == true) {
			this.removeBadgeSet(id);
		}
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

	getDesc(bid:string, l:number) {
		this.desc = "";
		if (this.badges != null && l > 0 && bid != "") {
			for (var i = 0; i < this.badges.length; i++) { 
				if (this.badges[i]._id == bid) {
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

	groupByTag(tag) {
		var bsets = [];
		if (this.badgesets != null) {
			for (var i = 0; i < this.badgesets.length; i++) { 
				if (this.badgesets[i].tags.indexOf(tag) != -1) {
					this.badgesets[i].tags = [tag];
					bsets.push(this.badgesets[i]);
				}
			}
		}
		this.badgesets = bsets;
	}

	toBadgeSets() {
		this._router.navigate(['/badgeset']);
		location.reload();
	}

	toBadgeDetail(bid:string) {
		this._router.navigate(['/badge/detail',bid]);
	}

	getComBS() {
		if (this.badgesets != null) {
			this.bsname1 = this.badgesets[0].name;
			this.bsname2 = this.badgesets[0].name;
			this.bsname3 = this.badgesets[0].name;
		}else {
			this.bsname1 = "";
			this.bsname2 = "";
			this.bsname3 = "";
		}
	}

	getBS(bsname:string) {
		var result: BadgeSet;
		if (this.badgesets != null) {
			for (var i = 0; i < this.badgesets.length; i++) { 
				if (this.badgesets[i].name == bsname) {
					return this.badgesets[i];
				}
			}
		}
		return result;
	}

	// checkCore(bs:BadgeSet,bid:string) {
	// 	var result = "";
	// 	if (bs != null) {
	// 		for (var i = 0; i < bs.corebadges.length; i++) { 
	// 			if (bs.corebadges[i].bid == bid) {
	// 				result = " ** ";
	// 			}
	// 		}
	// 	}
	// 	return result;
	// }

	getMoney(bg:BadgeGroup[],m:number,l:number) {
		var result = 0;
		var totalLevels = 0;
		for (var i = 0; i < bg.length; i++) { 
			totalLevels += bg[i].level;
		}
		result = Math.round(m*1000/totalLevels*l);
		return result;
	}

	getBadgeName(bid:string) {
		var bname = "";
		for (var i = 0; i < this.badges.length; i++) { 
			if(this.badges[i]._id == bid) {
				bname = this.badges[i].name;		
			}
		}
		return bname;
	}

}



