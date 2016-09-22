"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var badge_detail_component_1 = require('../badge/badge-detail/badge-detail.component');
var badge_service_1 = require('../badge/badge.service');
var auth_service_1 = require('../auth/auth.service');
var filter_array_pipe_1 = require('../pipe/filter-array-pipe');
var MarketComponent = (function () {
    function MarketComponent(_router, auth, _badgeService) {
        this._router = _router;
        this.auth = auth;
        this._badgeService = _badgeService;
    }
    MarketComponent.prototype.ngOnInit = function () {
        this.getMarketBadges();
    };
    MarketComponent.prototype.getMarketBadges = function () {
        var _this = this;
        this._badgeService.getMarketBadges().subscribe(function (marketBadges) { _this.marketBadges = marketBadges; });
    };
    MarketComponent.prototype.onSelect = function (badge) {
        this.selectedBadge = badge;
    };
    MarketComponent.prototype.toDetail = function () {
        this._router.navigate(['/badge/detail', this.selectedBadge._id]);
    };
    MarketComponent = __decorate([
        core_1.Component({
            selector: 'my-market',
            templateUrl: 'app/components/market/market.component.html',
            styleUrls: ['app/components/market/market.component.css'],
            directives: [badge_detail_component_1.BadgeDetailComponent],
            pipes: [filter_array_pipe_1.FilterArrayPipe]
        }), 
        __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthService, badge_service_1.BadgeService])
    ], MarketComponent);
    return MarketComponent;
}());
exports.MarketComponent = MarketComponent;
//# sourceMappingURL=market.component.js.map