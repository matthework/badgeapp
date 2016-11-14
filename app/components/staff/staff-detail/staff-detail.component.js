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
        this.staffName = false;
        this.pos = false;
        this.email = false;
        this.sta = false;
        this.brief = false;
        this.bedit = false;
        this.newBID = "";
        this.newLevel = 0;
        this.newFocus = [];
        this.newApproved = true;
        this.newL = 0;
        this.selectedLevel = 0;
        this.addNew = false;
        this.advanced = false;
        this.statusOptions = ['Active', 'Inactive'];
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
        this.getParams();
        this.getStaff();
        this.getBadges();
        this.getBadgeSets();
        this.getTiers();
    };
    StaffDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    StaffDetailComponent.prototype.getParams = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
    };
    StaffDetailComponent.prototype.getStaff = function () {
        var _this = this;
        console.log('id from _routeParams: ', this.id);
        this._staffService.getStaff(this.id).subscribe(function (staff) { _this.staff = staff; });
    };
    StaffDetailComponent.prototype.onSelect = function (ug) {
        this.selectedUG = ug;
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
    StaffDetailComponent.prototype.toBadgeDetail = function (bid) {
        this._router.navigate(['/badge/detail', bid]);
    };
    StaffDetailComponent.prototype.updateStaff = function () {
        // pasrse string into number
        for (var i = 0; i < this.staff.userbgroups.length; i++) {
            // this.staff.userbgroups[i].level = +this.staff.userbgroups[i].level;
            this.staff.userbgroups[i].badge = this.getBadgeName(this.staff.userbgroups[i].bid);
        }
        this.staff.timestamp = new Date().toISOString();
        this.staff.userbgroups.sort(this.toCompare);
        this.staff.userbgroups.sort(this.sortApproved);
        var value = JSON.stringify(this.staff);
        this._staffService.updateStaff(this.staff._id, value).subscribe();
        console.log('you submitted value: ', value);
    };
    StaffDetailComponent.prototype.toCompare = function (a, b) {
        if (a.badge < b.badge)
            return -1;
        else if (a.badge > b.badge)
            return 1;
        else
            return 0;
    };
    StaffDetailComponent.prototype.sortApproved = function (a, b) {
        if (a.approved > b.approved)
            return -1;
        else if (a.approved < b.approved)
            return 1;
        else
            return 0;
    };
    StaffDetailComponent.prototype.addStaff = function () {
        this._router.navigate(['/staff/new']);
    };
    StaffDetailComponent.prototype.addUserBGroup = function (level) {
        this.newLevel = level;
        // for (var i = 0; i < this.staff.userbgroups.length; i++) { 
        //    if (this.staff.userbgroups[i].bid == this.newBID && this.staff.userbgroups[i].level <= this.newLevel) {
        //       let index = this.staff.userbgroups.indexOf(this.staff.userbgroups[i]);
        //       this.staff.userbgroups.splice(index,1);
        //    }
        // }  
        this.staff.userbgroups.push({ bid: this.newBID, badge: this.getBadgeName(this.newBID), level: this.newLevel, focus: this.newFocus, approved: this.newApproved, ubtimestamp: new Date().toISOString() });
        this.staff.latestbadge = this.getBadgeName(this.newBID) + " " + this.newLevel;
        this.staff.latestbadgetime = new Date().toISOString();
        var value = JSON.stringify(this.staff);
        // this._staffService.updateStaff(this.staff._id,value).subscribe();
        this.updateStaff();
        console.log('you submitted value: ', value);
    };
    StaffDetailComponent.prototype.removeStaff = function () {
        this._staffService.deleteStaff(this.id).subscribe();
        this.toStaffs();
    };
    StaffDetailComponent.prototype.deleteStaffPop = function () {
        var fname = this.staff.fname;
        var lname = this.staff.lname;
        var name = fname.toUpperCase() + " " + lname.toUpperCase();
        var r = confirm("Are you sure you want to delete Staff: " + name + " ?");
        if (r == true) {
            this.removeStaff();
        }
    };
    StaffDetailComponent.prototype.deleteUserBGroupPop = function (selectedGroup) {
        var name = this.staff.fname.toUpperCase() + " " + this.staff.lname.toUpperCase();
        var badge = this.getBadgeName(selectedGroup.bid).toUpperCase();
        var level = selectedGroup.level;
        var r = confirm("Are you sure you want to delete " + badge + " " + level + " from " + name + " ?");
        if (r == true) {
            this.removeBadgeGroup(selectedGroup);
        }
    };
    StaffDetailComponent.prototype.removeBadgeGroup = function (selectedGroup) {
        var index = this.staff.userbgroups.indexOf(selectedGroup);
        this.staff.userbgroups.splice(index, 1);
        var value = JSON.stringify(this.staff);
        this._staffService.updateStaff(this.staff._id, value).subscribe();
        console.log('you submitted value: ', value);
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
    StaffDetailComponent.prototype.getStaffBS = function (sbgs) {
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
                }
                totolCore = 0;
                coreCount = 0;
                ncCount = 0;
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
                            moreBadges.push({ "approved": bgs[i].approved, "bid": this.badges[j]._id, "level": this.badges[j].badgelevels[k].level, "focus": "", "current": false });
                        }
                        if (bgs[i].bid == this.badges[j]._id && bgs[i].level == this.badges[j].badgelevels[k].level) {
                            moreBadges.push({ "approved": bgs[i].approved, "bid": this.badges[j]._id, "level": this.badges[j].badgelevels[k].level, "focus": bgs[i].focus, "current": true });
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
    StaffDetailComponent.prototype.getBadgesOptions = function () {
        var badgesOptions = [];
        if (this.badges != null) {
            for (var i = 0; i < this.badges.length; i++) {
                if (this.badges[i].status == 'Accepted') {
                    badgesOptions.push([this.badges[i].name, this.badges[i]._id]);
                }
            }
            // console.log('getBadgesOptions: ', badgesOptions);
            return badgesOptions.sort();
        }
    };
    // getNewBadgesOptions() {
    //     var badgesOptions = [];
    //     var userbgs = [];
    //     if (this.staff.userbgroups != null) {
    //         for (var j = 0; j < this.staff.userbgroups.length; j++) { 
    //             userbgs.push(this.staff.userbgroups[j].bid);
    //         }
    //     }
    //     if (this.badges != null) {
    //         for (var i = 0; i < this.badges.length; i++) { 
    //             let index = userbgs.indexOf(this.badges[i]._id);
    //             if (this.badges[i].status=='Accepted') { // && index == -1) {
    //                 badgesOptions.push([this.badges[i].name,this.badges[i]._id]);
    //             }
    //         }
    //     }
    //     return badgesOptions.sort();
    // }
    StaffDetailComponent.prototype.getLevelsOptions = function (bid) {
        var levelsOptions = [];
        for (var i = 0; i < this.badges.length; i++) {
            if (this.badges[i]._id == bid) {
                for (var j = 0; j < this.badges[i].badgelevels.length; j++) {
                    levelsOptions.push(this.badges[i].badgelevels[j].level);
                }
            }
        }
        // console.log('getBadgesOptions: ', badgesOptions);
        return levelsOptions.sort();
    };
    StaffDetailComponent.prototype.getFocusOptions = function (bid) {
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
    StaffDetailComponent.prototype.updateChecked = function (option, event, bg) {
        // this.checked = focus;
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
        console.log(bg.focus);
        for (var i = 0; i < this.staff.userbgroups.length; i++) {
            if (this.staff.userbgroups[i].bid == this.selectedUG.bid && this.staff.userbgroups[i].level == this.selectedUG.level) {
                this.staff.userbgroups[i].focus = this.selectedUG.focus;
            }
        }
        // this.updateStaff();
    };
    StaffDetailComponent.prototype.updateCheckedNew = function (option, event, focus) {
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
    StaffDetailComponent.prototype.checkFocus = function (fc, focus) {
        var result = false;
        if (focus.includes(fc)) {
            result = true;
        }
        return result;
    };
    StaffDetailComponent.prototype.checkAdmin = function () {
        if (this.auth.isAdmin()) {
            this.bedit = true;
        }
    };
    // checkCurrent(current) {
    //    if(current) {
    //       this.more = false;
    //    }else {
    //       this.bedit = false;
    //    }
    // }
    StaffDetailComponent.prototype.resetNewValue = function () {
        this.newBID = "";
        this.newLevel = 0;
        this.newFocus = [];
        this.newApproved = true;
        this.selectedLevel = 0;
    };
    StaffDetailComponent.prototype.onSelectNewLevel = function (level) {
        this.newL = level;
        // console.log('you submitted value: ', this.newL);
        for (var i = 0; i < this.staff.userbgroups.length; i++) {
            if (this.staff.userbgroups[i].bid == this.selectedUG.bid && this.staff.userbgroups[i].level == this.selectedUG.level) {
                this.staff.userbgroups[i].level = this.newL;
                this.staff.userbgroups[i].focus = this.selectedUG.focus;
            }
        }
        // this.updateStaff();
    };
    StaffDetailComponent.prototype.onSelectedLevel = function (level) {
        this.selectedLevel = level;
    };
    StaffDetailComponent.prototype.getBLs = function (bid) {
        var bls;
        for (var i = 0; i < this.badges.length; i++) {
            if (this.badges[i]._id == bid) {
                bls = this.badges[i].badgelevels;
            }
        }
        // console.log('you submitted value: ', bls);
        return bls;
    };
    StaffDetailComponent.prototype.updateApproved = function (ubg, event) {
        var latestb = "";
        for (var i = 0; i < this.staff.userbgroups.length; i++) {
            if (this.staff.userbgroups[i].bid == ubg.bid) {
                if (event.target.checked) {
                    this.staff.userbgroups[i].approved = true;
                    console.log("Approved at TimeStamp: ", new Date().toISOString());
                    this.staff.userbgroups[i].ubtimestamp = new Date().toISOString();
                    latestb = this.getBadgeName(this.staff.userbgroups[i].bid) + " " + this.staff.userbgroups[i].level;
                }
                else {
                    this.staff.userbgroups[i].approved = false;
                }
            }
        }
        this.staff.latestbadge = latestb;
        this.staff.latestbadgetime = new Date().toISOString();
        this.updateStaff();
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