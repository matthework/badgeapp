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
var BCatEditComponent = (function () {
    function BCatEditComponent(_bcatService, _badgeService, _router, route) {
        this._bcatService = _bcatService;
        this._badgeService = _badgeService;
        this._router = _router;
        this.route = route;
        this.badges = [];
        this.active = false;
        this.newBadge = "";
        this.newLevels = [];
        this.newBG = { badge: "", levels: [] };
    }
    BCatEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.getBadgeCat();
        this.getBadges();
    };
    BCatEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    BCatEditComponent.prototype.getBadgeCat = function () {
        var _this = this;
        console.log('id from _routeParams: ', this.id);
        this._bcatService.getBadgeCat(this.id).subscribe(function (badgecat) { _this.badgecat = badgecat; });
    };
    BCatEditComponent.prototype.getBadges = function () {
        var _this = this;
        this._badgeService.getBadges().subscribe(function (badges) { _this.badges = badges; });
    };
    BCatEditComponent.prototype.toBadgeCats = function () {
        this._router.navigate(['/badgecat']);
    };
    BCatEditComponent.prototype.updateBadgeCat = function () {
        this.badgecat.bgroups.sort(this.toCompare);
        for (var i = 0; i < this.badgecat.bgroups.length; i++) {
            this.badgecat.bgroups[i].levels.sort();
        }
        var value = JSON.stringify(this.badgecat);
        this._bcatService.updateBadgeCat(this.id, value).subscribe();
        console.log('you submitted value: ', value);
        this.toBadgeCats();
    };
    BCatEditComponent.prototype.toCompare = function (a, b) {
        if (a.badge < b.badge)
            return -1;
        else if (a.badge > b.badge)
            return 1;
        else
            return 0;
    };
    BCatEditComponent.prototype.addBadgeCat = function () {
        this._router.navigate(['/bcat/new']);
    };
    BCatEditComponent.prototype.removeBadgeCat = function () {
        this._bcatService.deleteBadgeCat(this.id).subscribe();
        this.toBadgeCats();
    };
    BCatEditComponent.prototype.deleteBadgeCatPop = function () {
        var name = this.badgecat.name;
        var r = confirm("Are you sure you want to delete Badge Category: " + name.toUpperCase() + " ?");
        if (r == true) {
            this.removeBadgeCat();
        }
    };
    BCatEditComponent.prototype.deleteBGroupPop = function (bg) {
        var name = this.badgecat.name.toUpperCase();
        var badge = bg.badge.toUpperCase();
        var r = confirm("Are you sure you want to delete " + badge + " from " + name + " ?");
        if (r == true) {
            this.removeBGroup(bg);
        }
    };
    BCatEditComponent.prototype.removeBGroup = function (bg) {
        var index = this.badgecat.bgroups.indexOf(bg);
        this.badgecat.bgroups.splice(index, 1);
        var value = JSON.stringify(this.badgecat);
        console.log('you submitted value: ', value);
    };
    BCatEditComponent.prototype.getBadgesOptions = function () {
        var badgesOptions = [];
        if (this.badges != null) {
            for (var i = 0; i < this.badges.length; i++) {
                badgesOptions.push(this.badges[i].name);
            }
        }
        // console.log('getBadgesOptions: ', badgesOptions);
        return badgesOptions.sort();
    };
    BCatEditComponent.prototype.getLevelsOptions = function (bname) {
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
        // console.log('getBadgesOptions: ', badgesOptions);
        return levelsOptions.sort();
    };
    BCatEditComponent.prototype.addLevel = function (bg, level) {
        level = +level;
        bg.levels.push(level);
    };
    BCatEditComponent.prototype.deleteLevel = function (bg, level) {
        var index = bg.levels.indexOf(level);
        bg.levels.splice(index, 1);
    };
    BCatEditComponent.prototype.deleteLevelPop = function (bg, level) {
        var name = bg.badge;
        var r = confirm("Are you sure you want to delete Badge: " + name.toUpperCase() + " Level: " + level + " ?");
        if (r == true) {
            this.deleteLevel(bg, level);
        }
    };
    BCatEditComponent.prototype.addNewLevel = function (badge, level) {
        level = +level;
        this.newBG.badge = badge;
        this.newBG.levels.push(level);
    };
    BCatEditComponent.prototype.deleteNewLevel = function (level) {
        var index = this.newBG.levels.indexOf(level);
        this.newBG.levels.splice(index, 1);
    };
    BCatEditComponent.prototype.addBGroup = function () {
        if (this.newBG.levels.length != 0) {
            this.badgecat.bgroups.push(this.newBG);
        }
        this.newBG = { badge: "", levels: [] };
    };
    BCatEditComponent.prototype.goBack = function () {
        window.history.back();
    };
    BCatEditComponent = __decorate([
        core_1.Component({
            selector: 'my-badgecat-edit',
            templateUrl: 'app/components/badgecat/bcat-edit/bcat-edit.component.html',
            styleUrls: ['app/components/badgecat/bcat-edit/bcat-edit.component.css']
        }), 
        __metadata('design:paramtypes', [bcat_service_1.BCatService, badge_service_1.BadgeService, router_1.Router, router_1.ActivatedRoute])
    ], BCatEditComponent);
    return BCatEditComponent;
}());
exports.BCatEditComponent = BCatEditComponent;
//# sourceMappingURL=bcat-edit.component.js.map