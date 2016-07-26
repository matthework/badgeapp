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
var badge_service_1 = require('./badge/badge.service');
var staff_service_1 = require('./staff/staff.service');
var tier_service_1 = require('./tier/tier.service');
var bs_service_1 = require('./badgeset/bs.service');
var bcat_service_1 = require('./badgecat/bcat.service');
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'My Badge App!';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/components/app.component.html',
            styleUrls: ['app/components/app.component.css'],
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [
                badge_service_1.BadgeService,
                staff_service_1.StaffService,
                tier_service_1.TierService,
                bs_service_1.BSService,
                bcat_service_1.BCatService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map