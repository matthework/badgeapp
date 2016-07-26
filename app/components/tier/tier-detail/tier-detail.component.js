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
var tier_service_1 = require('../tier.service');
var bs_service_1 = require('../../badgeset/bs.service');
var auth_service_1 = require('../../auth/auth.service');
var TierDetailComponent = (function () {
    function TierDetailComponent(_tierService, _bsService, _router, route, auth) {
        this._tierService = _tierService;
        this._bsService = _bsService;
        this._router = _router;
        this.route = route;
        this.auth = auth;
        this.badgesets = [];
        this.gradesIndex = [0, 1, 2, 3, 4, 5];
        this.gmap = { 0: "A", 1: "B", 2: "C", 3: "D", 4: "E", 5: "F" };
    }
    TierDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.getTier();
        this.getBadgeSets();
    };
    TierDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    TierDetailComponent.prototype.getTier = function () {
        var _this = this;
        console.log('id from _routeParams: ', this.id);
        this._tierService.getTier(this.id).subscribe(function (tier) { _this.tier = tier; });
    };
    TierDetailComponent.prototype.getBadgeSets = function () {
        var _this = this;
        this._bsService.getBadgeSets().subscribe(function (badgesets) { _this.badgesets = badgesets; });
    };
    TierDetailComponent.prototype.toTiers = function () {
        this._router.navigate(['/tiers']);
        // location.reload();
    };
    TierDetailComponent.prototype.toTierEdit = function (tid) {
        this._router.navigate(['/tier/edit', tid]);
    };
    TierDetailComponent.prototype.getTierBS = function (t) {
        var bset = [];
        for (var i = 0; i < this.badgesets.length; i++) {
            if (this.badgesets[i].tier == t) {
                bset.push(this.badgesets[i]);
            }
        }
        return bset;
    };
    TierDetailComponent.prototype.getTierGradeBS = function (t, g) {
        var bset = [];
        for (var i = 0; i < this.badgesets.length; i++) {
            if (this.badgesets[i].tier == t && this.badgesets[i].grade == g) {
                bset.push(this.badgesets[i]);
            }
        }
        return bset;
    };
    TierDetailComponent.prototype.toBSDetail = function (bsid) {
        this._router.navigate(['/bs/detail', bsid]);
    };
    TierDetailComponent.prototype.goBack = function () {
        window.history.back();
    };
    TierDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-tier-detail',
            templateUrl: 'app/components/tier/tier-detail/tier-detail.component.html',
            styleUrls: ['app/components/tier/tier-detail/tier-detail.component.css']
        }), 
        __metadata('design:paramtypes', [tier_service_1.TierService, bs_service_1.BSService, router_1.Router, router_1.ActivatedRoute, auth_service_1.AuthService])
    ], TierDetailComponent);
    return TierDetailComponent;
}());
exports.TierDetailComponent = TierDetailComponent;
//# sourceMappingURL=tier-detail.component.js.map