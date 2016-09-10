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
        this.staffs = [];
        this.badges = [];
        this.badgesets = [];
        this.tiers = [];
        this.newUser = { index: 0, fname: "", lname: "", status: "Active", position: "", salary: 0, email: "", phone: "", userbgroups: [], active: true, brief: "", others: [] };
        this.gmap = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5 };
        this.sortStaffBS = [];
        this.active = false;
        this.newBID = "";
        this.newLevel = 0;
        this.newFocus = [];
        this.newStatus = false;
        this.more = false;
        this.edit = false;
        this.userName = false;
        this.pos = false;
        this.brief = false;
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
    UserDetailComponent.prototype.ngOnInit = function () {
        if (this.auth.authenticated()) {
            this.email = this.auth.userProfile.email;
            this.getStaffByEmail();
        }
        this.getStaffs();
        this.getBadges();
        this.getBadgeSets();
        this.getTiers();
    };
    UserDetailComponent.prototype.getStaffs = function () {
        var _this = this;
        this._staffService.getStaffs().subscribe(function (staffs) { _this.staffs = staffs; });
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
    UserDetailComponent.prototype.getDesc = function (bid, l) {
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
    UserDetailComponent.prototype.toBadgeDetail = function (bid) {
        this._router.navigate(['/badge/detail', bid]);
    };
    UserDetailComponent.prototype.updateStaff = function () {
        var value = JSON.stringify(this.staff);
        this._staffService.updateStaff(this.staff._id, value).subscribe();
        console.log('you submitted value: ', value);
    };
    UserDetailComponent.prototype.addNewUser = function () {
        this.newUser.email = this.auth.userProfile.email;
        var value = JSON.stringify(this.newUser);
        this._staffService.addStaff(value).subscribe();
        console.log('you submitted value: ', value);
        this.toUserDetail(this.newUser.email);
    };
    UserDetailComponent.prototype.toUserDetail = function (email) {
        this._router.navigate(['/user/detail', email]);
    };
    UserDetailComponent.prototype.getStaffBS = function (sbgs) {
        var allbset = [];
        var count = 0;
        var focusCheck = false;
        if (this.badgesets != null && sbgs != null) {
            for (var i = 0; i < this.badgesets.length; i++) {
                for (var j = 0; j < this.badgesets[i].badgegroups.length; j++) {
                    for (var k = 0; k < sbgs.length; k++) {
                        var a1 = sbgs[k].focus;
                        var a2 = this.badgesets[i].badgegroups[j].focus;
                        if (a1.length >= a2.length && a2.every(function (v, i) { return a1.includes(v); })) {
                            focusCheck = true;
                        }
                        if (focusCheck && sbgs[k].status && this.badgesets[i].badgegroups[j].bid == sbgs[k].bid && this.badgesets[i].badgegroups[j].level <= sbgs[k].level) {
                            count += 1;
                        }
                        focusCheck = false;
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
    UserDetailComponent.prototype.getSortStaffBS = function (sbgs) {
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
    UserDetailComponent.prototype.toCompareDes = function (a, b) {
        if (a.pay > b.pay)
            return -1;
        else if (a.pay < b.pay)
            return 1;
        else
            return 0;
    };
    UserDetailComponent.prototype.getTopStaffBS = function (sbgs) {
        var topBS = [];
        if (this.getSortStaffBS(sbgs) != null && this.getSortStaffBS(sbgs).length > 0) {
            topBS.push(this.getSortStaffBS(sbgs)[0]._id);
            topBS.push(this.getSortStaffBS(sbgs)[0].name);
            topBS.push(this.getSortStaffBS(sbgs)[0].tier);
            topBS.push(this.getSortStaffBS(sbgs)[0].grade);
        }
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
    UserDetailComponent.prototype.findBadgeSet = function (sbgs, bid, l) {
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
    UserDetailComponent.prototype.toBSDetail = function (bsid) {
        this._router.navigate(['/bs/detail', bsid]);
    };
    UserDetailComponent.prototype.getBadgesOptions = function () {
        var badgesOptions = [];
        if (this.badges != null) {
            for (var i = 0; i < this.badges.length; i++) {
                if (this.badges[i].status == 'Accepted') {
                    badgesOptions.push([this.badges[i].name, this.badges[i]._id]);
                }
            }
        }
        return badgesOptions.sort();
    };
    UserDetailComponent.prototype.getLevelsOptions = function (bid) {
        var levelsOptions = [];
        if (this.badges != null) {
            for (var i = 0; i < this.badges.length; i++) {
                if (this.badges[i]._id == bid) {
                    for (var j = 0; j < this.badges[i].badgelevels.length; j++) {
                        levelsOptions.push(this.badges[i].badgelevels[j].level);
                    }
                }
            }
        }
        // console.log('getBadgesOptions: ', badgesOptions);
        return levelsOptions.sort();
    };
    // getNewLevelsOptions(bid: string) {
    //   var levelsOptions = [];
    //   var userbgs = [];
    //   if (this.staff.userbgroups.length != 0) {
    //       for (var j = 0; j < this.staff.userbgroups.length; j++) { 
    //           userbgs.push(this.staff.userbgroups[j].bid);
    //       }
    //   }
    //   for (var i = 0; i < this.badges.length; i++) { 
    //     if (this.badges[i]._id == bid) {
    //       for (var j = 0; j < this.badges[i].badgelevels.length; j++) { 
    //         let index = userbgs.indexOf(this.badges[i]._id);
    //         if (this.staff.userbgroups.length != 0) { // && index != -1) {
    //           for (var k = 0; k < this.staff.userbgroups.length; k++) {
    //             if (this.staff.userbgroups[k].bid == bid ) { //&& this.staff.userbgroups[k].level<this.badges[i].badgelevels[j].level) {
    //               levelsOptions.push(this.badges[i].badgelevels[j].level);
    //             }
    //           }
    //         }else{
    //           levelsOptions.push(this.badges[i].badgelevels[j].level);
    //         }
    //       }
    //     }
    //   }
    //   return levelsOptions.sort();
    // }
    UserDetailComponent.prototype.getFocusOptions = function (bid) {
        var focusOptions = [];
        if (this.badges != null) {
            for (var i = 0; i < this.badges.length; i++) {
                if (this.badges[i]._id == bid && this.badges[i].focus != null) {
                    for (var j = 0; j < this.badges[i].focus.length; j++) {
                        focusOptions.push(this.badges[i].focus[j]);
                    }
                }
            }
        }
        return focusOptions.sort();
    };
    UserDetailComponent.prototype.addBadgeGroup = function () {
        this.newLevel = +this.newLevel;
        this.staff.userbgroups.push({ bid: this.newBID, badge: "", level: this.newLevel, focus: this.newFocus, status: this.newStatus });
        this.staff.userbgroups.sort(this.toCompare);
        var value = JSON.stringify(this.staff);
        this._staffService.updateStaff(this.staff._id, value).subscribe();
        console.log('you submitted value: ', value);
        this.newBID = "";
        this.newLevel = 0;
        this.newFocus = [];
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
    UserDetailComponent.prototype.getMoreBadges = function (bgs) {
        var moreBadges = [];
        if (bgs != null) {
            for (var i = 0; i < bgs.length; i++) {
                for (var j = 0; j < this.badges.length; j++) {
                    for (var k = 0; k < this.badges[j].badgelevels.length; k++) {
                        if (bgs[i].bid == this.badges[j]._id && bgs[i].level > this.badges[j].badgelevels[k].level) {
                            moreBadges.push({ "status": bgs[i].status, "bid": this.badges[j]._id, "level": this.badges[j].badgelevels[k].level, "focus": bgs[i].focus, "current": false });
                        }
                        if (bgs[i].bid == this.badges[j]._id && bgs[i].level == this.badges[j].badgelevels[k].level) {
                            moreBadges.push({ "status": bgs[i].status, "bid": this.badges[j]._id, "level": this.badges[j].badgelevels[k].level, "focus": bgs[i].focus, "current": true });
                        }
                    }
                }
            }
        }
        return moreBadges;
    };
    UserDetailComponent.prototype.getBadgeName = function (bid) {
        var bname = "";
        for (var i = 0; i < this.badges.length; i++) {
            if (this.badges[i]._id == bid) {
                bname = this.badges[i].name;
            }
        }
        return bname;
    };
    UserDetailComponent.prototype.updateCheckedNew = function (option, event, focus) {
        console.log('event.target.value ' + event.target.value);
        var index = focus.indexOf(option);
        if (event.target.checked) {
            console.log('add');
            if (index === -1) {
                focus.push(option);
            }
        }
        else {
            console.log('remove');
            if (index !== -1) {
                focus.splice(index, 1);
            }
        }
        console.log(focus);
        this.newFocus = focus;
    };
    UserDetailComponent.prototype.checkProfile = function () {
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