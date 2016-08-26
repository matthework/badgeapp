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
var bs_service_1 = require('../../badgeset/bs.service');
var tier_service_1 = require('../../tier/tier.service');
var auth_service_1 = require('../../auth/auth.service');
var yes_no_pipe_1 = require('../../pipe/yes-no-pipe');
var approved_pipe_1 = require('../../pipe/approved-pipe');
var UserDetailComponent = (function () {
    function UserDetailComponent(_staffService, _badgeService, _bsService, _tierService, _router, route, auth) {
        this._staffService = _staffService;
        this._badgeService = _badgeService;
        this._bsService = _bsService;
        this._tierService = _tierService;
        this._router = _router;
        this.route = route;
        this.auth = auth;
        this.badges = [];
        this.badgesets = [];
        this.tiers = [];
        this.gmap = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5 };
        this.sortStaffBS = [];
        this.active = false;
        this.newBadge = "";
        this.newLevel = 0;
        this.newStatus = false;
    }
    UserDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.email = params['email'];
        });
        this.getStaffByEmail();
        this.getBadges();
        this.getBadgeSets();
        this.getTiers();
    };
    UserDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    UserDetailComponent.prototype.getStaffByEmail = function () {
        var _this = this;
        console.log('email from _routeParams: ', this.email);
        this._staffService.getStaffByEmail(this.email).subscribe(function (staff) { _this.staff = staff; });
    };
    UserDetailComponent.prototype.getBadges = function () {
        var _this = this;
        this._badgeService.getBadges().subscribe(function (badges) { _this.badges = badges; });
    };
    UserDetailComponent.prototype.getBadgeSets = function () {
        var _this = this;
        this._bsService.getBadgeSets().subscribe(function (badgesets) { _this.badgesets = badgesets; });
    };
    UserDetailComponent.prototype.getTiers = function () {
        var _this = this;
        this._tierService.getTiers().subscribe(function (tiers) { _this.tiers = tiers; });
    };
    UserDetailComponent.prototype.toStaffs = function () {
        this._router.navigate(['/staffs']);
        location.reload();
    };
    UserDetailComponent.prototype.toUserEdit = function (sid) {
        this._router.navigate(['/user/edit', sid]);
    };
    UserDetailComponent.prototype.getDesc = function (b, l) {
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
    UserDetailComponent.prototype.toBadgeDetail = function (bname) {
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
    UserDetailComponent.prototype.getStaffBS = function (sbgs) {
        var allbset = [];
        var count = 0;
        var coreCount = 0;
        var core = false;
        if (this.badgesets != null) {
            for (var i = 0; i < this.badgesets.length; i++) {
                for (var j = 0; j < this.badgesets[i].badgegroups.length; j++) {
                    for (var k = 0; k < sbgs.length; k++) {
                        if (this.badgesets[i].badgegroups[j].badge == sbgs[k].badge && this.badgesets[i].badgegroups[j].level <= sbgs[k].level) {
                            count += 1;
                        }
                    }
                }
                if (this.badgesets[i].corebadges == []) {
                    core = true;
                }
                else {
                    for (var m = 0; m < this.badgesets[i].corebadges.length; m++) {
                        for (var k = 0; k < sbgs.length; k++) {
                            if (this.badgesets[i].corebadges[m].badge == sbgs[k].badge && this.badgesets[i].corebadges[m].level <= sbgs[k].level) {
                                coreCount += 1;
                            }
                        }
                    }
                    if (coreCount == this.badgesets[i].corebadges.length) {
                        core = true;
                    }
                }
                if (count >= this.badgesets[i].numbadges && core && this.badgesets[i].numbadges > 0 && this.badgesets[i].inused) {
                    allbset.push(this.badgesets[i]);
                }
                count = 0;
                coreCount = 0;
                core = false;
            }
        }
        return allbset;
    };
    UserDetailComponent.prototype.getSortStaffBS = function (sbgs) {
        var pay = "";
        this.sortStaffBS = [];
        var allbset = this.getStaffBS(sbgs);
        if (allbset != null) {
            for (var i = 0; i < allbset.length; i++) {
                allbset[i].pay = this.getPay(allbset[i].tier, allbset[i].grade);
                this.sortStaffBS.push(allbset[i]);
            }
        }
        // sortStaffBS = sortStaffBS.sort(this.toCompareDes);
        // this.topBS = sortStaffBS[0];
        // console.log('you submitted topBS: ', sortStaffBS); 
        return this.sortStaffBS.sort(this.toCompareDes);
    };
    UserDetailComponent.prototype.toCompareDes = function (a, b) {
        if (a.pay > b.pay)
            return -1;
        else if (a.pay < b.pay)
            return 1;
        else
            return 0;
    };
    UserDetailComponent.prototype.getTopBS = function () {
        var topBS = this.sortStaffBS[0];
        return topBS;
    };
    UserDetailComponent.prototype.getPay = function (t, g) {
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
    UserDetailComponent.prototype.findBadgeSet = function (bname, l) {
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
    UserDetailComponent.prototype.toBSDetail = function (bsid) {
        this._router.navigate(['/bs/detail', bsid]);
    };
    UserDetailComponent.prototype.getBadgesOptions = function () {
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
    UserDetailComponent.prototype.getNewBadgesOptions = function () {
        var badgesOptions = [];
        var userbgs = [];
        if (this.staff.userbgroups != null) {
            for (var j = 0; j < this.staff.userbgroups.length; j++) {
                userbgs.push(this.staff.userbgroups[j].badge);
            }
        }
        if (this.badges != null) {
            for (var i = 0; i < this.badges.length; i++) {
                var index = userbgs.indexOf(this.badges[i].name);
                if (this.badges[i].inused && index == -1) {
                    badgesOptions.push(this.badges[i].name);
                }
            }
        }
        return badgesOptions.sort();
    };
    UserDetailComponent.prototype.getLevelsOptions = function (bname) {
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
    UserDetailComponent.prototype.getNewLevelsOptions = function (bname) {
        var levelsOptions = [];
        for (var i = 0; i < this.badges.length; i++) {
            if (this.badges[i].name == bname) {
                for (var j = 0; j < this.badges[i].badgelevels.length; j++) {
                    if (this.staff.userbgroups != null) {
                        for (var k = 0; k < this.staff.userbgroups.length; k++) {
                            if (this.staff.userbgroups[k].badge == bname && this.staff.userbgroups[k].level < this.badges[i].badgelevels[j].level) {
                                levelsOptions.push(this.badges[i].badgelevels[j].level);
                            }
                        }
                    }
                }
            }
        }
        return levelsOptions.sort();
    };
    UserDetailComponent.prototype.addBadgeGroup = function () {
        this.newLevel = +this.newLevel;
        this.staff.userbgroups.push({ badge: this.newBadge, level: this.newLevel, status: this.newStatus });
        this.staff.userbgroups.sort(this.toCompare);
        var value = JSON.stringify(this.staff);
        this._staffService.updateStaff(this.staff._id, value).subscribe();
        console.log('you submitted value: ', value);
        this.newBadge = "";
        this.newLevel = 0;
        this.newStatus = false;
    };
    UserDetailComponent.prototype.toCompare = function (a, b) {
        if (a.badge < b.badge)
            return -1;
        else if (a.badge > b.badge)
            return 1;
        else
            return 0;
    };
    UserDetailComponent.prototype.goBack = function () {
        window.history.back();
    };
    UserDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-user-detail',
            templateUrl: 'app/components/staff/user-detail/user-detail.component.html',
            styleUrls: ['app/components/staff/user-detail/user-detail.component.css'],
            pipes: [yes_no_pipe_1.YesNoPipe, approved_pipe_1.ApprovedPipe]
        }), 
        __metadata('design:paramtypes', [staff_service_1.StaffService, badge_service_1.BadgeService, bs_service_1.BSService, tier_service_1.TierService, router_1.Router, router_1.ActivatedRoute, auth_service_1.AuthService])
    ], UserDetailComponent);
    return UserDetailComponent;
}());
exports.UserDetailComponent = UserDetailComponent;
//# sourceMappingURL=user-detail.component.js.map