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
var TierNewComponent = (function () {
    function TierNewComponent(_tierService, _router, auth) {
        this._tierService = _tierService;
        this._router = _router;
        this.auth = auth;
        this.newGrades = [0, 0, 0, 0, 0, 0];
        this.newTier = { index: 0, tier: 0, grades: this.newGrades, judgement: "", expertise: "" };
    }
    TierNewComponent.prototype.addTier = function () {
        // this.newTier.grades = this.newTier.grades.filter(this.checkEmpty);
        var value = JSON.stringify(this.newTier);
        this._tierService.addTier(value).subscribe();
        console.log('you submitted value: ', value);
        this.toTiers();
    };
    TierNewComponent.prototype.toTiers = function () {
        this._router.navigate(['/tiers']);
        location.reload();
    };
    TierNewComponent.prototype.goBack = function () {
        window.history.back();
    };
    TierNewComponent = __decorate([
        core_1.Component({
            selector: 'my-tier-new',
            templateUrl: 'app/components/tier/tier-new/tier-new.component.html',
            styleUrls: ['app/components/tier/tier-new/tier-new.component.css']
        }), 
        __metadata('design:paramtypes', [tier_service_1.TierService, router_1.Router, auth_service_1.AuthService])
    ], TierNewComponent);
    return TierNewComponent;
}());
exports.TierNewComponent = TierNewComponent;
//# sourceMappingURL=tier-new.component.js.map