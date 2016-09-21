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
var tier_service_1 = require('./tier.service');
var bs_service_1 = require('../badgeset/bs.service');
var auth_service_1 = require('../auth/auth.service');
var filter_array_pipe_1 = require('../pipe/filter-array-pipe');
var TierComponent = (function () {
    function TierComponent(_tierService, _bsService, _router, auth) {
        this._tierService = _tierService;
        this._bsService = _bsService;
        this._router = _router;
        this.auth = auth;
        this.tiers = [];
        this.active = false;
        this.badgesets = [];
        this.toPay = false;
        this.tedit = false;
        this.gmap = { 0: "A", 1: "B", 2: "C", 3: "D", 4: "E", 5: "F" };
    }
    TierComponent.prototype.ngOnInit = function () {
        this.getTiers();
        this.getBadgeSets();
    };
    TierComponent.prototype.getTier = function () {
        var _this = this;
        console.log('id from _routeParams: ', this.selectedTier._id);
        this._tierService.getTier(this.selectedTier._id).subscribe(function (tier) { _this.tier = tier; });
    };
    TierComponent.prototype.getTiers = function () {
        var _this = this;
        this._tierService.getTiers().subscribe(function (tiers) { _this.tiers = tiers; });
    };
    TierComponent.prototype.getBadgeSets = function () {
        var _this = this;
        this._bsService.getBadgeSets().subscribe(function (badgesets) { _this.badgesets = badgesets; });
    };
    TierComponent.prototype.onSelect = function (tier) {
        this.selectedTier = tier;
    };
    TierComponent.prototype.toTierDetail = function (tid) {
        this._router.navigate(['/tier/detail', tid]);
    };
    TierComponent.prototype.addTier = function () {
        this._router.navigate(['/tier/new']);
    };
    TierComponent.prototype.removeTier = function (id) {
        this._tierService.deleteTier(id).subscribe();
        location.reload();
    };
    TierComponent.prototype.deleteTierPop = function (id) {
        var r = confirm("Are you sure you want to delete this Tier ?");
        if (r == true) {
            this.removeTier(id);
        }
    };
    TierComponent.prototype.getTierGradeBS = function (t, g) {
        var bset = [];
        if (this.badgesets != null) {
            for (var i = 0; i < this.badgesets.length; i++) {
                if (this.badgesets[i].tier == t && this.badgesets[i].grade == g && this.badgesets[i].status == 'Accepted') {
                    bset.push(this.badgesets[i]);
                }
            }
        }
        // console.log('you submitted value: ', bset); 
        return bset;
    };
    TierComponent.prototype.toBSDetail = function (bsid) {
        this._router.navigate(['/bs/detail', bsid]);
    };
    TierComponent.prototype.toTiers = function () {
        this._router.navigate(['/tiers']);
        location.reload();
    };
    TierComponent.prototype.updateTier = function (t) {
        var value = JSON.stringify(t);
        this._tierService.updateTier(t._id, value).subscribe();
        console.log('you submitted value: ', value);
    };
    TierComponent.prototype.checkAdmin = function () {
        if (this.auth.isAdmin()) {
            this.tedit = true;
        }
    };
    TierComponent = __decorate([
        core_1.Component({
            selector: 'my-tier',
            templateUrl: 'app/components/tier/tier.component.html',
            styleUrls: ['app/components/tier/tier.component.css'],
            directives: [],
            pipes: [filter_array_pipe_1.FilterArrayPipe]
        }), 
        __metadata('design:paramtypes', [tier_service_1.TierService, bs_service_1.BSService, router_1.Router, auth_service_1.AuthService])
    ], TierComponent);
    return TierComponent;
}());
exports.TierComponent = TierComponent;
//# sourceMappingURL=tier.component.js.map