import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Badge} from '../badge/badge';
import {BadgeDetailComponent} from '../badge/badge-detail/badge-detail.component';
import {BadgeService} from '../badge/badge.service';

import {AuthService} from '../auth/auth.service';
import {FilterArrayPipe} from '../pipe/filter-array-pipe';

@Component({
    selector: 'my-market',
    templateUrl: 'app/components/market/market.component.html',
    styleUrls: ['app/components/market/market.component.css'],
    directives: [BadgeDetailComponent],
    pipes: [FilterArrayPipe]
})

export class MarketComponent {

	selectedBadge: Badge;
	marketBadges: Badge[];

	constructor(
		private _router: Router,
		private auth: AuthService,
		private _badgeService: BadgeService) {}

	ngOnInit() {
    	this.getMarketBadges();
  	}

	getMarketBadges() {
		this._badgeService.getMarketBadges().subscribe(marketBadges => { this.marketBadges = marketBadges});
	}

	onSelect(badge: Badge) { 
		this.selectedBadge = badge;
	}

	toDetail() {
		this._router.navigate(['/badge/detail', this.selectedBadge._id]);
	}

}
