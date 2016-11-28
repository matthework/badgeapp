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
        this.newBID = "";
        this.newLevel = 0;
        this.newFocus = [];
        this.newApproved = false;
        this.selectedLevel = 0;
        this.newL = 0;
        this.staffs = [];
        this.tiers = [];
        this.gmap = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5 };
        this.sortStaffBS = [];
        this.newUser = { index: 0, fname: "", lname: "", status: "Active", position: "", salary: 0, email: "", phone: "", userbgroups: [], active: true, brief: "", others: [] };
        this.nums = [1, 2, 3, 4, 5, 6];
        this.bsname1 = "";
        this.bsname2 = "";
        this.showCompare = false;
        this.addNew = false;
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
        this.staffBSet = [];
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
    MainComponent.prototype.onSelect = function (ug) {
        this.selectedUG = ug;
    };
    // getBadge(bid:string) {
    //   var result: Badge;
    //   if (this.badges != null) {
    //     for (var i = 0; i < this.badges.length; i++) { 
    //       if (this.badges[i]._id == bid) {
    //         return this.badges[i];
    //       }
    //     }
    //   }
    //   return result;
    // }
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
                if (this.staffs[i].email == this.auth.userProfile.email) {
                    hasProfile = true;
                    break;
                }
            }
        }
        return hasProfile;
    };
    MainComponent.prototype.addNewUser = function () {
        this.newUser.email = this.auth.userProfile.email;
        var value = JSON.stringify(this.newUser);
        this._staffService.addStaff(value).subscribe();
        console.log('you submitted value: ', value);
        location.reload();
        // this.toUserDetail(this.newUser.email);
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
        var coreCount = 0;
        var ncCount = 0;
        var focusCheck = false;
        var totolCore = 0;
        var latestbs = "";
        if (this.badgesets != null && sbgs != null) {
            for (var i = 0; i < this.badgesets.length; i++) {
                for (var j = 0; j < this.badgesets[i].badgegroups.length; j++) {
                    if (this.badgesets[i].badgegroups[j].iscore) {
                        totolCore += 1;
                    }
                }
                for (var j = 0; j < this.badgesets[i].badgegroups.length; j++) {
                    for (var k = 0; k < sbgs.length; k++) {
                        var a1 = sbgs[k].focus;
                        var a2 = this.badgesets[i].badgegroups[j].focus;
                        if (a1.length >= a2.length && a2.every(function (v, i) { return a1.includes(v); })) {
                            focusCheck = true;
                        }
                        if (focusCheck && sbgs[k].approved && this.badgesets[i].badgegroups[j].bid == sbgs[k].bid && this.badgesets[i].badgegroups[j].level <= sbgs[k].level) {
                            if (this.badgesets[i].badgegroups[j].iscore) {
                                coreCount += 1;
                            }
                            else {
                                ncCount += 1;
                            }
                        }
                        focusCheck = false;
                    }
                }
                if (coreCount == totolCore && ncCount >= (this.badgesets[i].badgegroups.length - totolCore) * 4 / 5 && this.badgesets[i].status == 'Accepted') {
                    allbset.push(this.badgesets[i]);
                    latestbs = this.badgesets[i].name;
                }
                totolCore = 0;
                coreCount = 0;
                ncCount = 0;
            }
        }
        if (allbset.length != 0 && latestbs != this.staff.latestbset) {
            this.staff.latestbset = latestbs;
            this.staff.latestbsettime = new Date().toISOString();
        }
        if (allbset.length == 0) {
            this.staff.latestbset = "";
            this.staff.latestbsettime = "";
        }
        this.staffBSet = allbset;
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
                    if (!this.staffs[i].userbgroups[j].approved) {
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
                    if (!this.staffs[i].userbgroups[j].approved) {
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
    MainComponent.prototype.getFocusOptions = function (bid) {
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
    MainComponent.prototype.getBLs = function (bid) {
        var bls;
        if (this.badges) {
            for (var i = 0; i < this.badges.length; i++) {
                if (this.badges[i]._id == bid) {
                    bls = this.badges[i].badgelevels;
                }
            }
        }
        return bls;
    };
    MainComponent.prototype.onSelectedLevel = function (level) {
        this.selectedLevel = level;
    };
    MainComponent.prototype.onSelectNewLevel = function (level) {
        this.newL = level;
    };
    MainComponent.prototype.checkFocus = function (fc, focus) {
        var result = false;
        if (focus.includes(fc)) {
            result = true;
        }
        return result;
    };
    MainComponent.prototype.updateCheckedNew = function (option, event, focus) {
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
    MainComponent.prototype.getCircleLevel = function (level, approved) {
        var result = "";
        var p = 0;
        if (approved) {
            result = "c100 green p";
        }
        else {
            result = "c100 red p";
        }
        p = Math.round(level / 9 * 100);
        if (p > 100) {
            p = 100;
        }
        return result + p.toString();
    };
    MainComponent.prototype.getCirclePercent = function (bsname) {
        var result = "";
        var color = this.checkBSet(bsname);
        if (color) {
            result = "c100 green small p";
        }
        else {
            result = "c100 red small p";
        }
        var p = this.getPercent(bsname);
        if (p) {
            return result + p.toString();
        }
        else {
            return result + '0';
        }
    };
    MainComponent.prototype.getPercent = function (bsname) {
        var target = this.compareBS(bsname);
        var c1 = 0;
        var c2 = 0;
        var p = 0;
        for (var i = 0; i < target.length; i++) {
            if (target[i].status) {
                c1 += target[i].level;
            }
            if (!target[i].status) {
                c1 += target[i].level1;
            }
            c2 += target[i].level;
        }
        p = Math.round((c1 / c2) * 100);
        if (p > 100) {
            p = 100;
        }
        return p;
    };
    MainComponent.prototype.checkBSet = function (bsname) {
        var result = false;
        var allbset = this.staffBSet;
        if (allbset != null) {
            for (var i = 0; i < allbset.length; i++) {
                if (allbset[i].name == bsname) {
                    result = true;
                }
            }
        }
        return result;
    };
    MainComponent.prototype.getCircleLevelCompare = function (level, clevel, approved) {
        var result = "";
        var p = 0;
        if (approved) {
            result = "c100 green p";
        }
        else {
            result = "c100 red p";
        }
        p = Math.round(level / clevel * 100);
        if (p > 100) {
            p = 100;
        }
        return result + p.toString();
    };
    MainComponent.prototype.getComBS = function () {
        if (this.badgesets != null) {
            this.bsname1 = this.badgesets[0].name;
            this.bsname2 = this.badgesets[0].name;
            if (this.getTopStaffBS(this.staff.userbgroups).length != 0) {
                this.bsname2 = this.getTopStaffBS(this.staff.userbgroups)[1];
            }
        }
        else {
            this.bsname1 = "";
            this.bsname2 = "";
        }
    };
    MainComponent.prototype.getBadgesOptions = function () {
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
    MainComponent.prototype.addUserBGroup = function (level) {
        // this.newLevel = +this.newLevel;
        this.newLevel = level;
        this.staff.userbgroups.push({ bid: this.newBID, badge: this.getBadgeName(this.newBID), level: this.newLevel, focus: this.newFocus, approved: this.newApproved, ubtimestamp: "" });
        var value = JSON.stringify(this.staff);
        // this._staffService.updateStaff(this.staff._id,value).subscribe();
        this.updateStaff();
        console.log('you submitted value: ', value);
    };
    MainComponent.prototype.updateStaff = function () {
        for (var i = 0; i < this.staff.userbgroups.length; i++) {
            this.staff.userbgroups[i].badge = this.getBadgeName(this.staff.userbgroups[i].bid);
        }
        this.staff.userbgroups.sort(this.toCompare);
        this.staff.userbgroups.sort(this.sortApproved);
        var value = JSON.stringify(this.staff);
        this._staffService.updateStaff(this.staff._id, value).subscribe();
        console.log('you submitted value: ', value);
    };
    MainComponent.prototype.toCompare = function (a, b) {
        if (a.badge < b.badge)
            return -1;
        else if (a.badge > b.badge)
            return 1;
        else
            return 0;
    };
    MainComponent.prototype.sortApproved = function (a, b) {
        if (a.approved > b.approved)
            return -1;
        else if (a.approved < b.approved)
            return 1;
        else
            return 0;
    };
    MainComponent.prototype.resetNewValue = function () {
        this.newBID = "";
        this.newLevel = 0;
        this.newFocus = [];
        this.newApproved = false;
        this.selectedLevel = 0;
    };
    MainComponent.prototype.getBS = function (bsname) {
        var result;
        if (this.badgesets) {
            for (var i = 0; i < this.badgesets.length; i++) {
                if (this.badgesets[i].name == bsname) {
                    return this.badgesets[i];
                }
            }
        }
        return result;
    };
    MainComponent.prototype.compareBS = function (bsname) {
        var result = [];
        var check = false;
        var has = false;
        var focusCheck = false;
        var ulevel = 0;
        if (this.badgesets != null) {
            for (var i = 0; i < this.badgesets.length; i++) {
                if (this.badgesets[i].name == bsname) {
                    for (var j = 0; j < this.badgesets[i].badgegroups.length; j++) {
                        for (var k = 0; k < this.staff.userbgroups.length; k++) {
                            var a1 = this.staff.userbgroups[k].focus;
                            var a2 = this.badgesets[i].badgegroups[j].focus;
                            if (a1.length >= a2.length && a2.every(function (v, i) { return a1.includes(v); })) {
                                focusCheck = true;
                            }
                            if (this.staff.userbgroups[k].approved && focusCheck && this.badgesets[i].badgegroups[j].bid == this.staff.userbgroups[k].bid) {
                                has = true;
                                if (this.badgesets[i].badgegroups[j].level > this.staff.userbgroups[k].level) {
                                    result.push({ bid: this.badgesets[i].badgegroups[j].bid, badge: this.getBadgeName(this.badgesets[i].badgegroups[j].bid), level: this.badgesets[i].badgegroups[j].level, level1: this.staff.userbgroups[k].level, focus: this.badgesets[i].badgegroups[j].focus, status: false });
                                    check = true;
                                }
                                else {
                                    ulevel = this.staff.userbgroups[k].level;
                                }
                            }
                            focusCheck = false;
                        }
                        if (!has) {
                            result.push({ bid: this.badgesets[i].badgegroups[j].bid, badge: this.getBadgeName(this.badgesets[i].badgegroups[j].bid), level: this.badgesets[i].badgegroups[j].level, level1: 0, focus: this.badgesets[i].badgegroups[j].focus, status: false });
                            check = true;
                        }
                        if (!check) {
                            result.push({ bid: this.badgesets[i].badgegroups[j].bid, badge: this.getBadgeName(this.badgesets[i].badgegroups[j].bid), level: this.badgesets[i].badgegroups[j].level, level1: ulevel, focus: this.badgesets[i].badgegroups[j].focus, status: true });
                        }
                        has = false;
                        check = false;
                    }
                }
            }
        }
        result.sort(this.toCompare);
        result.sort(this.sortStatus);
        return result;
    };
    MainComponent.prototype.sortStatus = function (a, b) {
        if (a.status > b.status)
            return -1;
        else if (a.status < b.status)
            return 1;
        else
            return 0;
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