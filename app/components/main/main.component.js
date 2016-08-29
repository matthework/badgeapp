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
var badge_service_1 = require('../badge/badge.service');
var bs_service_1 = require('../badgeset/bs.service');
var staff_service_1 = require('../staff/staff.service');
var auth_service_1 = require('../auth/auth.service');
var approved_pipe_1 = require('../pipe/approved-pipe');
var MainComponent = (function () {
    function MainComponent(auth, _router, _staffService, _badgeService, _bsService) {
        this.auth = auth;
        this._router = _router;
        this._staffService = _staffService;
        this._badgeService = _badgeService;
        this._bsService = _bsService;
        this.badges = [];
        this.badgesets = [];
        this.staffs = [];
        this.sortStaffBS = [];
    }
    MainComponent.prototype.ngOnInit = function () {
        this.email = this.auth.userProfile.email;
        this.getStaffByEmail();
        this.getStaffs();
    };
    MainComponent.prototype.getStaffs = function () {
        var _this = this;
        this._staffService.getStaffs().subscribe(function (staffs) { _this.staffs = staffs; });
    };
    MainComponent.prototype.getStaffByEmail = function () {
        var _this = this;
        console.log('email from _routeParams: ', this.email);
        this._staffService.getStaffByEmail(this.email).subscribe(function (staff) { _this.staff = staff; });
    };
    MainComponent.prototype.checkProfile = function () {
        var hasProfile = false;
        if (this.staffs != null) {
            for (var i = 0; i < this.staffs.length; i++) {
                var name = this.staffs[i].fname + " " + this.staffs[i].lname;
                if (this.staffs[i].email == this.auth.userProfile.email) {
                    hasProfile = true;
                    break;
                }
            }
        }
        // console.log('you submitted value: ', hasProfile); 
        return hasProfile;
    };
    MainComponent.prototype.addNewUser = function (email) {
        this._router.navigate(['/user/new', email]);
    };
    MainComponent.prototype.toUserDetail = function (email) {
        this._router.navigate(['/user/detail', email]);
    };
    MainComponent.prototype.toPerson = function () {
        this._router.navigate(['/staffs']);
    };
    MainComponent.prototype.getDesc = function (b, l) {
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
    MainComponent.prototype.toBadgeDetail = function (bname) {
        var bid = "";
        if (this.badges != null) {
            for (var i = 0; i < this.badges.length; i++) {
                if (this.badges[i].name == bname) {
                    bid = this.badges[i]._id;
                }
            }
        }
        this._router.navigate(['/badge/detail', bid]);
    };
    MainComponent.prototype.findBadgeSet = function (bname, l) {
        var bset = [];
        if (this.sortStaffBS != null) {
            for (var i = 0; i < this.sortStaffBS.length; i++) {
                for (var j = 0; j < this.sortStaffBS[i].badgegroups.length; j++) {
                    if (this.sortStaffBS[i].badgegroups[j].badge == bname && this.sortStaffBS[i].badgegroups[j].level <= l) {
                        bset.push(this.sortStaffBS[i]);
                    }
                }
            }
        }
        return bset;
    };
    MainComponent.prototype.checkNumPending = function () {
        var numOfPending = 0;
        if (this.staffs != null && this.staffs.length != 0) {
            for (var i = 0; i < this.staffs.length; i++) {
                for (var j = 0; j < this.staffs[i].userbgroups.length; j++) {
                    if (!this.staffs[i].userbgroups[j].status) {
                        numOfPending += 1;
                    }
                }
            }
        }
        else {
            numOfPending = 0;
        }
        return numOfPending;
    };
    MainComponent.prototype.checkPendingStaff = function () {
        var numOfStaff = 0;
        if (this.staffs != null && this.staffs.length != 0) {
            for (var i = 0; i < this.staffs.length; i++) {
                var b = false;
                for (var j = 0; j < this.staffs[i].userbgroups.length; j++) {
                    if (!this.staffs[i].userbgroups[j].status) {
                        b = true;
                    }
                }
                if (b) {
                    numOfStaff += 1;
                }
            }
        }
        else {
            numOfStaff = 0;
        }
        return numOfStaff;
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: 'my-main',
            templateUrl: 'app/components/main/main.component.html',
            styleUrls: ['app/components/main/main.component.css'],
            pipes: [approved_pipe_1.ApprovedPipe]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router, staff_service_1.StaffService, badge_service_1.BadgeService, bs_service_1.BSService])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map