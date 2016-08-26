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
        this.title = "Badge";
        this.badgesets = [];
    }
    BadgeDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.getBadge();
        this.getBadgeSets();
    };
    BadgeDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    BadgeDetailComponent.prototype.getBadge = function () {
        var _this = this;
        console.log('id from _routeParams: ', this.id);
        this._badgeService.getBadge(this.id).subscribe(function (badge) { _this.badge = badge; });
    };
    BadgeDetailComponent.prototype.getBadgeSets = function () {
        var _this = this;
        this._bsService.getBadgeSets().subscribe(function (badgesets) { _this.badgesets = badgesets; });
    };
    BadgeDetailComponent.prototype.toBadges = function () {
        this._router.navigate(['/badges']);
        location.reload();
    };
    BadgeDetailComponent.prototype.editBadge = function () {
        this._router.navigate(['/badge/edit', this.id]);
    };
    BadgeDetailComponent.prototype.findBadgeSet = function (bname, l) {
        var bset = [];
        if (this.badgesets != null) {
            for (var i = 0; i < this.badgesets.length; i++) {
                for (var j = 0; j < this.badgesets[i].badgegroups.length; j++) {
                    if (this.badgesets[i].inused && this.badgesets[i].badgegroups[j].badge == bname && this.badgesets[i].badgegroups[j].level == l) {
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