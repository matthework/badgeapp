System.register(['angular2/core', 'angular2/router', './tier-edit/tier-edit.component', './tier.service', '../pipe/filter-array-pipe', '../badgeset/bs.service'], function(exports_1, context_1) {
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
    var core_1, router_1, tier_edit_component_1, tier_service_1, filter_array_pipe_1, bs_service_1;
    var TierComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (tier_edit_component_1_1) {
                tier_edit_component_1 = tier_edit_component_1_1;
            },
            function (tier_service_1_1) {
                tier_service_1 = tier_service_1_1;
            },
            function (filter_array_pipe_1_1) {
                filter_array_pipe_1 = filter_array_pipe_1_1;
            },
            function (bs_service_1_1) {
                bs_service_1 = bs_service_1_1;
            }],
        execute: function() {
            TierComponent = (function () {
                function TierComponent(_tierService, _bsService, _router) {
                    this._tierService = _tierService;
                    this._bsService = _bsService;
                    this._router = _router;
                    this.tiers = [];
                    this.active = false;
                    this.badgesets = [];
                    this.toPay = false;
                    this.gmap = { 0: "A", 1: "B", 2: "C", 3: "D", 4: "E", 5: "F" };
                }
                TierComponent.prototype.ngOnInit = function () {
                    this.getTiers();
                    this.getBadgeSets();
                };
                TierComponent.prototype.getTiers = function () {
                    var _this = this;
                    this._tierService.getTiers().subscribe(function (tiers) { _this.tiers = tiers; });
                };
                TierComponent.prototype.getBadgeSets = function () {
                    var _this = this;
                    this._bsService.getBadgeSets().subscribe(function (badgesets) { _this.badgesets = badgesets; });
                };
                TierComponent.prototype.onSelect = function (tier) {
                    this.selectedTier = tier;
                };
                TierComponent.prototype.toTierDetail = function (tid) {
                    this._router.navigate(['TierDetail', { id: tid }]);
                };
                TierComponent.prototype.toTierEdit = function (tid) {
                    this._router.navigate(['TierEdit', { id: tid }]);
                };
                TierComponent.prototype.addTier = function () {
                    this._router.navigate(['TierNew']);
                };
                TierComponent.prototype.removeTier = function (id) {
                    this._tierService.deleteTier(id).subscribe();
                    location.reload();
                };
                TierComponent.prototype.deleteTierPop = function (id) {
                    var r = confirm("Are you sure you want to delete this Tier ?");
                    if (r == true) {
                        this.removeTier(id);
                    }
                };
                TierComponent.prototype.getTierGradeBS = function (t, g) {
                    var bset = [];
                    if (this.badgesets != null) {
                        for (var i = 0; i < this.badgesets.length; i++) {
                            if (this.badgesets[i].tier == t && this.badgesets[i].grade == g) {
                                bset.push(this.badgesets[i]);
                            }
                        }
                    }
                    // console.log('you submitted value: ', bset); 
                    return bset;
                };
                TierComponent.prototype.toBSDetail = function (bsid) {
                    this._router.navigate(['BSDetail', { id: bsid }]);
                };
                TierComponent.prototype.toTiers = function () {
                    this._router.navigate(['Tiers']);
                    location.reload();
                };
                TierComponent = __decorate([
                    core_1.Component({
                        selector: 'my-tier',
                        templateUrl: 'app/components/tier/tier.component.html',
                        styleUrls: ['app/components/tier/tier.component.css'],
                        directives: [tier_edit_component_1.TierEditComponent],
                        pipes: [filter_array_pipe_1.FilterArrayPipe]
                    }), 
                    __metadata('design:paramtypes', [tier_service_1.TierService, bs_service_1.BSService, router_1.Router])
                ], TierComponent);
                return TierComponent;
            }());
            exports_1("TierComponent", TierComponent);
        }
    }
});
//# sourceMappingURL=tier.component.js.map