System.register(['angular2/core', 'angular2/router', '../badge.service', '../../pipe/yes-no-pipe', '../../badgeset/bs.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, router_2, badge_service_1, yes_no_pipe_1, bs_service_1;
    var BadgeDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (badge_service_1_1) {
                badge_service_1 = badge_service_1_1;
            },
            function (yes_no_pipe_1_1) {
                yes_no_pipe_1 = yes_no_pipe_1_1;
            },
            function (bs_service_1_1) {
                bs_service_1 = bs_service_1_1;
            }],
        execute: function() {
            BadgeDetailComponent = (function () {
                function BadgeDetailComponent(_badgeService, _bsService, _router, _routeParams) {
                    this._badgeService = _badgeService;
                    this._bsService = _bsService;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.title = "Badge";
                    this.badgesets = [];
                }
                BadgeDetailComponent.prototype.ngOnInit = function () {
                    this.getBadge();
                    this.getBadgeSets();
                };
                BadgeDetailComponent.prototype.getBadge = function () {
                    var _this = this;
                    var id = this._routeParams.get('id');
                    console.log('id from _routeParams: ', id);
                    this._badgeService.getBadge(id).subscribe(function (badge) { _this.badge = badge; });
                };
                BadgeDetailComponent.prototype.getBadgeSets = function () {
                    var _this = this;
                    this._bsService.getBadgeSets().subscribe(function (badgesets) { _this.badgesets = badgesets; });
                };
                BadgeDetailComponent.prototype.toBadges = function () {
                    this._router.navigate(['Badges']);
                    // location.reload();
                };
                BadgeDetailComponent.prototype.editBadge = function () {
                    this._router.navigate(['BadgeEdit', { id: this._routeParams.get('id') }]);
                };
                BadgeDetailComponent.prototype.findBadgeSet = function (bname, l) {
                    var bset = [];
                    if (this.badgesets != null) {
                        for (var i = 0; i < this.badgesets.length; i++) {
                            for (var j = 0; j < this.badgesets[i].badgegroups.length; j++) {
                                if (this.badgesets[i].badgegroups[j].badge == bname && this.badgesets[i].badgegroups[j].level == l) {
                                    bset.push(this.badgesets[i]);
                                }
                            }
                        }
                    }
                    return bset;
                };
                BadgeDetailComponent.prototype.toBSDetail = function (bsid) {
                    this._router.navigate(['BSDetail', { id: bsid }]);
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
                    __metadata('design:paramtypes', [badge_service_1.BadgeService, bs_service_1.BSService, router_2.Router, router_1.RouteParams])
                ], BadgeDetailComponent);
                return BadgeDetailComponent;
            }());
            exports_1("BadgeDetailComponent", BadgeDetailComponent);
        }
    }
});
//# sourceMappingURL=badge-detail.component.js.map