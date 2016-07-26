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
var auth_service_1 = require('../../auth/auth.service');
var TierEditComponent = (function () {
    function TierEditComponent(_tierService, _router, route, auth) {
        this._tierService = _tierService;
        this._router = _router;
        this.route = route;
        this.auth = auth;
    }
    TierEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.getTier();
    };
    TierEditComponent.prototype.getTier = function () {
        var _this = this;
        console.log('id from _routeParams: ', this.id);
        this._tierService.getTier(this.id).subscribe(function (tier) { _this.tier = tier; });
    };
    TierEditComponent.prototype.toTiers = function () {
        this._router.navigate(['/tiers']);
        // location.reload();
    };
    TierEditComponent.prototype.updateTier = function () {
        var value = JSON.stringify(this.tier);
        this._tierService.updateTier(this.id, value).subscribe();
        console.log('you submitted value: ', value);
        this.toTiers();
    };
    TierEditComponent.prototype.addTier = function () {
        this._router.navigate(['/tier/new']);
    };
    TierEditComponent.prototype.removeTier = function () {
        this._tierService.deleteTier(this.id).subscribe();
        this.toTiers();
    };
    TierEditComponent.prototype.deleteTierPop = function () {
        var tier = this.tier.tier;
        var r = confirm("Are you sure you want to delete Tier: " + tier + " ?");
        if (r == true) {
            this.removeTier();
        }
    };
    TierEditComponent.prototype.goBack = function () {
        window.history.back();
    };
    TierEditComponent = __decorate([
        core_1.Component({
            selector: 'my-tier-edit',
            templateUrl: 'app/components/tier/tier-edit/tier-edit.component.html',
            styleUrls: ['app/components/tier/tier-edit/tier-edit.component.css']
        }), 
        __metadata('design:paramtypes', [tier_service_1.TierService, router_1.Router, router_1.ActivatedRoute, auth_service_1.AuthService])
    ], TierEditComponent);
    return TierEditComponent;
}());
exports.TierEditComponent = TierEditComponent;
//# sourceMappingURL=tier-edit.component.js.map