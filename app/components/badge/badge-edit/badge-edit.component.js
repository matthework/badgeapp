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
var badge_service_1 = require('../badge.service');
var auth_service_1 = require('../../auth/auth.service');
var BadgeEditComponent = (function () {
    function BadgeEditComponent(_badgeService, _router, route, auth) {
        this._badgeService = _badgeService;
        this._router = _router;
        this.route = route;
        this.auth = auth;
        this.active = false;
        this.newLevel = 0;
        this.newDesc = "";
    }
    BadgeEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.getBadge();
    };
    BadgeEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    BadgeEditComponent.prototype.getBadge = function () {
        var _this = this;
        console.log('id from _routeParams: ', this.id);
        this._badgeService.getBadge(this.id).subscribe(function (badge) { _this.badge = badge; });
    };
    BadgeEditComponent.prototype.toBadges = function () {
        this._router.navigate(['/badges']);
        // location.reload();
    };
    BadgeEditComponent.prototype.toBadgeDetail = function () {
        this._router.navigate(['/badge/detail', this.id]);
        // location.reload();
    };
    BadgeEditComponent.prototype.updateBadge = function () {
        this.badge.code = this.badge.code.toUpperCase();
        var value = JSON.stringify(this.badge);
        this._badgeService.updateBadge(this.id, value).subscribe();
        console.log('you submitted value: ', value);
        this.toBadgeDetail();
    };
    BadgeEditComponent.prototype.addBadge = function () {
        this._router.navigate(['/badge/new']);
    };
    BadgeEditComponent.prototype.removeBadge = function () {
        this._badgeService.deleteBadge(this.id).subscribe();
        this.toBadges();
    };
    BadgeEditComponent.prototype.deleteBadgePop = function () {
        var name = this.badge.name;
        var r = confirm("Are you sure you want to delete Badge: " + name.toUpperCase() + " ?");
        if (r == true) {
            this.removeBadge();
        }
    };
    BadgeEditComponent.prototype.addBadgeLevel = function () {
        this.badge.badgelevels.push({ level: this.newLevel, desc: this.newDesc });
        this.badge.badgelevels.sort(this.toCompare);
        var value = JSON.stringify(this.badge);
        console.log('you submitted value: ', value);
        this.newLevel = 0;
        this.newDesc = "";
    };
    BadgeEditComponent.prototype.toCompare = function (a, b) {
        if (a.level < b.level)
            return -1;
        else if (a.level > b.level)
            return 1;
        else
            return 0;
    };
    BadgeEditComponent.prototype.removeBadgeLevel = function (selectedLevel) {
        var index = this.badge.badgelevels.indexOf(selectedLevel);
        this.badge.badgelevels.splice(index, 1);
        var value = JSON.stringify(this.badge);
        console.log('you submitted value: ', value);
    };
    BadgeEditComponent.prototype.deleteBadgeLevelPop = function (selectedLevel) {
        var name = this.badge.name;
        var level = selectedLevel.level;
        var r = confirm("Are you sure you want to delete " + name.toUpperCase() + " Level " + level + " ?");
        if (r == true) {
            this.removeBadgeLevel(selectedLevel);
        }
    };
    BadgeEditComponent.prototype.goBack = function () {
        window.history.back();
    };
    BadgeEditComponent = __decorate([
        core_1.Component({
            selector: 'my-badge-edit',
            templateUrl: 'app/components/badge/badge-edit/badge-edit.component.html',
            styleUrls: ['app/components/badge/badge-edit/badge-edit.component.css']
        }), 
        __metadata('design:paramtypes', [badge_service_1.BadgeService, router_1.Router, router_1.ActivatedRoute, auth_service_1.AuthService])
    ], BadgeEditComponent);
    return BadgeEditComponent;
}());
exports.BadgeEditComponent = BadgeEditComponent;
//# sourceMappingURL=badge-edit.component.js.map