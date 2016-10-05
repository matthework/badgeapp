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
        this.checked = [];
        this.addNew = false;
        this.newBID = "";
        this.newLevel = 0;
        this.newFocus = [];
        this.newL = 0;
        this.selectedLevel = 0;
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
        // newBGs = [{bid: "", badge: "", level: 0, focus: []},
        //           {bid: "", badge: "", level: 0, focus: []},
        //           {bid: "", badge: "", level: 0, focus: []},
        //           {bid: "", badge: "", level: 0, focus: []},
        //           {bid: "", badge: "", level: 0, focus: []},
        //           {bid: "", badge: "", level: 0, focus: []},
        //           {bid: "", badge: "", level: 0, focus: []},
        //           {bid: "", badge: "", level: 0, focus: []},
        //           {bid: "", badge: "", level: 0, focus: []},
        //           {bid: "", badge: "", level: 0, focus: []}];
        this.statusOptions = ['Accepted', 'Draft', 'NotUsed'];
        this.newBS = { index: 0, name: "", status: "Accepted", badgegroups: [], tier: 0, grade: "", pay: 0, tags: [], numbadges: this.numBadges, corebadges: this.newcbs, approved: true, inused: true, others: [] };
    }
    BSNewComponent.prototype.ngOnInit = function () {
        this.getBadges();
        this.getBadgeSets();
        this.getTiers();
    };
    BSNewComponent.prototype.getBadges = function () {
        var _this = this;
        this._badgeService.getBadges().subscribe(function (badges) { _this.badges = badges; });
    };
    BSNewComponent.prototype.getBadgeSets = function () {
        var _this = this;
        this._bsService.getBadgeSets().subscribe(function (badgesets) { _this.badgesets = badgesets; });
    };
    BSNewComponent.prototype.getTiers = function () {
        var _this = this;
        this._tierService.getTiers().subscribe(function (tiers) { _this.tiers = tiers; });
    };
    BSNewComponent.prototype.onSelect = function (bg) {
        this.selectedBG = bg;
    };
    BSNewComponent.prototype.addBadgeSet = function () {
        // var arr = this.newBS.badgegroups.filter(this.checkEmpty);
        // this.newBS.badgegroups = arr; //this.newBS.badgegroups.filter(this.checkEmpty);
        // this.total = 0;
        this.newBS.tier = +this.newBS.tier;
        for (var i = 0; i < this.newBS.badgegroups.length; i++) {
            if (this.newBS.badgegroups[i].level != 0) {
                this.newBS.badgegroups[i].level = +this.newBS.badgegroups[i].level;
            }
        }
        // if (this.numBadges==-1) {
        //   this.numBadges = Math.round(this.total/2);
        // }
        // this.newBS.numbadges = this.numBadges;
        this.newBS.pay = +this.getPay(this.newBS.tier, this.newBS.grade);
        console.log('you submitted total: ', this.total);
        this.newBS.badgegroups.sort(this.toCompare);
        this.newBS.tags = this.newBS.tags.sort();
        // this.newBS.corebadges.sort(this.toCompare);
        var value = JSON.stringify(this.newBS);
        this._bsService.addBadgeSet(value).subscribe();
        console.log('you submitted value: ', value);
        this.toBadgeSets();
    };
    BSNewComponent.prototype.addBadgeGroup = function (level) {
        this.newLevel = level;
        this.newBS.badgegroups.push({ bid: this.newBID, badge: "", level: this.newLevel, focus: this.newFocus });
        // this.badgeset.badgegroups.sort(this.toCompare);
        // this.badgeset.corebadges.sort(this.toCompare);
        var value = JSON.stringify(this.newBS);
        // this._bsService.updateBadgeSet(this.newBS._id,value).subscribe();
        console.log('you submitted value: ', value);
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
        this.getBadgeSets();
        // location.reload();
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
    BSNewComponent.prototype.getDesc = function (bid, l) {
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
    BSNewComponent.prototype.getBadgesOptions = function () {
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
    BSNewComponent.prototype.getLevelsOptions = function (bid) {
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
    BSNewComponent.prototype.getFocusOptions = function (bid) {
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
        this.newBS.corebadges.push({ bid: "", badge: b, level: l, focus: [] });
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
        this.newTag = "";
    };
    BSNewComponent.prototype.deleteTag = function (tag) {
        var index = this.newBS.tags.indexOf(tag);
        this.newBS.tags.splice(index, 1);
    };
    BSNewComponent.prototype.updateChecked = function (option, event, bg) {
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
        for (var i = 0; i < this.newBS.badgegroups.length; i++) {
            if (this.newBS.badgegroups[i].bid == this.selectedBG.bid && this.newBS.badgegroups[i].level == this.selectedBG.level) {
                this.newBS.badgegroups[i].focus = this.selectedBG.focus;
            }
        }
        this.updateBadgeSet();
    };
    BSNewComponent.prototype.updateCheckedNew = function (option, event, focus) {
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
    BSNewComponent.prototype.checkFocus = function (fc, focus) {
        var result = false;
        if (focus.includes(fc)) {
            result = true;
        }
        return result;
    };
    BSNewComponent.prototype.getBadgeName = function (bid) {
        var bname = "";
        for (var i = 0; i < this.badges.length; i++) {
            if (this.badges[i]._id == bid) {
                bname = this.badges[i].name;
            }
        }
        // console.log('you submitted value: ', bname);
        return bname;
    };
    BSNewComponent.prototype.resetNewValue = function () {
        this.newBID = "";
        this.newLevel = 0;
        this.newFocus = [];
        this.selectedLevel = 0;
    };
    BSNewComponent.prototype.getBLs = function (bid) {
        var bls;
        for (var i = 0; i < this.badges.length; i++) {
            if (this.badges[i]._id == bid) {
                bls = this.badges[i].badgelevels;
            }
        }
        // console.log('you submitted value: ', bls);
        return bls;
    };
    BSNewComponent.prototype.updateBadgeSet = function () {
        if (this.newBS.tags == null) {
            this.newBS.tags = [];
        }
        for (var i = 0; i < this.newBS.badgegroups.length; i++) {
            this.newBS.badgegroups[i].level = +this.newBS.badgegroups[i].level;
            if (this.newBS.badgegroups[i].focus == null) {
                this.newBS.badgegroups[i].focus = [];
            }
        }
        this.newBS.tier = +this.newBS.tier;
        this.newBS.pay = +this.getPay(this.newBS.tier, this.newBS.grade);
        this.newBS.badgegroups.sort(this.toCompare);
        this.newBS.tags = this.newBS.tags.sort();
        var value = JSON.stringify(this.newBS);
        // this._bsService.updateBadgeSet(this.id,value).subscribe();
        console.log('you submitted value: ', value);
    };
    BSNewComponent.prototype.onSelectNewLevel = function (level) {
        this.newL = level;
        // console.log('you submitted value: ', this.newL);
        for (var i = 0; i < this.newBS.badgegroups.length; i++) {
            if (this.newBS.badgegroups[i].bid == this.selectedBG.bid && this.newBS.badgegroups[i].level == this.selectedBG.level) {
                this.newBS.badgegroups[i].level = this.newL;
                this.newBS.badgegroups[i].focus = this.selectedBG.focus;
            }
        }
        this.updateBadgeSet();
    };
    BSNewComponent.prototype.onSelectedLevel = function (level) {
        this.selectedLevel = level;
    };
    BSNewComponent.prototype.removeBadgeGroup = function (selectedGroup) {
        var index = this.newBS.badgegroups.indexOf(selectedGroup);
        this.newBS.badgegroups.splice(index, 1);
        var value = JSON.stringify(this.newBS);
        // this._bsService.updateBadgeSet(this.badgeset._id,value).subscribe();
        console.log('you submitted value: ', value);
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