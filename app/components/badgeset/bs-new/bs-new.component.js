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
var BSNewComponent = (function () {
    function BSNewComponent(_bsService, _badgeService, _tierService, _router, auth) {
        this._bsService = _bsService;
        this._badgeService = _badgeService;
        this._tierService = _tierService;
        this._router = _router;
        this.auth = auth;
        this.badges = [];
        this.tiers = [];
        this.active = false;
        this.gmap = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5 };
        this.gradesOptions = ["A", "B", "C", "D", "E", "F"];
        this.nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.prerequisite = false;
        this.numBadges = -1;
        this.newcbs = [];
        this.total = 0;
        this.newTag = "";
        this.newBGs = [{ badge: "", level: 0 },
            { badge: "", level: 0 },
            { badge: "", level: 0 },
            { badge: "", level: 0 },
            { badge: "", level: 0 },
            { badge: "", level: 0 },
            { badge: "", level: 0 },
            { badge: "", level: 0 },
            { badge: "", level: 0 },
            { badge: "", level: 0 }];
        this.statusOptions = ['Accepted', 'Draft', 'NotUsed'];
        this.newBS = { index: 0, name: "", status: "Accepted", badgegroups: this.newBGs, tier: 0, grade: "", pay: 0, tags: [], numbadges: this.numBadges, corebadges: this.newcbs, approved: false, inused: false, others: [] };
    }
    BSNewComponent.prototype.ngOnInit = function () {
        this.getBadges();
        this.getTiers();
    };
    BSNewComponent.prototype.getBadges = function () {
        var _this = this;
        this._badgeService.getBadges().subscribe(function (badges) { _this.badges = badges; });
    };
    BSNewComponent.prototype.getTiers = function () {
        var _this = this;
        this._tierService.getTiers().subscribe(function (tiers) { _this.tiers = tiers; });
    };
    BSNewComponent.prototype.addBadgeSet = function () {
        // var arr = this.newBS.badgegroups.filter(this.checkEmpty);
        // this.newBS.badgegroups = arr; //this.newBS.badgegroups.filter(this.checkEmpty);
        this.total = 0;
        this.newBS.tier = +this.newBS.tier;
        for (var i = 0; i < this.newBS.badgegroups.length; i++) {
            if (this.newBS.badgegroups[i].level != 0) {
                this.newBS.badgegroups[i].level = +this.newBS.badgegroups[i].level;
            }
            if (this.newBS.badgegroups[i].badge != "" && this.newBS.badgegroups[i].level != 0) {
                this.total += 1;
            }
        }
        if (this.numBadges == -1) {
            this.numBadges = Math.round(this.total / 2);
        }
        this.newBS.numbadges = this.numBadges;
        this.newBS.pay = +this.getPay(this.newBS.tier, this.newBS.grade);
        console.log('you submitted total: ', this.total);
        this.newBS.badgegroups.sort(this.toCompare);
        this.newBS.corebadges.sort(this.toCompare);
        var value = JSON.stringify(this.newBS);
        this._bsService.addBadgeSet(value).subscribe();
        console.log('you submitted value: ', value);
        this.toBadgeSets();
    };
    BSNewComponent.prototype.toCompare = function (a, b) {
        if (a.badge < b.badge)
            return -1;
        else if (a.badge > b.badge)
            return 1;
        else
            return 0;
    };
    BSNewComponent.prototype.toBadgeSets = function () {
        this._router.navigate(['/badgeset']);
        location.reload();
    };
    BSNewComponent.prototype.goBack = function () {
        window.history.back();
    };
    BSNewComponent.prototype.getPay = function (t, g) {
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
    BSNewComponent.prototype.getDesc = function (b, l) {
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
    BSNewComponent.prototype.getBadgesOptions = function () {
        var badgesOptions = [];
        if (this.badges != null) {
            for (var i = 0; i < this.badges.length; i++) {
                if (this.badges[i].status == 'Accepted') {
                    badgesOptions.push(this.badges[i].name);
                }
            }
        }
        return badgesOptions.sort();
    };
    BSNewComponent.prototype.getLevelsOptions = function (bname) {
        var levelsOptions = [];
        if (this.badges != null) {
            for (var i = 0; i < this.badges.length; i++) {
                if (this.badges[i].name == bname) {
                    for (var j = 0; j < this.badges[i].badgelevels.length; j++) {
                        levelsOptions.push(this.badges[i].badgelevels[j].level);
                    }
                }
            }
        }
        return levelsOptions.sort();
    };
    BSNewComponent.prototype.getTiersOptions = function () {
        var tiersOptions = [];
        if (this.tiers != null) {
            for (var i = 0; i < this.tiers.length; i++) {
                tiersOptions.push(this.tiers[i].tier);
            }
        }
        return tiersOptions.sort();
    };
    BSNewComponent.prototype.getTotalBadges = function (bgs) {
        this.total = 0;
        if (bgs != null) {
            for (var i = 0; i < bgs.length; i++) {
                if (bgs[i].badge != "" && bgs[i].level != 0) {
                    this.total += 1;
                }
            }
        }
        // if (this.total == 1) {
        //   this.numBadges = 1;
        // }else{
        // }
        this.numBadges = Math.round(this.total / 2);
        return this.total;
    };
    BSNewComponent.prototype.getCoreBadgesOptions = function (bgs) {
        var corebadgesOptions = [];
        if (bgs != null) {
            for (var i = 0; i < bgs.length; i++) {
                if (bgs[i].badge != "" && bgs[i].level != 0) {
                    corebadgesOptions.push(bgs[i].badge + " - " + bgs[i].level);
                }
            }
        }
        return corebadgesOptions.sort();
    };
    BSNewComponent.prototype.addCoreBadge = function (cb) {
        var array = cb.toString().split(' - ');
        console.log('you submitted cb value: ', array);
        var b = array[0];
        var l = +array[1]; // parse into number
        this.newBS.corebadges.push({ badge: b, level: l });
    };
    BSNewComponent.prototype.deleteCoreBadgePop = function (corebadge) {
        var name = this.newBS.name.toUpperCase();
        var cbadge = (corebadge.badge + " " + corebadge.level).toUpperCase();
        var r = confirm("Are you sure you want to delete CORE BADGE " + cbadge + " from " + name + " ?");
        if (r == true) {
            this.removeCoreBadge(corebadge);
        }
    };
    BSNewComponent.prototype.removeCoreBadge = function (selectedCoreBadge) {
        var index = this.newBS.corebadges.indexOf(selectedCoreBadge);
        this.newBS.corebadges.splice(index, 1);
    };
    BSNewComponent.prototype.addNumBadges = function () {
        // this.newBS.numbadges = this.numBadges;
        console.log('you submitted this.numBadges: ', this.numBadges);
    };
    BSNewComponent.prototype.addTag = function (tag) {
        this.newBS.tags.push(tag.toUpperCase());
    };
    BSNewComponent.prototype.deleteTag = function (tag) {
        var index = this.newBS.tags.indexOf(tag);
        this.newBS.tags.splice(index, 1);
    };
    BSNewComponent = __decorate([
        core_1.Component({
            selector: 'my-badgeset-new',
            templateUrl: 'app/components/badgeset/bs-new/bs-new.component.html',
            styleUrls: ['app/components/badgeset/bs-new/bs-new.component.css']
        }), 
        __metadata('design:paramtypes', [bs_service_1.BSService, badge_service_1.BadgeService, tier_service_1.TierService, router_1.Router, auth_service_1.AuthService])
    ], BSNewComponent);
    return BSNewComponent;
}());
exports.BSNewComponent = BSNewComponent;
//# sourceMappingURL=bs-new.component.js.map