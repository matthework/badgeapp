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
var StaffNewComponent = (function () {
    function StaffNewComponent(_staffService, _badgeService, _router, auth) {
        this._staffService = _staffService;
        this._badgeService = _badgeService;
        this._router = _router;
        this.auth = auth;
        this.badges = [];
        this.active = false;
        this.nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.newBGs = [{ badge: "", level: 0, status: false },
            { badge: "", level: 0, status: false },
            { badge: "", level: 0, status: false },
            { badge: "", level: 0, status: false },
            { badge: "", level: 0, status: false },
            { badge: "", level: 0, status: false },
            { badge: "", level: 0, status: false },
            { badge: "", level: 0, status: false },
            { badge: "", level: 0, status: false },
            { badge: "", level: 0, status: false }];
        this.newStaff = { index: 0, fname: "", lname: "", position: "", salary: 0, email: "", phone: "", userbgroups: this.newBGs, active: false, brief: "", others: [] };
    }
    StaffNewComponent.prototype.ngOnInit = function () {
        this.getBadges();
    };
    StaffNewComponent.prototype.getBadges = function () {
        var _this = this;
        this._badgeService.getBadges().subscribe(function (badges) { _this.badges = badges; });
    };
    StaffNewComponent.prototype.addStaff = function () {
        for (var i = 0; i < this.newStaff.userbgroups.length; i++) {
            if (this.newStaff.userbgroups[i].level != 0) {
                this.newStaff.userbgroups[i].level = +this.newStaff.userbgroups[i].level;
            }
        }
        this.newStaff.userbgroups.sort(this.toCompare);
        var value = JSON.stringify(this.newStaff);
        this._staffService.addStaff(value).subscribe();
        console.log('you submitted value: ', value);
        this.toStaffs();
    };
    StaffNewComponent.prototype.toCompare = function (a, b) {
        if (a.badge < b.badge)
            return -1;
        else if (a.badge > b.badge)
            return 1;
        else
            return 0;
    };
    StaffNewComponent.prototype.toStaffs = function () {
        this._router.navigate(['/staffs']);
        location.reload();
    };
    StaffNewComponent.prototype.getDesc = function (b, l) {
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
    StaffNewComponent.prototype.getBadgesOptions = function () {
        var badgesOptions = [];
        if (this.badges != null) {
            for (var i = 0; i < this.badges.length; i++) {
                if (this.badges[i].inused) {
                    badgesOptions.push(this.badges[i].name);
                }
            }
        }
        return badgesOptions.sort();
    };
    StaffNewComponent.prototype.getLevelsOptions = function (bname) {
        var levelsOptions = [];
        if (this.badges != null) {
            for (var i = 0; i < this.badges.length; i++) {
                if (this.badges[i].name == bname) {
                    for (var j = 0; j < this.badges[i].badgelevels.length; j++) {
                        levelsOptions.push(this.badges[i].badgelevels[j].level);
                    }
                }
            }
        }
        return levelsOptions.sort();
    };
    StaffNewComponent.prototype.goBack = function () {
        window.history.back();
    };
    StaffNewComponent = __decorate([
        core_1.Component({
            selector: 'my-staff-new',
            templateUrl: 'app/components/staff/staff-new/staff-new.component.html',
            styleUrls: ['app/components/staff/staff-new/staff-new.component.css']
        }), 
        __metadata('design:paramtypes', [staff_service_1.StaffService, badge_service_1.BadgeService, router_1.Router, auth_service_1.AuthService])
    ], StaffNewComponent);
    return StaffNewComponent;
}());
exports.StaffNewComponent = StaffNewComponent;
//# sourceMappingURL=staff-new.component.js.map