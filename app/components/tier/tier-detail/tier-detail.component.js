System.register(['angular2/core', 'angular2/router', '../tier.service', '../../badgeset/bs.service'], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, tier_service_1, bs_service_1;
    var TierDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (tier_service_1_1) {
                tier_service_1 = tier_service_1_1;
            },
            function (bs_service_1_1) {
                bs_service_1 = bs_service_1_1;
            }],
        execute: function() {
            TierDetailComponent = (function () {
                function TierDetailComponent(_tierService, _bsService, _router, _routeParams) {
                    this._tierService = _tierService;
                    this._bsService = _bsService;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.badgesets = [];
                    this.gradesIndex = [0, 1, 2, 3, 4, 5];
                    this.gmap = { 0: "A", 1: "B", 2: "C", 3: "D", 4: "E", 5: "F" };
                }
                TierDetailComponent.prototype.ngOnInit = function () {
                    this.getTier();
                    this.getBadgeSets();
                };
                TierDetailComponent.prototype.getTier = function () {
                    var _this = this;
                    var id = this._routeParams.get('id');
                    console.log('id from _routeParams: ', id);
                    this._tierService.getTier(id).subscribe(function (tier) { _this.tier = tier; });
                };
                TierDetailComponent.prototype.getBadgeSets = function () {
                    var _this = this;
                    this._bsService.getBadgeSets().subscribe(function (badgesets) { _this.badgesets = badgesets; });
                };
                TierDetailComponent.prototype.toTiers = function () {
                    this._router.navigate(['Tiers']);
                    // location.reload();
                };
                TierDetailComponent.prototype.toTierEdit = function (tid) {
                    this._router.navigate(['TierEdit', { id: tid }]);
                };
                TierDetailComponent.prototype.getTierBS = function (t) {
                    var bset = [];
                    for (var i = 0; i < this.badgesets.length; i++) {
                        if (this.badgesets[i].tier == t) {
                            bset.push(this.badgesets[i]);
                        }
                    }
                    return bset;
                };
                TierDetailComponent.prototype.getTierGradeBS = function (t, g) {
                    var bset = [];
                    for (var i = 0; i < this.badgesets.length; i++) {
                        if (this.badgesets[i].tier == t && this.badgesets[i].grade == g) {
                            bset.push(this.badgesets[i]);
                        }
                    }
                    return bset;
                };
                TierDetailComponent.prototype.toBSDetail = function (bsid) {
                    this._router.navigate(['BSDetail', { id: bsid }]);
                };
                TierDetailComponent.prototype.goBack = function () {
                    window.history.back();
                };
                TierDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'my-tier-detail',
                        templateUrl: 'app/components/tier/tier-detail/tier-detail.component.html',
                        styleUrls: ['app/components/tier/tier-detail/tier-detail.component.css']
                    }), 
                    __metadata('design:paramtypes', [tier_service_1.TierService, bs_service_1.BSService, router_2.Router, router_1.RouteParams])
                ], TierDetailComponent);
                return TierDetailComponent;
            }());
            exports_1("TierDetailComponent", TierDetailComponent);
        }
    }
});
//# sourceMappingURL=tier-detail.component.js.map