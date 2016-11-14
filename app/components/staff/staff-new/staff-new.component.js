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
var bs_service_1 = require('../../badgeset/bs.service');
var StaffNewComponent = (function () {
    function StaffNewComponent(_staffService, _bsService, _badgeService, _router, auth) {
        this._staffService = _staffService;
        this._bsService = _bsService;
        this._badgeService = _badgeService;
        this._router = _router;
        this.auth = auth;
        this.badges = [];
        this.badgesets = [];
        this.active = false;
        this.nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.addNew = false;
        this.newBID = "";
        this.newLevel = 0;
        this.newFocus = [];
        this.newApproved = true;
        this.newL = 0;
        this.selectedLevel = 0;
        this.newBSID = "";
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
        this.focusOptions = [];
        this.statusOptions = ['Active', 'Inactive'];
        this.newStaff = { index: 0, fname: "", lname: "", latestbadge: "", latestbadgetime: "", latestbset: "", latestbsettime: "", timestamp: "", status: "Active", position: "", salary: 0, email: "", phone: "", userbgroups: [], active: false, brief: "", others: [] };
    }
    StaffNewComponent.prototype.ngOnInit = function () {
        this.getBadges();
        this.getBadgeSets();
    };
    StaffNewComponent.prototype.getBadges = function () {
        var _this = this;
        this._badgeService.getBadges().subscribe(function (badges) { _this.badges = badges; });
    };
    StaffNewComponent.prototype.getBadgeSets = function () {
        var _this = this;
        this._bsService.getBadgeSets().subscribe(function (badgesets) { _this.badgesets = badgesets; });
    };
    StaffNewComponent.prototype.getBadgeSetsOptions = function () {
        var bsOptions = [];
        if (this.badgesets != null) {
            for (var i = 0; i < this.badgesets.length; i++) {
                if (this.badgesets[i].status == 'Accepted') {
                    bsOptions.push([this.badgesets[i].name, this.badgesets[i]._id]);
                }
            }
        }
        return bsOptions.sort();
    };
    StaffNewComponent.prototype.onSelect = function (ug) {
        this.selectedUG = ug;
    };
    StaffNewComponent.prototype.addStaff = function () {
        for (var i = 0; i < this.newStaff.userbgroups.length; i++) {
            if (this.newStaff.userbgroups[i].level != 0) {
                this.newStaff.userbgroups[i].level = +this.newStaff.userbgroups[i].level;
            }
        }
        this.newStaff.userbgroups.sort(this.toCompare);
        this.newStaff.timestamp = new Date().toISOString();
        var value = JSON.stringify(this.newStaff);
        this._staffService.addStaff(value).subscribe();
        console.log('you submitted value: ', value);
        this.toStaffs();
    };
    StaffNewComponent.prototype.addBadgeGroup = function (level) {
        this.newLevel = level;
        this.newStaff.userbgroups.push({ bid: this.newBID, badge: this.getBadgeName(this.newBID), level: this.newLevel, focus: this.newFocus, approved: true, ubtimestamp: new Date().toISOString() });
        this.newStaff.userbgroups.sort(this.toCompare);
        this.newStaff.latestbadge = this.getBadgeName(this.newBID) + " " + this.newLevel;
        this.newStaff.latestbadgetime = new Date().toISOString();
        var value = JSON.stringify(this.newStaff);
        console.log('you submitted value: ', value);
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
    StaffNewComponent.prototype.getDesc = function (bid, l) {
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
    StaffNewComponent.prototype.getBadgesOptions = function () {
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
    StaffNewComponent.prototype.getLevelsOptions = function (bid) {
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
        return levelsOptions.sort();
    };
    StaffNewComponent.prototype.getFocusOptions = function (bid) {
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
    StaffNewComponent.prototype.updateChecked = function (option, event, bg) {
        console.log('event.target.value ' + event.target.value);
        var index = bg.focus.indexOf(option);
        if (event.target.checked) {
            console.log('add');
            if (index === -1) {
                bg.focus.push(option);
            }
        }
        else {
            console.log('remove');
            if (index !== -1) {
                bg.focus.splice(index, 1);
            }
        }
        //this.checked[option]=event.target.value; // or `event.target.value` not sure what this event looks like
        console.log(bg.focus);
        for (var i = 0; i < this.newStaff.userbgroups.length; i++) {
            if (this.newStaff.userbgroups[i].bid == this.selectedUG.bid && this.newStaff.userbgroups[i].level == this.selectedUG.level) {
                this.newStaff.userbgroups[i].focus = this.selectedUG.focus;
            }
        }
    };
    StaffNewComponent.prototype.updateCheckedNew = function (option, event, focus) {
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
    StaffNewComponent.prototype.checkFocus = function (fc, focus) {
        var result = false;
        if (focus.includes(fc)) {
            result = true;
        }
        return result;
    };
    StaffNewComponent.prototype.resetNewValue = function () {
        this.newBID = "";
        this.newLevel = 0;
        this.newFocus = [];
        this.newApproved = true;
        this.selectedLevel = 0;
    };
    StaffNewComponent.prototype.onSelectNewLevel = function (level) {
        this.newL = level;
        // console.log('you submitted value: ', this.newL);
        for (var i = 0; i < this.newStaff.userbgroups.length; i++) {
            if (this.newStaff.userbgroups[i].bid == this.selectedUG.bid && this.newStaff.userbgroups[i].level == this.selectedUG.level) {
                this.newStaff.userbgroups[i].level = this.newL;
                this.newStaff.userbgroups[i].focus = this.selectedUG.focus;
            }
        }
        // this.updateBadgeSet();
    };
    StaffNewComponent.prototype.onSelectedLevel = function (level) {
        this.selectedLevel = level;
    };
    StaffNewComponent.prototype.getBLs = function (bid) {
        var bls;
        for (var i = 0; i < this.badges.length; i++) {
            if (this.badges[i]._id == bid) {
                bls = this.badges[i].badgelevels;
            }
        }
        // console.log('you submitted value: ', bls);
        return bls;
    };
    StaffNewComponent.prototype.deleteUserBGroupPop = function (selectedGroup) {
        var name = this.newStaff.fname.toUpperCase() + this.newStaff.lname.toUpperCase();
        var badge = this.getBadgeName(selectedGroup.bid).toUpperCase();
        var r = confirm("Are you sure you want to delete " + badge + " from " + name + " ?");
        if (r == true) {
            this.removeBadgeGroup(selectedGroup);
        }
    };
    StaffNewComponent.prototype.removeBadgeGroup = function (selectedGroup) {
        var index = this.newStaff.userbgroups.indexOf(selectedGroup);
        this.newStaff.userbgroups.splice(index, 1);
        var value = JSON.stringify(this.newStaff);
        console.log('you submitted value: ', value);
    };
    StaffNewComponent.prototype.getBadgeName = function (bid) {
        var bname = "";
        for (var i = 0; i < this.badges.length; i++) {
            if (this.badges[i]._id == bid) {
                bname = this.badges[i].name;
            }
        }
        return bname;
    };
    StaffNewComponent.prototype.updateApproved = function (ubg, event) {
        var latestb = "";
        for (var i = 0; i < this.newStaff.userbgroups.length; i++) {
            if (this.newStaff.userbgroups[i].bid == ubg.bid) {
                if (event.target.checked) {
                    this.newStaff.userbgroups[i].approved = true;
                    latestb = this.getBadgeName(this.newStaff.userbgroups[i].bid) + " " + this.newStaff.userbgroups[i].level;
                }
                else {
                    this.newStaff.userbgroups[i].approved = false;
                }
            }
        }
        this.newStaff.latestbadge = latestb;
        this.newStaff.latestbadge = new Date().toISOString();
    };
    StaffNewComponent.prototype.loadTemplate = function (bsid) {
        console.log("bset id: ", bsid);
        this.newStaff.userbgroups = [];
        var latestb = "";
        if (bsid) {
            for (var i = 0; i < this.badgesets.length; i++) {
                if (this.badgesets[i]._id == bsid && this.badgesets[i].badgegroups.length != 0) {
                    for (var j = 0; j < this.badgesets[i].badgegroups.length; j++) {
                        this.newStaff.userbgroups.push({ bid: this.badgesets[i].badgegroups[j].bid, badge: this.getBadgeName(this.badgesets[i].badgegroups[j].bid), level: this.badgesets[i].badgegroups[j].level, focus: this.badgesets[i].badgegroups[j].focus, approved: true, ubtimestamp: new Date().toISOString() });
                        latestb = this.getBadgeName(this.badgesets[i].badgegroups[j].bid) + " " + this.badgesets[i].badgegroups[j].level;
                    }
                }
            }
        }
        this.newStaff.latestbadge = latestb;
        this.newStaff.latestbadgetime = new Date().toISOString();
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
        __metadata('design:paramtypes', [staff_service_1.StaffService, bs_service_1.BSService, badge_service_1.BadgeService, router_1.Router, auth_service_1.AuthService])
    ], StaffNewComponent);
    return StaffNewComponent;
}());
exports.StaffNewComponent = StaffNewComponent;
//# sourceMappingURL=staff-new.component.js.map