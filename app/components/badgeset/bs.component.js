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
var bs_edit_component_1 = require('./bs-edit/bs-edit.component');
var bs_service_1 = require('./bs.service');
var badge_service_1 = require('../badge/badge.service');
var tier_service_1 = require('../tier/tier.service');
var auth_service_1 = require('../auth/auth.service');
var filter_array_pipe_1 = require('../pipe/filter-array-pipe');
var yes_no_pipe_1 = require('../pipe/yes-no-pipe');
var BSComponent = (function () {
    function BSComponent(_router, _bsService, _badgeService, _tierService, auth) {
        this._router = _router;
        this._bsService = _bsService;
        this._badgeService = _badgeService;
        this._tierService = _tierService;
        this.auth = auth;
        this.badgesets = [];
        this.badges = [];
        this.tiers = [];
        this.active = true;
        this.gmap = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5 };
        this.desc = "";
        this.level = 0;
        this.showBS = false;
        this.showCompare = false;
        this.bsname1 = "";
        this.bsname2 = "";
        this.bsname3 = "";
    }
    BSComponent.prototype.ngOnInit = function () {
        this.getBadgeSets();
        this.getBadges();
        this.getTiers();
    };
    BSComponent.prototype.getBadgeSets = function () {
        var _this = this;
        this._bsService.getBadgeSets().subscribe(function (badgesets) { _this.badgesets = badgesets; });
        if (this.badgesets == null) {
            this.active = true;
        }
        // this.badgesets.sort(this.toCompare);
    };
    // toCompare(a,b) {
    // 	if (a.index < b.index)
    // 		return -1;
    // 	else if (a.index > b.index)
    // 		return 1;
    // 	else 
    // 		return 0;
    // }
    BSComponent.prototype.getBadges = function () {
        var _this = this;
        this._badgeService.getBadges().subscribe(function (badges) { _this.badges = badges; });
    };
    BSComponent.prototype.getTiers = function () {
        var _this = this;
        this._tierService.getTiers().subscribe(function (tiers) { _this.tiers = tiers; });
    };
    BSComponent.prototype.onSelect = function (badgeset) {
        this.selectedBadgeSet = badgeset;
    };
    BSComponent.prototype.toBSEdit = function (bsid) {
        this._router.navigate(['/bs/edit', bsid]);
    };
    BSComponent.prototype.toBSDetail = function (bsid) {
        this._router.navigate(['/bs/detail', bsid]);
    };
    BSComponent.prototype.addBadgeSet = function () {
        this._router.navigate(['/bs/new']);
    };
    BSComponent.prototype.removeBadgeSet = function (id) {
        this._bsService.deleteBadgeSet(id).subscribe();
        location.reload();
    };
    BSComponent.prototype.deleteBadgeSetPop = function (id) {
        var r = confirm("Are you sure you want to delete this BadgeSet ?");
        if (r == true) {
            this.removeBadgeSet(id);
        }
    };
    BSComponent.prototype.getPay = function (t, g) {
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
    BSComponent.prototype.getDesc = function (b, l) {
        this.desc = "";
        if (this.badges != null && l > 0 && b != "") {
            for (var i = 0; i < this.badges.length; i++) {
                if (this.badges[i].name == b) {
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
    BSComponent.prototype.groupByTag = function (tag) {
        var bsets = [];
        if (this.badgesets != null) {
            for (var i = 0; i < this.badgesets.length; i++) {
                if (this.badgesets[i].tags.indexOf(tag) != -1) {
                    this.badgesets[i].tags = [tag];
                    bsets.push(this.badgesets[i]);
                }
            }
        }
        this.badgesets = bsets;
        this.showBS = true;
    };
    BSComponent.prototype.toBadgeSets = function () {
        this._router.navigate(['/badgeset']);
        location.reload();
    };
    BSComponent.prototype.toBadgeDetail = function (bname) {
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
    BSComponent.prototype.getComBS = function () {
        if (this.badgesets != null) {
            this.bsname1 = this.badgesets[0].name;
            this.bsname2 = this.badgesets[0].name;
            this.bsname3 = this.badgesets[0].name;
        }
        else {
            this.bsname1 = "";
            this.bsname2 = "";
            this.bsname3 = "";
        }
    };
    BSComponent.prototype.getBS = function (bsname) {
        var result;
        if (this.badgesets != null) {
            for (var i = 0; i < this.badgesets.length; i++) {
                if (this.badgesets[i].name == bsname) {
                    return this.badgesets[i];
                }
            }
        }
        return result;
    };
    BSComponent.prototype.checkCore = function (bs, b) {
        var result = "";
        if (bs != null) {
            for (var i = 0; i < bs.corebadges.length; i++) {
                if (bs.corebadges[i].badge == b) {
                    result = " ** ";
                }
            }
        }
        return result;
    };
    BSComponent.prototype.getMoney = function (bg, m, l) {
        var result = 0;
        var totalLevels = 0;
        for (var i = 0; i < bg.length; i++) {
            totalLevels += bg[i].level;
        }
        result = Math.round(m * 1000 * 0.9 / totalLevels * l);
        return result;
    };
    BSComponent = __decorate([
        core_1.Component({
            selector: 'my-badgeset',
            templateUrl: 'app/components/badgeset/bs.component.html',
            styleUrls: ['app/components/badgeset/bs.component.css'],
            directives: [bs_edit_component_1.BSEditComponent],
            pipes: [filter_array_pipe_1.FilterArrayPipe, yes_no_pipe_1.YesNoPipe]
        }), 
        __metadata('design:paramtypes', [router_1.Router, bs_service_1.BSService, badge_service_1.BadgeService, tier_service_1.TierService, auth_service_1.AuthService])
    ], BSComponent);
    return BSComponent;
}());
exports.BSComponent = BSComponent;
//# sourceMappingURL=bs.component.js.map