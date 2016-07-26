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
var bcat_service_1 = require('../bcat.service');
var badge_service_1 = require('../../badge/badge.service');
var auth_service_1 = require('../../auth/auth.service');
var BCatNewComponent = (function () {
    function BCatNewComponent(_bcatService, _badgeService, _router, auth) {
        this._bcatService = _bcatService;
        this._badgeService = _badgeService;
        this._router = _router;
        this.auth = auth;
        this.badges = [];
        this.active = false;
        this.nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.newLevel = 0;
        this.newBGs = [{ badge: "", levels: [] },
            { badge: "", levels: [] },
            { badge: "", levels: [] },
            { badge: "", levels: [] },
            { badge: "", levels: [] },
            { badge: "", levels: [] },
            { badge: "", levels: [] },
            { badge: "", levels: [] },
            { badge: "", levels: [] },
            { badge: "", levels: [] }];
        this.newBCat = { name: "", bgroups: this.newBGs, root: "", others: [] };
    }
    BCatNewComponent.prototype.ngOnInit = function () {
        this.getBadges();
    };
    BCatNewComponent.prototype.getBadges = function () {
        var _this = this;
        this._badgeService.getBadges().subscribe(function (badges) { _this.badges = badges; });
    };
    BCatNewComponent.prototype.addBadgeCat = function () {
        this.newBCat.bgroups.sort(this.toCompare);
        for (var i = 0; i < this.newBCat.bgroups.length; i++) {
            this.newBCat.bgroups[i].levels.sort();
        }
        var value = JSON.stringify(this.newBCat);
        this._bcatService.addBadgeCat(value).subscribe();
        console.log('you submitted value: ', value);
        this.toBadgeCats();
    };
    BCatNewComponent.prototype.toCompare = function (a, b) {
        if (a.badge < b.badge)
            return -1;
        else if (a.badge > b.badge)
            return 1;
        else
            return 0;
    };
    BCatNewComponent.prototype.toBadgeCats = function () {
        this._router.navigate(['/badgecat']);
        // location.reload();
    };
    BCatNewComponent.prototype.goBack = function () {
        window.history.back();
    };
    BCatNewComponent.prototype.getBadgesOptions = function () {
        var badgesOptions = [];
        if (this.badges != null) {
            for (var i = 0; i < this.badges.length; i++) {
                badgesOptions.push(this.badges[i].name);
            }
        }
        return badgesOptions.sort();
    };
    BCatNewComponent.prototype.getLevelsOptions = function (bname) {
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
    BCatNewComponent.prototype.addLevel = function (i, level) {
        level = +level;
        this.newBCat.bgroups[i].levels.push(level);
    };
    BCatNewComponent.prototype.deleteLevel = function (i, level) {
        var index = this.newBCat.bgroups[i].levels.indexOf(level);
        this.newBCat.bgroups[i].levels.splice(index, 1);
    };
    BCatNewComponent = __decorate([
        core_1.Component({
            selector: 'my-badgecat-new',
            templateUrl: 'app/components/badgecat/bcat-new/bcat-new.component.html',
            styleUrls: ['app/components/badgecat/bcat-new/bcat-new.component.css']
        }), 
        __metadata('design:paramtypes', [bcat_service_1.BCatService, badge_service_1.BadgeService, router_1.Router, auth_service_1.AuthService])
    ], BCatNewComponent);
    return BCatNewComponent;
}());
exports.BCatNewComponent = BCatNewComponent;
//# sourceMappingURL=bcat-new.component.js.map