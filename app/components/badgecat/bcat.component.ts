import {Component,OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';

import {BadgeCat} from './bcat';
import {Badge} from '../badge/badge';
import {BCatEditComponent} from './bcat-edit/bcat-edit.component';
import {BCatService} from './bcat.service';
import {BadgeService} from '../badge/badge.service';
import {AuthService} from '../auth/auth.service';

import {FilterArrayPipe} from '../pipe/filter-array-pipe';
import {YesNoPipe} from '../pipe/yes-no-pipe';

@Component({
	selector: 'my-badgecat',
	templateUrl: 'app/components/badgecat/bcat.component.html',
	styleUrls: ['app/components/badgecat/bcat.component.css'],
	directives: [BCatEditComponent],
	pipes: [FilterArrayPipe,YesNoPipe]
})

export class BCatComponent implements OnInit {

	badgecats: BadgeCat[] = [];
	badges: Badge[] = [];
	selectedBadgeCat: BadgeCat;
	active = false;

	constructor (
		private _router: Router,
		private _bcatService: BCatService,
		private _badgeService: BadgeService,
		private auth: AuthService) {}

	ngOnInit() {
		this.getBadgeCats();
		this.getBadges();
	}

	getBadgeCats() {
		this._bcatService.getBadgeCats().subscribe(badgecats => { this.badgecats = badgecats});
		if (this.badgecats == null) {
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

	toBadges() {
		this._router.navigate(['/badges']);
	}

	onSelect(badgecat: BadgeCat) { 
		this.selectedBadgeCat = badgecat;
	}

	toBCatEdit(bcatid:string) {
		this._router.navigate(['/bcat/edit',bcatid]);
	}

	addBadgeCat() {
		this._router.navigate(['/bcat/new']);
	}

	removeBadgeCat(id:string) {
		this._bcatService.deleteBadgeCat(id).subscribe();
		location.reload();
	}

	deleteBadgeCatPop(id:string) {
		var r = confirm("Are you sure you want to delete this Badge Category ?");
		if (r == true) {
			this.removeBadgeCat(id);
		}
	}

	toBadgeCats() {
		this._router.navigate(['/badgecat']);
		location.reload();
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

}



