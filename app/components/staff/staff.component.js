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
var staff_edit_component_1 = require('./staff-edit/staff-edit.component');
var staff_service_1 = require('./staff.service');
var badge_service_1 = require('../badge/badge.service');
var bs_service_1 = require('../badgeset/bs.service');
var tier_service_1 = require('../tier/tier.service');
var auth_service_1 = require('../auth/auth.service');
var filter_array_pipe_1 = require('../pipe/filter-array-pipe');
var yes_no_pipe_1 = require('../pipe/yes-no-pipe');
var approved_pipe_1 = require('../pipe/approved-pipe');
var StaffComponent = (function () {
    function StaffComponent(_staffService, _badgeService, _bsService, _tierService, _router, auth) {
        this._staffService = _staffService;
        this._badgeService = _badgeService;
        this._bsService = _bsService;
        this._tierService = _tierService;
        this._router = _router;
        this.auth = auth;
        this.staffs = [];
        this.badges = [];
        this.badgesets = [];
        this.tiers = [];
        this.active = false;
        this.desc = "";
        this.level = 0;
        this.showBS = false;
        this.gmap = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5 };
        this.sortStaffBS = [];
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
    StaffComponent.prototype.ngOnInit = function () {
        this.getStaffs();
        this.getBadges();
        this.getBadgeSets();
        this.getTiers();
    };
    StaffComponent.prototype.getStaffs = function () {
        var _this = this;
        this._staffService.getStaffs().subscribe(function (staffs) { _this.staffs = staffs; });
    };
    StaffComponent.prototype.getBadges = function () {
        var _this = this;
        this._badgeService.getBadges().subscribe(function (badges) { _this.badges = badges; });
    };
    StaffComponent.prototype.getBadgeSets = function () {
        var _this = this;
        this._bsService.getBadgeSets().subscribe(function (badgesets) { _this.badgesets = badgesets; });
    };
    StaffComponent.prototype.getTiers = function () {
        var _this = this;
        this._tierService.getTiers().subscribe(function (tiers) { _this.tiers = tiers; });
    };
    StaffComponent.prototype.onSelect = function (staff) {
        this.selectedStaff = staff;
    };
    StaffComponent.prototype.toStaffs = function () {
        this._router.navigate(['/staffs']);
        // location.reload();
    };
    StaffComponent.prototype.toStaffEdit = function (sid) {
        this._router.navigate(['/staff/edit', sid]);
    };
    StaffComponent.prototype.toStaffDetail = function (sid) {
        this._router.navigate(['/staff/detail', sid]);
    };
    StaffComponent.prototype.addStaff = function () {
        this._router.navigate(['/staff/new']);
    };
    StaffComponent.prototype.removeStaff = function (id) {
        this._staffService.deleteStaff(id).subscribe();
        location.reload();
    };
    StaffComponent.prototype.deleteStaffPop = function (id) {
        var r = confirm("Are you sure you want to delete this Staff ?");
        if (r == true) {
            this.removeStaff(id);
        }
    };
    StaffComponent.prototype.getDesc = function (bid, l) {
        this.desc = "";
        if (this.badges != null && l > 0 && bid != "") {
            for (var i = 0; i < this.badges.length; i++) {
                if (this.badges[i]._id == bid) {
                    for (var j = 0; j < this.badges[i].badgelevels.length; j++) {
                        if (this.badges[i].badgelevels[j].level == l) {
                            this.desc = this.badges[i].badgelevels[j].desc;
                        }
                    }
                }
            }
        }
        return this.desc;
    };
    StaffComponent.prototype.toBadgeDetail = function (bid) {
        this._router.navigate(['/badge/detail', bid]);
    };
    StaffComponent.prototype.getStaffBS = function (sbgs) {
        var allbset = [];
        var count = 0;
        // var coreCount = 0;
        // var core = false;
        if (this.badgesets != null && sbgs != null) {
            for (var i = 0; i < this.badgesets.length; i++) {
                for (var j = 0; j < this.badgesets[i].badgegroups.length; j++) {
                    for (var k = 0; k < sbgs.length; k++) {
                        if (sbgs[k].status && this.badgesets[i].badgegroups[j].bid == sbgs[k].bid && this.badgesets[i].badgegroups[j].level <= sbgs[k].level) {
                            count += 1;
                        }
                    }
                }
                // if (this.badgesets[i].corebadges == []) {
                // 	core = true;
                // }else {
                // 	for (var m = 0; m < this.badgesets[i].corebadges.length; m++) {
                // 		for (var k = 0; k < sbgs.length; k++) {      
                // 			if (this.badgesets[i].corebadges[m].badge == sbgs[k].badge && this.badgesets[i].corebadges[m].level <= sbgs[k].level) {
                // 				coreCount += 1;
                // 			}
                // 		}
                // 	}
                // 	if (coreCount == this.badgesets[i].corebadges.length) {
                // 		core = true;
                // 	}
                // }
                // if (count >= this.badgesets[i].numbadges && core && this.badgesets[i].numbadges >0 && this.badgesets[i].inused) {
                // 	allbset.push(this.badgesets[i]);
                // }
                if (count >= this.badgesets[i].badgegroups.length && this.badgesets[i].status == 'Accepted') {
                    allbset.push(this.badgesets[i]);
                }
                count = 0;
            }
        }
        return allbset;
    };
    StaffComponent.prototype.getSortStaffBS = function (sbgs) {
        // var pay = "";
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
    StaffComponent.prototype.toCompareDes = function (a, b) {
        if (a.pay > b.pay)
            return -1;
        else if (a.pay < b.pay)
            return 1;
        else
            return 0;
    };
    StaffComponent.prototype.getTopStaffBS = function (sbgs) {
        var topBS = [];
        if (this.getSortStaffBS(sbgs) != null && this.getSortStaffBS(sbgs).length > 0) {
            topBS.push(this.getSortStaffBS(sbgs)[0]._id);
            topBS.push(this.getSortStaffBS(sbgs)[0].name);
        }
        return topBS;
    };
    StaffComponent.prototype.getPay = function (t, g) {
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
    StaffComponent.prototype.toBSDetail = function (bsid) {
        this._router.navigate(['/bs/detail', bsid]);
    };
    StaffComponent.prototype.approveBadge = function (staff, userbgroup) {
        for (var i = 0; i < staff.userbgroups.length; i++) {
            if (staff.userbgroups[i].bid == userbgroup.bid && staff.userbgroups[i].level < userbgroup.level && staff.userbgroups[i].status) {
                var index = staff.userbgroups.indexOf(staff.userbgroups[i]);
                staff.userbgroups.splice(index, 1);
            }
        }
        var value = JSON.stringify(staff);
        this._staffService.updateStaff(staff._id, value).subscribe();
        console.log('you submitted value: ', value);
    };
    StaffComponent.prototype.getBadgeName = function (bid) {
        var bname = "";
        for (var i = 0; i < this.badges.length; i++) {
            if (this.badges[i]._id == bid) {
                bname = this.badges[i].name;
            }
        }
        return bname;
    };
    StaffComponent = __decorate([
        core_1.Component({
            selector: 'my-staff',
            templateUrl: 'app/components/staff/staff.component.html',
            styleUrls: ['app/components/staff/staff.component.css'],
            directives: [staff_edit_component_1.StaffEditComponent],
            pipes: [filter_array_pipe_1.FilterArrayPipe, yes_no_pipe_1.YesNoPipe, approved_pipe_1.ApprovedPipe]
        }), 
        __metadata('design:paramtypes', [staff_service_1.StaffService, badge_service_1.BadgeService, bs_service_1.BSService, tier_service_1.TierService, router_1.Router, auth_service_1.AuthService])
    ], StaffComponent);
    return StaffComponent;
}());
exports.StaffComponent = StaffComponent;
//# sourceMappingURL=staff.component.js.map