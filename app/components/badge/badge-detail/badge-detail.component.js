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
var badge_service_1 = require('../badge.service');
var bs_service_1 = require('../../badgeset/bs.service');
var auth_service_1 = require('../../auth/auth.service');
var yes_no_pipe_1 = require('../../pipe/yes-no-pipe');
var BadgeDetailComponent = (function () {
    function BadgeDetailComponent(_badgeService, _bsService, _router, route, auth) {
        this._badgeService = _badgeService;
        this._bsService = _bsService;
        this._router = _router;
        this.route = route;
        this.auth = auth;
        this.badges = [];
        this.badgesets = [];
        this.newFC = "";
        this.newLevel = 0;
        this.newDesc = "";
        this.statusOptions = ['Accepted', 'Draft', 'NotUsed'];
        this.bName = false;
        this.oview = false;
        this.editStatus = false;
        this.bedit = false;
        this.addLevel = false;
        this.editFC = false;
        this.editOwner = false;
        this.advanced = false;
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
    BadgeDetailComponent.prototype.ngOnInit = function () {
        this.getParams();
        this.getBadge();
        this.getBadges();
        this.getBadgeSets();
    };
    BadgeDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    BadgeDetailComponent.prototype.getParams = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
    };
    BadgeDetailComponent.prototype.getBadge = function () {
        var _this = this;
        console.log('id from _routeParams: ', this.id);
        this._badgeService.getBadge(this.id).subscribe(function (badge) { _this.badge = badge; });
    };
    BadgeDetailComponent.prototype.onSelect = function (bl) {
        this.selectedBL = bl;
    };
    BadgeDetailComponent.prototype.getBadges = function () {
        var _this = this;
        this._badgeService.getBadges().subscribe(function (badges) { _this.badges = badges; });
    };
    BadgeDetailComponent.prototype.getBadgeSets = function () {
        var _this = this;
        this._bsService.getBadgeSets().subscribe(function (badgesets) { _this.badgesets = badgesets; });
    };
    BadgeDetailComponent.prototype.toBadges = function () {
        this._router.navigate(['/badges']);
        this.getBadges();
        // location.reload();
    };
    BadgeDetailComponent.prototype.editBadge = function () {
        this._router.navigate(['/badge/edit', this.id]);
    };
    BadgeDetailComponent.prototype.findBadgeSet = function (bid, l) {
        var bset = [];
        if (this.badgesets != null) {
            for (var i = 0; i < this.badgesets.length; i++) {
                for (var j = 0; j < this.badgesets[i].badgegroups.length; j++) {
                    if (this.badgesets[i].status == 'Accepted' && this.badgesets[i].badgegroups[j].bid == bid && this.badgesets[i].badgegroups[j].level == l) {
                        bset.push(this.badgesets[i]);
                    }
                }
            }
        }
        return bset;
    };
    BadgeDetailComponent.prototype.toBSDetail = function (bsid) {
        this._router.navigate(['bs/detail', bsid]);
    };
    BadgeDetailComponent.prototype.checkCore = function (bs, b) {
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
    BadgeDetailComponent.prototype.updateBadge = function () {
        this.badge.code = this.badge.code.toUpperCase();
        this.badge.owner = this.badge.owner.toUpperCase();
        if (this.badge.focus == null) {
            this.badge.focus = [];
        }
        this.badge.badgelevels.sort(this.toCompare);
        var value = JSON.stringify(this.badge);
        this._badgeService.updateBadge(this.id, value).subscribe();
        console.log('you updated value: ', value);
    };
    BadgeDetailComponent.prototype.addBadge = function () {
        this._router.navigate(['/badge/new']);
    };
    BadgeDetailComponent.prototype.removeBadge = function () {
        this._badgeService.deleteBadge(this.id).subscribe();
        this.toBadges();
    };
    BadgeDetailComponent.prototype.deleteBadgePop = function () {
        var name = this.badge.name;
        var r = confirm("Are you sure you want to delete Badge: " + name.toUpperCase() + " ?");
        if (r == true) {
            this.removeBadge();
        }
    };
    BadgeDetailComponent.prototype.addBadgeLevel = function () {
        this.badge.badgelevels.push({ level: this.newLevel, desc: this.newDesc });
        this.badge.badgelevels.sort(this.toCompare);
        var value = JSON.stringify(this.badge);
        console.log('you submitted value: ', value);
        this.newLevel = 0;
        this.newDesc = "";
    };
    BadgeDetailComponent.prototype.toCompare = function (a, b) {
        if (a.level < b.level)
            return -1;
        else if (a.level > b.level)
            return 1;
        else
            return 0;
    };
    BadgeDetailComponent.prototype.removeBadgeLevel = function (selectedLevel) {
        var index = this.badge.badgelevels.indexOf(selectedLevel);
        this.badge.badgelevels.splice(index, 1);
        var value = JSON.stringify(this.badge);
        console.log('you submitted value: ', value);
    };
    BadgeDetailComponent.prototype.deleteBadgeLevelPop = function (selectedLevel) {
        var name = this.badge.name;
        var level = selectedLevel.level;
        var r = confirm("Are you sure you want to delete " + name.toUpperCase() + " Level " + level + " ?");
        if (r == true) {
            this.removeBadgeLevel(selectedLevel);
        }
    };
    BadgeDetailComponent.prototype.checkAdmin = function () {
        if (this.auth.isAdmin()) {
            this.bedit = true;
        }
    };
    BadgeDetailComponent.prototype.addFC = function (fc) {
        if (this.badge.focus == null) {
            this.badge.focus = [];
        }
        this.badge.focus.push(fc.toUpperCase());
        this.newFC = "";
        this.editFC = true;
    };
    BadgeDetailComponent.prototype.deleteFC = function (fc) {
        var index = this.badge.focus.indexOf(fc);
        this.badge.focus.splice(index, 1);
    };
    BadgeDetailComponent.prototype.checkEmptyFocus = function () {
        if (this.badge.focus != null) {
            if (this.badge.focus.length == 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    };
    BadgeDetailComponent.prototype.cleanEmpty = function (bls) {
        var b = [];
        for (var i = 0; i < this.badge.badgelevels.length; i++) {
            if (this.badge.badgelevels[i].desc != "") {
                b.push(this.badge.badgelevels[i]);
            }
        }
        return b;
    };
    BadgeDetailComponent.prototype.updatePublish = function (event) {
        if (event.target.checked) {
            this.badge.published = true;
        }
        else {
            this.badge.published = false;
        }
        this.updateBadge();
    };
    BadgeDetailComponent.prototype.clickOut = function () {
        console.log("click........");
    };
    BadgeDetailComponent.prototype.goBack = function () {
        window.history.back();
    };
    BadgeDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-badge-detail',
            templateUrl: 'app/components/badge/badge-detail/badge-detail.component.html',
            styleUrls: ['app/components/badge/badge-detail/badge-detail.component.css'],
            pipes: [yes_no_pipe_1.YesNoPipe]
        }), 
        __metadata('design:paramtypes', [badge_service_1.BadgeService, bs_service_1.BSService, router_1.Router, router_1.ActivatedRoute, auth_service_1.AuthService])
    ], BadgeDetailComponent);
    return BadgeDetailComponent;
}());
exports.BadgeDetailComponent = BadgeDetailComponent;
//# sourceMappingURL=badge-detail.component.js.map