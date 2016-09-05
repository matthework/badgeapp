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
var StaffEditComponent = (function () {
    function StaffEditComponent(_staffService, _badgeService, _router, route, auth) {
        this._staffService = _staffService;
        this._badgeService = _badgeService;
        this._router = _router;
        this.route = route;
        this.auth = auth;
        this.badges = [];
        this.active = false;
        this.newBID = "";
        this.newLevel = 0;
        this.newStatus = false;
        this.statusOptions = ['Active', 'Inactive'];
    }
    StaffEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.getStaff();
        this.getBadges();
    };
    StaffEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    StaffEditComponent.prototype.getStaff = function () {
        var _this = this;
        console.log('id from _routeParams: ', this.id);
        this._staffService.getStaff(this.id).subscribe(function (staff) { _this.staff = staff; });
    };
    StaffEditComponent.prototype.getBadges = function () {
        var _this = this;
        this._badgeService.getBadges().subscribe(function (badges) { _this.badges = badges; });
    };
    StaffEditComponent.prototype.toStaffs = function () {
        this._router.navigate(['/staffs']);
        location.reload();
    };
    StaffEditComponent.prototype.updateStaff = function () {
        // pasrse string into number
        for (var i = 0; i < this.staff.userbgroups.length; i++) {
            this.staff.userbgroups[i].level = +this.staff.userbgroups[i].level;
        }
        this.staff.userbgroups.sort(this.toCompare);
        var value = JSON.stringify(this.staff);
        this._staffService.updateStaff(this.id, value).subscribe();
        console.log('you submitted value: ', value);
        this.toStaffs();
    };
    StaffEditComponent.prototype.toCompare = function (a, b) {
        if (a.badge < b.badge)
            return -1;
        else if (a.badge > b.badge)
            return 1;
        else
            return 0;
    };
    StaffEditComponent.prototype.addStaff = function () {
        this._router.navigate(['/staff/new']);
    };
    StaffEditComponent.prototype.addBadgeGroup = function () {
        this.newLevel = +this.newLevel;
        this.staff.userbgroups.push({ bid: this.newBID, badge: "", level: this.newLevel, status: this.newStatus });
        var value = JSON.stringify(this.staff);
        // this._staffService.updateStaff(id,value).subscribe();
        console.log('you submitted value: ', value);
        this.newBID = "";
        this.newLevel = 0;
        this.newStatus = false;
    };
    StaffEditComponent.prototype.removeStaff = function () {
        this._staffService.deleteStaff(this.id).subscribe();
        this.toStaffs();
    };
    StaffEditComponent.prototype.deleteStaffPop = function () {
        var fname = this.staff.fname;
        var lname = this.staff.lname;
        var name = fname.toUpperCase() + " " + lname.toUpperCase();
        var r = confirm("Are you sure you want to delete Staff: " + name + " ?");
        if (r == true) {
            this.removeStaff();
        }
    };
    StaffEditComponent.prototype.deleteBadgeGroupPop = function (selectedGroup) {
        var name = this.staff.fname.toUpperCase() + " " + this.staff.lname.toUpperCase();
        var badge = selectedGroup.badge.toUpperCase();
        var level = selectedGroup.level;
        var r = confirm("Are you sure you want to delete " + badge + " " + level + " from " + name + " ?");
        if (r == true) {
            this.removeBadgeGroup(selectedGroup);
        }
    };
    StaffEditComponent.prototype.removeBadgeGroup = function (selectedGroup) {
        var index = this.staff.userbgroups.indexOf(selectedGroup);
        this.staff.userbgroups.splice(index, 1);
        var value = JSON.stringify(this.staff);
        // this._staffService.updateStaff(id,value).subscribe();
        console.log('you submitted value: ', value);
    };
    StaffEditComponent.prototype.getDesc = function (bid, l) {
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
    StaffEditComponent.prototype.getBadgesOptions = function () {
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
    StaffEditComponent.prototype.getNewBadgesOptions = function () {
        var badgesOptions = [];
        var userbgs = [];
        if (this.staff.userbgroups != null) {
            for (var j = 0; j < this.staff.userbgroups.length; j++) {
                userbgs.push(this.staff.userbgroups[j].bid);
            }
        }
        if (this.badges != null) {
            for (var i = 0; i < this.badges.length; i++) {
                var index = userbgs.indexOf(this.badges[i]._id);
                if (this.badges[i].status == 'Accepted' && index == -1) {
                    badgesOptions.push([this.badges[i].name, this.badges[i]._id]);
                }
            }
        }
        return badgesOptions.sort();
    };
    StaffEditComponent.prototype.getLevelsOptions = function (bid) {
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
    StaffEditComponent.prototype.goBack = function () {
        window.history.back();
    };
    StaffEditComponent = __decorate([
        core_1.Component({
            selector: 'my-staff-edit',
            templateUrl: 'app/components/staff/staff-edit/staff-edit.component.html',
            styleUrls: ['app/components/staff/staff-edit/staff-edit.component.css']
        }), 
        __metadata('design:paramtypes', [staff_service_1.StaffService, badge_service_1.BadgeService, router_1.Router, router_1.ActivatedRoute, auth_service_1.AuthService])
    ], StaffEditComponent);
    return StaffEditComponent;
}());
exports.StaffEditComponent = StaffEditComponent;
//# sourceMappingURL=staff-edit.component.js.map