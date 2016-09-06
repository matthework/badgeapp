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
var badge_detail_component_1 = require('./badge-detail/badge-detail.component');
var badge_edit_component_1 = require('./badge-edit/badge-edit.component');
var badge_service_1 = require('./badge.service');
var bs_service_1 = require('../badgeset/bs.service');
var auth_service_1 = require('../auth/auth.service');
var filter_array_pipe_1 = require('../pipe/filter-array-pipe');
var yes_no_pipe_1 = require('../pipe/yes-no-pipe');
var BadgeComponent = (function () {
    function BadgeComponent(_router, _badgeService, _bsService, auth) {
        this._router = _router;
        this._badgeService = _badgeService;
        this._bsService = _bsService;
        this.auth = auth;
        this.badges = [];
        this.badgesets = [];
        this.active = true;
        this.showBadges = false;
        this.showBCat = false;
    }
    BadgeComponent.prototype.ngOnInit = function () {
        this.getBadges();
        this.getBadgeSets();
    };
    BadgeComponent.prototype.getBadges = function () {
        var _this = this;
        this._badgeService.getBadges().subscribe(function (badges) { _this.badges = badges; });
    };
    BadgeComponent.prototype.getBadgeSets = function () {
        var _this = this;
        this._bsService.getBadgeSets().subscribe(function (badgesets) { _this.badgesets = badgesets; });
        if (this.badgesets == null) {
            this.active = true;
        }
    };
    BadgeComponent.prototype.onSelect = function (badge) {
        this.selectedBadge = badge;
    };
    BadgeComponent.prototype.toDetail = function () {
        this._router.navigate(['/badge/detail', this.selectedBadge._id]);
    };
    BadgeComponent.prototype.toEdit = function (bid) {
        this._router.navigate(['/badge/edit', bid]);
    };
    BadgeComponent.prototype.addBadge = function () {
        this._router.navigate(['/badge/new']);
    };
    BadgeComponent.prototype.removeBadge = function (id) {
        // let id = this.selectedBadge._id;
        this._badgeService.deleteBadge(id).subscribe();
        this.removeBadgeFromBS(id);
        location.reload();
    };
    BadgeComponent.prototype.deleteBadgePop = function (id) {
        var r = confirm("Are you sure you want to delete this Badge ?");
        if (r == true) {
            this.removeBadge(id);
        }
    };
    BadgeComponent.prototype.toBadges = function () {
        this._router.navigate(['/badges']);
        location.reload();
    };
    BadgeComponent.prototype.showBadgeCat = function () {
        this.showBCat = true;
        this._router.navigate(['/badgecat']);
    };
    BadgeComponent.prototype.removeBadgeFromBS = function (bid) {
        if (this.badgesets != null) {
            for (var i = 0; i < this.badgesets.length; i++) {
                for (var j = 0; j < this.badgesets[i].badgegroups.length; j++) {
                    if (this.badgesets[i].badgegroups[j].bid == bid) {
                        var index = this.badgesets[i].badgegroups.indexOf(this.badgesets[i].badgegroups[j]);
                        this.badgesets[i].badgegroups.splice(index, 1);
                    }
                }
                var value = JSON.stringify(this.badgesets[i]);
                this._bsService.updateBadgeSet(this.badgesets[i]._id, value).subscribe();
                console.log('you submitted value: ', value);
            }
        }
    };
    BadgeComponent = __decorate([
        core_1.Component({
            selector: 'my-badge',
            templateUrl: 'app/components/badge/badge.component.html',
            styleUrls: ['app/components/badge/badge.component.css'],
            directives: [badge_detail_component_1.BadgeDetailComponent, badge_edit_component_1.BadgeEditComponent],
            pipes: [filter_array_pipe_1.FilterArrayPipe, yes_no_pipe_1.YesNoPipe]
        }), 
        __metadata('design:paramtypes', [router_1.Router, badge_service_1.BadgeService, bs_service_1.BSService, auth_service_1.AuthService])
    ], BadgeComponent);
    return BadgeComponent;
}());
exports.BadgeComponent = BadgeComponent;
//# sourceMappingURL=badge.component.js.map