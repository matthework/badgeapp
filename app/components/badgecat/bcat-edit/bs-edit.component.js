System.register(['angular2/core', 'angular2/router', '../bs.service', '../../badge/badge.service', '../../tier/tier.service'], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, bs_service_1, badge_service_1, tier_service_1;
    var BSEditComponent;
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
            }],
        execute: function() {
            BSEditComponent = (function () {
                function BSEditComponent(_bsService, _badgeService, _tierService, _router, _routeParams) {
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
                    this.prerequisite = false;
                    this.total = 0;
                }
                BSEditComponent.prototype.ngOnInit = function () {
                    this.getBadgeSet();
                    this.getBadges();
                    this.getTiers();
                };
                BSEditComponent.prototype.getBadgeSet = function () {
                    var _this = this;
                    var id = this._routeParams.get('id');
                    console.log('id from _routeParams: ', id);
                    this._bsService.getBadgeSet(id).subscribe(function (badgeset) { _this.badgeset = badgeset; });
                };
                BSEditComponent.prototype.getBadges = function () {
                    var _this = this;
                    this._badgeService.getBadges().subscribe(function (badges) { _this.badges = badges; });
                };
                BSEditComponent.prototype.getTiers = function () {
                    var _this = this;
                    this._tierService.getTiers().subscribe(function (tiers) { _this.tiers = tiers; });
                };
                BSEditComponent.prototype.toBadgeSets = function () {
                    this._router.navigate(['BadgeSet']);
                    // location.reload();
                };
                BSEditComponent.prototype.updateBadgeSet = function () {
                    this.total = 0;
                    // pasrse string into number
                    this.badgeset.tier = +this.badgeset.tier;
                    for (var i = 0; i < this.badgeset.badgegroups.length; i++) {
                        this.badgeset.badgegroups[i].level = +this.badgeset.badgegroups[i].level;
                        if (this.badgeset.badgegroups[i].badge != "" && this.badgeset.badgegroups[i].level != 0) {
                            this.total += 1;
                        }
                    }
                    this.badgeset.pay = +this.getPay(this.badgeset.tier, this.badgeset.grade);
                    this.badgeset.numbadges = Math.round(this.total / 2);
                    console.log('you submitted total: ', this.total);
                    this.badgeset.badgegroups.sort(this.toCompare);
                    this.badgeset.corebadges.sort(this.toCompare);
                    var id = this._routeParams.get('id');
                    var value = JSON.stringify(this.badgeset);
                    this._bsService.updateBadgeSet(id, value).subscribe();
                    console.log('you submitted value: ', value);
                    this.toBadgeSets();
                };
                BSEditComponent.prototype.toCompare = function (a, b) {
                    if (a.badge < b.badge)
                        return -1;
                    else if (a.badge > b.badge)
                        return 1;
                    else
                        return 0;
                };
                BSEditComponent.prototype.addBadgeSet = function () {
                    this._router.navigate(['BSNew']);
                };
                BSEditComponent.prototype.addBadgeGroup = function () {
                    // pasrse string into number
                    // this.badgeset.tier = +this.badgeset.tier;
                    // for (var i = 0; i < this.badgeset.badgegroups.length; i++) { 
                    //   this.badgeset.badgegroups[i].level = +this.badgeset.badgegroups[i].level;
                    // }
                    this.newLevel = +this.newLevel;
                    this.badgeset.badgegroups.push({ badge: this.newBadge, level: this.newLevel });
                    // this.badgeset.badgegroups.sort(this.toCompare);
                    // this.badgeset.corebadges.sort(this.toCompare);
                    var id = this._routeParams.get('id');
                    var value = JSON.stringify(this.badgeset);
                    // this._bsService.updateBadgeSet(id,value).subscribe();
                    console.log('you submitted value: ', value);
                    this.newBadge = "";
                    this.newLevel = 0;
                };
                BSEditComponent.prototype.removeBadgeSet = function () {
                    var id = this._routeParams.get('id');
                    this._bsService.deleteBadgeSet(id).subscribe();
                    this.toBadgeSets();
                };
                BSEditComponent.prototype.deleteBadgeSetPop = function () {
                    var name = this.badgeset.name;
                    var r = confirm("Are you sure you want to delete BadgeSet: " + name.toUpperCase() + " ?");
                    if (r == true) {
                        this.removeBadgeSet();
                    }
                };
                BSEditComponent.prototype.deleteBadgeGroupPop = function (selectedGroup) {
                    var isCore = false;
                    for (var i = 0; i < this.badgeset.corebadges.length; i++) {
                        if (this.badgeset.corebadges[i].badge == selectedGroup.badge) {
                            isCore = true;
                        }
                    }
                    if (isCore) {
                        var s = confirm("WARNING: PLEASE REMOVE THIS BADGE FROM COREBADGE BEFORE DELETE IT!");
                    }
                    else {
                        var name = this.badgeset.name.toUpperCase();
                        var badge = selectedGroup.badge.toUpperCase();
                        var r = confirm("Are you sure you want to delete " + badge + " from " + name + " ?");
                        if (r == true) {
                            this.removeBadgeGroup(selectedGroup);
                        }
                    }
                };
                BSEditComponent.prototype.removeBadgeGroup = function (selectedGroup) {
                    var index = this.badgeset.badgegroups.indexOf(selectedGroup);
                    this.badgeset.badgegroups.splice(index, 1);
                    var id = this._routeParams.get('id');
                    var value = JSON.stringify(this.badgeset);
                    // this._bsService.updateBadgeSet(id,value).subscribe();
                    console.log('you submitted value: ', value);
                };
                BSEditComponent.prototype.getPay = function (t, g) {
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
                BSEditComponent.prototype.getDesc = function (b, l) {
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
                BSEditComponent.prototype.getBadgesOptions = function () {
                    var badgesOptions = [];
                    if (this.badges != null) {
                        for (var i = 0; i < this.badges.length; i++) {
                            badgesOptions.push(this.badges[i].name);
                        }
                    }
                    // console.log('getBadgesOptions: ', badgesOptions);
                    return badgesOptions.sort();
                };
                BSEditComponent.prototype.getLevelsOptions = function (bname) {
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
                BSEditComponent.prototype.getTiersOptions = function () {
                    var tiersOptions = [];
                    if (this.tiers != null) {
                        for (var i = 0; i < this.tiers.length; i++) {
                            tiersOptions.push(this.tiers[i].tier);
                        }
                    }
                    tiersOptions.push(0);
                    // console.log('getTiersOptions: ', tiersOptions);
                    return tiersOptions.sort();
                };
                BSEditComponent.prototype.updateNumBadges = function (num) {
                    this.badgeset.numbadges = Math.round(num / 2);
                };
                BSEditComponent.prototype.getCoreBadgesOptions = function (bgs) {
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
                BSEditComponent.prototype.deleteCoreBadgePop = function (corebadge) {
                    var name = this.badgeset.name.toUpperCase();
                    var cbadge = (corebadge.badge + " " + corebadge.level).toUpperCase();
                    var r = confirm("Are you sure you want to delete CORE BADGE " + cbadge + " from " + name + " ?");
                    if (r == true) {
                        this.removeCoreBadge(corebadge);
                    }
                };
                BSEditComponent.prototype.removeCoreBadge = function (selectedCoreBadge) {
                    var index = this.badgeset.corebadges.indexOf(selectedCoreBadge);
                    this.badgeset.corebadges.splice(index, 1);
                    // let id = this._routeParams.get('id');
                    // let value = JSON.stringify(this.badgeset)
                    // this._bsService.updateBadgeSet(id,value).subscribe();
                    // console.log('you submitted value: ', value);
                };
                BSEditComponent.prototype.addCoreBadge = function (cb) {
                    var array = cb.toString().split(' - ');
                    console.log('you submitted cb value: ', array);
                    var b = array[0];
                    var l = +array[1]; // parse into number
                    this.badgeset.corebadges.push({ badge: b, level: l });
                };
                BSEditComponent.prototype.addTag = function (tag) {
                    this.badgeset.tags.push(tag.toUpperCase());
                };
                BSEditComponent.prototype.deleteTag = function (tag) {
                    var index = this.badgeset.tags.indexOf(tag);
                    this.badgeset.tags.splice(index, 1);
                };
                BSEditComponent.prototype.goBack = function () {
                    window.history.back();
                };
                BSEditComponent = __decorate([
                    core_1.Component({
                        selector: 'my-badgeset-edit',
                        templateUrl: 'app/components/badgeset/bs-edit/bs-edit.component.html',
                        styleUrls: ['app/components/badgeset/bs-edit/bs-edit.component.css']
                    }), 
                    __metadata('design:paramtypes', [bs_service_1.BSService, badge_service_1.BadgeService, tier_service_1.TierService, router_2.Router, router_1.RouteParams])
                ], BSEditComponent);
                return BSEditComponent;
            }());
            exports_1("BSEditComponent", BSEditComponent);
        }
    }
});
//# sourceMappingURL=bs-edit.component.js.map