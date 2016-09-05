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
var tier_service_1 = require('../tier/tier.service');
var auth_service_1 = require('../auth/auth.service');
var approved_pipe_1 = require('../pipe/approved-pipe');
var MainComponent = (function () {
    function MainComponent(auth, _router, _staffService, _badgeService, _bsService, _tierService) {
        this.auth = auth;
        this._router = _router;
        this._staffService = _staffService;
        this._badgeService = _badgeService;
        this._bsService = _bsService;
        this._tierService = _tierService;
        this.badges = [];
        this.badgesets = [];
        this.staffs = [];
        this.tiers = [];
        this.gmap = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5 };
        this.sortStaffBS = [];
    }
    MainComponent.prototype.ngOnInit = function () {
        if (this.auth.userProfile) {
            this.email = this.auth.userProfile.email;
            this.getStaffByEmail();
        }
        this.getBadges();
        this.getBadgeSets();
        this.getStaffs();
        this.getTiers();
    };
    MainComponent.prototype.getStaffs = function () {
        var _this = this;
        this._staffService.getStaffs().subscribe(function (staffs) { _this.staffs = staffs; });
    };
    MainComponent.prototype.getBadges = function () {
        var _this = this;
        this._badgeService.getBadges().subscribe(function (badges) { _this.badges = badges; });
    };
    MainComponent.prototype.getBadgeSets = function () {
        var _this = this;
        this._bsService.getBadgeSets().subscribe(function (badgesets) { _this.badgesets = badgesets; });
    };
    MainComponent.prototype.getTiers = function () {
        var _this = this;
        this._tierService.getTiers().subscribe(function (tiers) { _this.tiers = tiers; });
    };
    MainComponent.prototype.getStaffByEmail = function () {
        var _this = this;
        console.log('email from _routeParams: ', this.email);
        this._staffService.getStaffByEmail(this.email).subscribe(function (staff) { _this.staff = staff; });
    };
    MainComponent.prototype.checkProfile = function () {
        var hasProfile = false;
        if (this.auth.userProfile != null && this.staffs != null) {
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
    MainComponent.prototype.getDesc = function (bid, l) {
        var desc = "";
        if (this.badges != null && l > 0 && bid != "") {
            for (var i = 0; i < this.badges.length; i++) {
                if (this.badges[i]._id == bid) {
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
    MainComponent.prototype.toBadgeDetail = function (bid) {
        this._router.navigate(['/badge/detail', bid]);
    };
    MainComponent.prototype.getStaffBS = function (sbgs) {
        var allbset = [];
        var count = 0;
        if (this.badgesets != null && sbgs != null) {
            for (var i = 0; i < this.badgesets.length; i++) {
                for (var j = 0; j < this.badgesets[i].badgegroups.length; j++) {
                    for (var k = 0; k < sbgs.length; k++) {
                        if (sbgs[k].status && this.badgesets[i].badgegroups[j].bid == sbgs[k].bid && this.badgesets[i].badgegroups[j].level <= sbgs[k].level) {
                            count += 1;
                        }
                    }
                }
                if (count >= this.badgesets[i].badgegroups.length && this.badgesets[i].status == 'Accepted') {
                    allbset.push(this.badgesets[i]);
                }
                count = 0;
            }
        }
        return allbset;
    };
    MainComponent.prototype.getSortStaffBS = function (sbgs) {
        var pay = "";
        this.sortStaffBS = [];
        var allbset = this.getStaffBS(sbgs);
        if (allbset != null && sbgs != null) {
            for (var i = 0; i < allbset.length; i++) {
                allbset[i].pay = this.getPay(allbset[i].tier, allbset[i].grade);
                this.sortStaffBS.push(allbset[i]);
            }
        }
        return this.sortStaffBS.sort(this.toCompareDes);
    };
    MainComponent.prototype.toCompareDes = function (a, b) {
        if (a.pay > b.pay)
            return -1;
        else if (a.pay < b.pay)
            return 1;
        else
            return 0;
    };
    MainComponent.prototype.getTopStaffBS = function (sbgs) {
        var topBS = [];
        if (this.getSortStaffBS(sbgs) != null && this.getSortStaffBS(sbgs).length > 0) {
            topBS.push(this.getSortStaffBS(sbgs)[0]._id);
            topBS.push(this.getSortStaffBS(sbgs)[0].name);
            topBS.push(this.getSortStaffBS(sbgs)[0].tier);
            topBS.push(this.getSortStaffBS(sbgs)[0].grade);
        }
        return topBS;
    };
    MainComponent.prototype.getPay = function (t, g) {
        var pay = 0;
        if (this.tiers != null && t != 0 && g != "") {
            for (var i = 0; i < this.tiers.length; i++) {
                if (this.tiers[i].tier == t) {
                    pay = this.tiers[i].grades[this.gmap[g]];
                }
            }
        }
        return pay;
    };
    MainComponent.prototype.findBadgeSet = function (sbgs, bid, l) {
        var bset = [];
        var sortStaffBS = this.getSortStaffBS(sbgs);
        if (sortStaffBS != null && sortStaffBS.length > 0) {
            for (var i = 0; i < sortStaffBS.length; i++) {
                for (var j = 0; j < sortStaffBS[i].badgegroups.length; j++) {
                    if (sortStaffBS[i].badgegroups[j].bid == bid && sortStaffBS[i].badgegroups[j].level <= l) {
                        bset.push(sortStaffBS[i]);
                    }
                }
            }
        }
        return bset;
    };
    MainComponent.prototype.toBSDetail = function (bsid) {
        this._router.navigate(['/bs/detail', bsid]);
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
    MainComponent.prototype.getBadgeName = function (bid) {
        var bname = "";
        for (var i = 0; i < this.badges.length; i++) {
            if (this.badges[i]._id == bid) {
                bname = this.badges[i].name;
            }
        }
        return bname;
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: 'my-main',
            templateUrl: 'app/components/main/main.component.html',
            styleUrls: ['app/components/main/main.component.css'],
            pipes: [approved_pipe_1.ApprovedPipe]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router, staff_service_1.StaffService, badge_service_1.BadgeService, bs_service_1.BSService, tier_service_1.TierService])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map