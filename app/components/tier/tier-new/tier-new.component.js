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
    var TierNewComponent;
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
            TierNewComponent = (function () {
                function TierNewComponent(_tierService, _router, _routeParams) {
                    this._tierService = _tierService;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.newGrades = [0, 0, 0, 0, 0, 0];
                    this.newTier = { index: 0, tier: 0, grades: this.newGrades, judgement: "", expertise: "" };
                }
                TierNewComponent.prototype.addTier = function () {
                    // this.newTier.grades = this.newTier.grades.filter(this.checkEmpty);
                    var value = JSON.stringify(this.newTier);
                    this._tierService.addTier(value).subscribe();
                    console.log('you submitted value: ', value);
                    this.toTiers();
                };
                TierNewComponent.prototype.toTiers = function () {
                    this._router.navigate(['Tiers']);
                    // location.reload();
                };
                TierNewComponent.prototype.goBack = function () {
                    window.history.back();
                };
                TierNewComponent = __decorate([
                    core_1.Component({
                        selector: 'my-tier-new',
                        templateUrl: 'app/components/tier/tier-new/tier-new.component.html',
                        styleUrls: ['app/components/tier/tier-new/tier-new.component.css']
                    }), 
                    __metadata('design:paramtypes', [tier_service_1.TierService, router_2.Router, router_1.RouteParams])
                ], TierNewComponent);
                return TierNewComponent;
            }());
            exports_1("TierNewComponent", TierNewComponent);
        }
    }
});
//# sourceMappingURL=tier-new.component.js.map