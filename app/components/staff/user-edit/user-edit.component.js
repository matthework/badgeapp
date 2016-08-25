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
var staff_service_1 = require('../staff.service');
var badge_service_1 = require('../../badge/badge.service');
var auth_service_1 = require('../../auth/auth.service');
var UserEditComponent = (function () {
    function UserEditComponent(_staffService, _badgeService, _router, route, auth) {
        this._staffService = _staffService;
        this._badgeService = _badgeService;
        this._router = _router;
        this.route = route;
        this.auth = auth;
        this.badges = [];
        this.active = false;
        this.newBadge = "";
        this.newLevel = 0;
        this.newStatus = false;
        this.brief = 0;
    }
    UserEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.getStaff();
        this.getBadges();
    };
    UserEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    UserEditComponent.prototype.getStaff = function () {
        var _this = this;
        console.log('id from _routeParams: ', this.id);
        this._staffService.getStaff(this.id).subscribe(function (staff) { _this.staff = staff; });
    };
    UserEditComponent.prototype.getBadges = function () {
        var _this = this;
        this._badgeService.getBadges().subscribe(function (badges) { _this.badges = badges; });
    };
    UserEditComponent.prototype.toUserDetail = function (email) {
        this._router.navigate(['/user/detail', email]);
        location.reload();
    };
    UserEditComponent.prototype.updateStaff = function () {
        var value = JSON.stringify(this.staff);
        this._staffService.updateStaff(this.id, value).subscribe();
        console.log('you submitted value: ', value);
        this.toUserDetail(this.staff.email);
    };
    UserEditComponent.prototype.toCompare = function (a, b) {
        if (a.badge < b.badge)
            return -1;
        else if (a.badge > b.badge)
            return 1;
        else
            return 0;
    };
    UserEditComponent.prototype.addStaff = function () {
        this._router.navigate(['/staff/new']);
    };
    UserEditComponent.prototype.addBadgeGroup = function () {
        this.newLevel = +this.newLevel;
        this.staff.userbgroups.push({ badge: this.newBadge, level: this.newLevel, status: this.newStatus });
        var value = JSON.stringify(this.staff);
        // this._staffService.updateStaff(id,value).subscribe();
        console.log('you submitted value: ', value);
        this.newBadge = "";
        this.newLevel = 0;
        this.newStatus = false;
    };
    UserEditComponent.prototype.getDesc = function (b, l) {
        var desc = "";
        if (this.badges != null && l > 0 && b != "") {
            for (var i = 0; i < this.badges.length; i++) {
                if (this.badges[i].name == b) {
                    for (var j = 0; j < this.badges[i].badgelevels.length; j++) {
                        if (this.badges[i].badgelevels[j].level == l) {
                            desc = this.badges[i].badgelevels[j].desc;
                        }
                    }
                }
            }
        }
        return desc;
    };
    UserEditComponent.prototype.getBadgesOptions = function () {
        var badgesOptions = [];
        if (this.badges != null) {
            for (var i = 0; i < this.badges.length; i++) {
                if (this.badges[i].inused) {
                    badgesOptions.push(this.badges[i].name);
                }
            }
            // console.log('getBadgesOptions: ', badgesOptions);
            return badgesOptions.sort();
        }
    };
    UserEditComponent.prototype.getLevelsOptions = function (bname) {
        var levelsOptions = [];
        for (var i = 0; i < this.badges.length; i++) {
            if (this.badges[i].name == bname) {
                for (var j = 0; j < this.badges[i].badgelevels.length; j++) {
                    levelsOptions.push(this.badges[i].badgelevels[j].level);
                }
            }
        }
        // console.log('getBadgesOptions: ', badgesOptions);
        return levelsOptions.sort();
    };
    UserEditComponent.prototype.goBack = function () {
        window.history.back();
    };
    UserEditComponent = __decorate([
        core_1.Component({
            selector: 'my-user-edit',
            templateUrl: 'app/components/staff/user-edit/user-edit.component.html',
            styleUrls: ['app/components/staff/user-edit/user-edit.component.css']
        }), 
        __metadata('design:paramtypes', [staff_service_1.StaffService, badge_service_1.BadgeService, router_1.Router, router_1.ActivatedRoute, auth_service_1.AuthService])
    ], UserEditComponent);
    return UserEditComponent;
}());
exports.UserEditComponent = UserEditComponent;
//# sourceMappingURL=user-edit.component.js.map