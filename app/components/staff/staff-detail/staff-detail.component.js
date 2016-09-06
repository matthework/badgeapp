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
var StaffDetailComponent = (function () {
    function StaffDetailComponent(_staffService, _badgeService, _bsService, _tierService, _router, route, auth) {
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
        this.more = false;
        this.labels = ["I understand... ",
            "I participate... ",
            "I contribute... ",
            "I lead... ",
            "I advise... ",
            "I can teach... ",
            "I plan sophisticated... ",
            "I have achieved wide recognition... ",
            "I am a world leading... "
        ];
    }
    StaffDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.getStaff();
        this.getBadges();
        this.getBadgeSets();
        this.getTiers();
    };
    StaffDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    StaffDetailComponent.prototype.getStaff = function () {
        var _this = this;
        console.log('id from _routeParams: ', this.id);
        this._staffService.getStaff(this.id).subscribe(function (staff) { _this.staff = staff; });
    };
    StaffDetailComponent.prototype.getBadges = function () {
        var _this = this;
        this._badgeService.getBadges().subscribe(function (badges) { _this.badges = badges; });
    };
    StaffDetailComponent.prototype.getBadgeSets = function () {
        var _this = this;
        this._bsService.getBadgeSets().subscribe(function (badgesets) { _this.badgesets = badgesets; });
    };
    StaffDetailComponent.prototype.getTiers = function () {
        var _this = this;
        this._tierService.getTiers().subscribe(function (tiers) { _this.tiers = tiers; });
    };
    StaffDetailComponent.prototype.toStaffs = function () {
        this._router.navigate(['/staffs']);
        location.reload();
    };
    StaffDetailComponent.prototype.toStaffEdit = function (sid) {
        this._router.navigate(['/staff/edit', sid]);
    };
    StaffDetailComponent.prototype.getDesc = function (bid, l) {
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
    StaffDetailComponent.prototype.toBadgeDetail = function (bid) {
        // var bid = "";
        // if (this.badges != null) {
        //   for (var i = 0; i < this.badges.length; i++) {   
        //     if (this.badges[i].name == bname) {
        //       bid = this.badges[i]._id;
        //     }
        //   }
        // }
        this._router.navigate(['/badge/detail', bid]);
    };
    StaffDetailComponent.prototype.getStaffBS = function (sbgs) {
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
    StaffDetailComponent.prototype.getSortStaffBS = function (sbgs) {
        this.sortStaffBS = [];
        var allbset = this.getStaffBS(sbgs);
        if (allbset != null) {
            for (var i = 0; i < allbset.length; i++) {
                allbset[i].pay = this.getPay(allbset[i].tier, allbset[i].grade);
                this.sortStaffBS.push(allbset[i]);
            }
        }
        return this.sortStaffBS.sort(this.toCompareDes);
    };
    StaffDetailComponent.prototype.toCompareDes = function (a, b) {
        if (a.pay > b.pay)
            return -1;
        else if (a.pay < b.pay)
            return 1;
        else
            return 0;
    };
    StaffDetailComponent.prototype.getTopStaffBS = function (sbgs) {
        var topBS = [];
        if (this.getSortStaffBS(sbgs) != null && this.getSortStaffBS(sbgs).length > 0) {
            topBS.push(this.getSortStaffBS(sbgs)[0]._id);
            topBS.push(this.getSortStaffBS(sbgs)[0].name);
            topBS.push(this.getSortStaffBS(sbgs)[0].tier);
            topBS.push(this.getSortStaffBS(sbgs)[0].grade);
        }
        return topBS;
    };
    // getTopBS() {
    //   var topBS = this.sortStaffBS[0];
    //   return topBS;
    // }
    StaffDetailComponent.prototype.getPay = function (t, g) {
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
    StaffDetailComponent.prototype.findBadgeSet = function (sbgs, bid, l) {
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
    StaffDetailComponent.prototype.toBSDetail = function (bsid) {
        this._router.navigate(['/bs/detail', bsid]);
    };
    StaffDetailComponent.prototype.getMoreBadges = function (bgs) {
        var moreBadges = [];
        if (bgs != null) {
            for (var i = 0; i < bgs.length; i++) {
                for (var j = 0; j < this.badges.length; j++) {
                    for (var k = 0; k < this.badges[j].badgelevels.length; k++) {
                        if (bgs[i].bid == this.badges[j]._id && bgs[i].level > this.badges[j].badgelevels[k].level) {
                            moreBadges.push({ "status": bgs[i].status, "bid": this.badges[j]._id, "level": this.badges[j].badgelevels[k].level, "current": false });
                        }
                        if (bgs[i].bid == this.badges[j]._id && bgs[i].level == this.badges[j].badgelevels[k].level) {
                            moreBadges.push({ "status": bgs[i].status, "bid": this.badges[j]._id, "level": this.badges[j].badgelevels[k].level, "current": true });
                        }
                    }
                }
            }
        }
        return moreBadges;
    };
    StaffDetailComponent.prototype.getBadgeName = function (bid) {
        var bname = "";
        for (var i = 0; i < this.badges.length; i++) {
            if (this.badges[i]._id == bid) {
                bname = this.badges[i].name;
            }
        }
        return bname;
    };
    StaffDetailComponent.prototype.goBack = function () {
        window.history.back();
    };
    StaffDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-staff-detail',
            templateUrl: 'app/components/staff/staff-detail/staff-detail.component.html',
            styleUrls: ['app/components/staff/staff-detail/staff-detail.component.css'],
            pipes: [yes_no_pipe_1.YesNoPipe, approved_pipe_1.ApprovedPipe]
        }), 
        __metadata('design:paramtypes', [staff_service_1.StaffService, badge_service_1.BadgeService, bs_service_1.BSService, tier_service_1.TierService, router_1.Router, router_1.ActivatedRoute, auth_service_1.AuthService])
    ], StaffDetailComponent);
    return StaffDetailComponent;
}());
exports.StaffDetailComponent = StaffDetailComponent;
//# sourceMappingURL=staff-detail.component.js.map