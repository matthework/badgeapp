System.register(['angular2/core', 'angular2/router', '../bs.service', '../../badge/badge.service', '../../tier/tier.service', '../../pipe/yes-no-pipe'], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, bs_service_1, badge_service_1, tier_service_1, yes_no_pipe_1;
    var BSDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (bs_service_1_1) {
                bs_service_1 = bs_service_1_1;
            },
            function (badge_service_1_1) {
                badge_service_1 = badge_service_1_1;
            },
            function (tier_service_1_1) {
                tier_service_1 = tier_service_1_1;
            },
            function (yes_no_pipe_1_1) {
                yes_no_pipe_1 = yes_no_pipe_1_1;
            }],
        execute: function() {
            BSDetailComponent = (function () {
                function BSDetailComponent(_bsService, _badgeService, _tierService, _router, _routeParams) {
                    this._bsService = _bsService;
                    this._badgeService = _badgeService;
                    this._tierService = _tierService;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.badges = [];
                    this.tiers = [];
                    this.active = false;
                    this.newBadge = "";
                    this.newLevel = 0;
                    this.gmap = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5 };
                    this.gradesOptions = ["A", "B", "C", "D", "E", "F"];
                }
                BSDetailComponent.prototype.ngOnInit = function () {
                    this.getBadgeSet();
                    this.getBadges();
                    this.getTiers();
                };
                BSDetailComponent.prototype.getBadgeSet = function () {
                    var _this = this;
                    var id = this._routeParams.get('id');
                    console.log('id from _routeParams: ', id);
                    this._bsService.getBadgeSet(id).subscribe(function (badgeset) { _this.badgeset = badgeset; });
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
                    this._router.navigate(['BadgeSet']);
                    // location.reload();
                };
                BSDetailComponent.prototype.toBSEdit = function (bsid) {
                    this._router.navigate(['BSEdit', { id: bsid }]);
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
                BSDetailComponent.prototype.getDesc = function (b, l) {
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
                BSDetailComponent.prototype.getBadgesOptions = function () {
                    var badgesOptions = [];
                    if (this.badges != null) {
                        for (var i = 0; i < this.badges.length; i++) {
                            badgesOptions.push(this.badges[i].name);
                        }
                    }
                    // console.log('getBadgesOptions: ', badgesOptions);
                    return badgesOptions.sort();
                };
                BSDetailComponent.prototype.getLevelsOptions = function (bname) {
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
                BSDetailComponent.prototype.toBadgeDetail = function (bname) {
                    var bid = "";
                    if (this.badges != null) {
                        for (var i = 0; i < this.badges.length; i++) {
                            if (this.badges[i].name == bname) {
                                bid = this.badges[i]._id;
                            }
                        }
                    }
                    this._router.navigate(['BadgeDetail', { id: bid }]);
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
                    __metadata('design:paramtypes', [bs_service_1.BSService, badge_service_1.BadgeService, tier_service_1.TierService, router_2.Router, router_1.RouteParams])
                ], BSDetailComponent);
                return BSDetailComponent;
            }());
            exports_1("BSDetailComponent", BSDetailComponent);
        }
    }
});
//# sourceMappingURL=bs-detail.component.js.map