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
var bs_service_1 = require('../bs.service');
var badge_service_1 = require('../../badge/badge.service');
var tier_service_1 = require('../../tier/tier.service');
var auth_service_1 = require('../../auth/auth.service');
var yes_no_pipe_1 = require('../../pipe/yes-no-pipe');
var BSDetailComponent = (function () {
    function BSDetailComponent(_bsService, _badgeService, _tierService, _router, route, auth) {
        this._bsService = _bsService;
        this._badgeService = _badgeService;
        this._tierService = _tierService;
        this._router = _router;
        this.route = route;
        this.auth = auth;
        this.badges = [];
        this.tiers = [];
        this.active = false;
        this.gmap = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5 };
        this.gradesOptions = ["A", "B", "C", "D", "E", "F"];
        this.statusOptions = ['Accepted', 'Draft', 'NotUsed'];
        this.newTag = "";
        this.more = false;
        this.edit = false;
        this.bsName = false;
        this.tg = false;
        this.tag = false;
        this.status = false;
        this.bedit = false;
        this.addNew = false;
        this.newBID = "";
        this.newLevel = 0;
        this.newFocus = "";
    }
    BSDetailComponent.prototype.ngOnInit = function () {
        this.getParams();
        this.getBadgeSet();
        this.getBadges();
        this.getTiers();
        // this.checkEmptyBadge();
    };
    BSDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    BSDetailComponent.prototype.getParams = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
    };
    BSDetailComponent.prototype.getBadgeSet = function () {
        var _this = this;
        console.log('id from _routeParams: ', this.id);
        this._bsService.getBadgeSet(this.id).subscribe(function (badgeset) { _this.badgeset = badgeset; });
    };
    BSDetailComponent.prototype.getBadgeSets = function () {
        var _this = this;
        this._bsService.getBadgeSets().subscribe(function (badgesets) { _this.badgesets = badgesets; });
    };
    BSDetailComponent.prototype.getBadges = function () {
        var _this = this;
        this._badgeService.getBadges().subscribe(function (badges) { _this.badges = badges; });
    };
    BSDetailComponent.prototype.getTiers = function () {
        var _this = this;
        this._tierService.getTiers().subscribe(function (tiers) { _this.tiers = tiers; });
    };
    BSDetailComponent.prototype.toBadgeSets = function () {
        this._router.navigate(['/badgeset']);
        this.getBadgeSets();
        // location.reload();
    };
    BSDetailComponent.prototype.toBSEdit = function (bsid) {
        this._router.navigate(['/bs/edit', bsid]);
    };
    BSDetailComponent.prototype.addBadgeSet = function () {
        this._router.navigate(['/bs/new']);
    };
    BSDetailComponent.prototype.updateBadgeSet = function () {
        for (var i = 0; i < this.badgeset.badgegroups.length; i++) {
            this.badgeset.badgegroups[i].level = +this.badgeset.badgegroups[i].level;
        }
        this.badgeset.tier = +this.badgeset.tier;
        this.badgeset.pay = +this.getPay(this.badgeset.tier, this.badgeset.grade);
        this.badgeset.badgegroups.sort(this.toCompare);
        this.badgeset.tags = this.badgeset.tags.sort();
        var value = JSON.stringify(this.badgeset);
        this._bsService.updateBadgeSet(this.id, value).subscribe();
        console.log('you submitted value: ', value);
    };
    BSDetailComponent.prototype.toCompare = function (a, b) {
        if (a.badge < b.badge)
            return -1;
        else if (a.badge > b.badge)
            return 1;
        else
            return 0;
    };
    BSDetailComponent.prototype.getPay = function (t, g) {
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
    BSDetailComponent.prototype.getDesc = function (bid, l) {
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
    BSDetailComponent.prototype.getBadgesOptions = function () {
        var badgesOptions = [];
        if (this.badges != null) {
            for (var i = 0; i < this.badges.length; i++) {
                if (this.badges[i].status == 'Accepted') {
                    badgesOptions.push([this.badges[i].name, this.badges[i]._id]);
                }
            }
        }
        // console.log('getBadgesOptions: ', badgesOptions);
        return badgesOptions.sort();
    };
    BSDetailComponent.prototype.getLevelsOptions = function (bid) {
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
    BSDetailComponent.prototype.getTiersOptions = function () {
        var tiersOptions = [];
        if (this.tiers != null) {
            for (var i = 0; i < this.tiers.length; i++) {
                tiersOptions.push(this.tiers[i].tier);
            }
        }
        // console.log('getTiersOptions: ', tiersOptions);
        return tiersOptions.sort();
    };
    BSDetailComponent.prototype.checkCore = function (b) {
        var result = "No";
        if (this.badgeset != null) {
            for (var i = 0; i < this.badgeset.corebadges.length; i++) {
                if (this.badgeset.corebadges[i].badge == b) {
                    result = "Yes";
                }
            }
        }
        return result;
    };
    // toBadgeDetail(bname:string) {
    //   var bid = "";
    //   if (this.badges != null) {
    //       for (var i = 0; i < this.badges.length; i++) {   
    //           if (this.badges[i].name == bname) {
    //               bid = this.badges[i]._id;
    //           }
    //       }
    //   }
    //   this._router.navigate(['/badge/detail',bid]);
    // }
    BSDetailComponent.prototype.toBadgeDetail = function (bid) {
        this._router.navigate(['/badge/detail', bid]);
    };
    BSDetailComponent.prototype.getMoreBadges = function (bgs) {
        var moreBadges = [];
        if (bgs != null) {
            for (var i = 0; i < bgs.length; i++) {
                for (var j = 0; j < this.badges.length; j++) {
                    for (var k = 0; k < this.badges[j].badgelevels.length; k++) {
                        if (bgs[i].badge == this.badges[j].name && bgs[i].level > this.badges[j].badgelevels[k].level) {
                            moreBadges.push({ "badge": this.badges[j].name, "level": this.badges[j].badgelevels[k].level, "focus": bgs[i].focus, "current": false });
                        }
                        if (bgs[i].badge == this.badges[j].name && bgs[i].level == this.badges[j].badgelevels[k].level) {
                            moreBadges.push({ "badge": this.badges[j].name, "level": this.badges[j].badgelevels[k].level, "focus": bgs[i].focus, "current": true });
                        }
                    }
                }
            }
        }
        return moreBadges;
    };
    BSDetailComponent.prototype.addTag = function (tag) {
        this.badgeset.tags.push(tag.toUpperCase());
    };
    BSDetailComponent.prototype.deleteTag = function (tag) {
        var index = this.badgeset.tags.indexOf(tag);
        this.badgeset.tags.splice(index, 1);
    };
    BSDetailComponent.prototype.addBadgeGroup = function () {
        // pasrse string into number
        // this.badgeset.tier = +this.badgeset.tier;
        // for (var i = 0; i < this.badgeset.badgegroups.length; i++) { 
        //   this.badgeset.badgegroups[i].level = +this.badgeset.badgegroups[i].level;
        // }
        this.newLevel = +this.newLevel;
        this.badgeset.badgegroups.push({ bid: this.newBID, badge: "", level: this.newLevel, focus: this.newFocus });
        // this.badgeset.badgegroups.sort(this.toCompare);
        // this.badgeset.corebadges.sort(this.toCompare);
        var value = JSON.stringify(this.badgeset);
        // this._bsService.updateBadgeSet(id,value).subscribe();
        console.log('you submitted value: ', value);
        this.newBID = "";
        this.newLevel = 0;
    };
    BSDetailComponent.prototype.deleteBadgeGroupPop = function (selectedGroup) {
        var isCore = false;
        for (var i = 0; i < this.badgeset.corebadges.length; i++) {
            if (this.badgeset.corebadges[i].badge == selectedGroup.badge) {
                isCore = true;
            }
        }
        if (isCore) {
            var s = confirm("WARNING: PLEASE REMOVE THIS BADGE FROM COREBADGE BEFORE DELETE IT!");
        }
        else {
            var name = this.badgeset.name.toUpperCase();
            var badge = selectedGroup.badge.toUpperCase();
            var r = confirm("Are you sure you want to delete " + badge + " from " + name + " ?");
            if (r == true) {
                this.removeBadgeGroup(selectedGroup);
            }
        }
    };
    BSDetailComponent.prototype.removeBadgeGroup = function (selectedGroup) {
        var index = this.badgeset.badgegroups.indexOf(selectedGroup);
        this.badgeset.badgegroups.splice(index, 1);
        var value = JSON.stringify(this.badgeset);
        // this._bsService.updateBadgeSet(id,value).subscribe();
        console.log('you submitted value: ', value);
    };
    BSDetailComponent.prototype.removeBadgeSet = function () {
        this._bsService.deleteBadgeSet(this.id).subscribe();
        this.toBadgeSets();
    };
    BSDetailComponent.prototype.deleteBadgeSetPop = function () {
        var name = this.badgeset.name;
        var r = confirm("Are you sure you want to delete BadgeSet: " + name.toUpperCase() + " ?");
        if (r == true) {
            this.removeBadgeSet();
        }
    };
    BSDetailComponent.prototype.checkAdmin = function () {
        if (this.auth.isAdmin()) {
            this.bedit = true;
        }
    };
    BSDetailComponent.prototype.getBadgeName = function (bid) {
        var bname = "";
        for (var i = 0; i < this.badges.length; i++) {
            if (this.badges[i]._id == bid) {
                bname = this.badges[i].name;
            }
        }
        return bname;
    };
    BSDetailComponent.prototype.goBack = function () {
        window.history.back();
    };
    BSDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-badgeset-detail',
            templateUrl: 'app/components/badgeset/bs-detail/bs-detail.component.html',
            styleUrls: ['app/components/badgeset/bs-detail/bs-detail.component.css'],
            pipes: [yes_no_pipe_1.YesNoPipe]
        }), 
        __metadata('design:paramtypes', [bs_service_1.BSService, badge_service_1.BadgeService, tier_service_1.TierService, router_1.Router, router_1.ActivatedRoute, auth_service_1.AuthService])
    ], BSDetailComponent);
    return BSDetailComponent;
}());
exports.BSDetailComponent = BSDetailComponent;
//# sourceMappingURL=bs-detail.component.js.map