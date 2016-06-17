System.register(['angular2/core', 'angular2/router', '../tier.service'], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, tier_service_1;
    var TierEditComponent;
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
            }],
        execute: function() {
            TierEditComponent = (function () {
                function TierEditComponent(_tierService, _router, _routeParams) {
                    this._tierService = _tierService;
                    this._router = _router;
                    this._routeParams = _routeParams;
                }
                TierEditComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = this._routeParams.get('id');
                    console.log('id from _routeParams: ', id);
                    this._tierService.getTier(id).subscribe(function (tier) { _this.tier = tier; });
                };
                TierEditComponent.prototype.toTiers = function () {
                    this._router.navigate(['Tiers']);
                    // location.reload();
                };
                TierEditComponent.prototype.updateTier = function () {
                    var id = this._routeParams.get('id');
                    var value = JSON.stringify(this.tier);
                    this._tierService.updateTier(id, value).subscribe();
                    console.log('you submitted value: ', value);
                    this.toTiers();
                };
                TierEditComponent.prototype.addTier = function () {
                    this._router.navigate(['TierNew']);
                };
                TierEditComponent.prototype.removeTier = function () {
                    var id = this._routeParams.get('id');
                    this._tierService.deleteTier(id).subscribe();
                    this.toTiers();
                };
                TierEditComponent.prototype.deleteTierPop = function () {
                    var tier = this.tier.tier;
                    var r = confirm("Are you sure you want to delete Tier: " + tier + " ?");
                    if (r == true) {
                        this.removeTier();
                    }
                };
                TierEditComponent.prototype.goBack = function () {
                    window.history.back();
                };
                TierEditComponent = __decorate([
                    core_1.Component({
                        selector: 'my-tier-edit',
                        templateUrl: 'app/components/tier/tier-edit/tier-edit.component.html',
                        styleUrls: ['app/components/tier/tier-edit/tier-edit.component.css']
                    }), 
                    __metadata('design:paramtypes', [tier_service_1.TierService, router_2.Router, router_1.RouteParams])
                ], TierEditComponent);
                return TierEditComponent;
            }());
            exports_1("TierEditComponent", TierEditComponent);
        }
    }
});
//# sourceMappingURL=tier-edit.component.js.map