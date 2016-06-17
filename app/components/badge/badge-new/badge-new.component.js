System.register(['angular2/core', 'angular2/router', '../badge.service'], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, badge_service_1;
    var BadgeNewComponent;
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
            }],
        execute: function() {
            BadgeNewComponent = (function () {
                function BadgeNewComponent(_badgeService, _router, _routeParams) {
                    this._badgeService = _badgeService;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    // title: string = "Add New Badge";
                    this.newbls = [
                        { level: 1, desc: "" },
                        { level: 2, desc: "" },
                        { level: 3, desc: "" },
                        { level: 4, desc: "" },
                        { level: 5, desc: "" },
                        { level: 6, desc: "" },
                        { level: 7, desc: "" },
                        { level: 8, desc: "" },
                        { level: 9, desc: "" }];
                    this.newBadge = { index: 0, name: "", overview: "", badgelevels: this.newbls, approved: false, inused: false };
                }
                BadgeNewComponent.prototype.addBadge = function () {
                    // this.newBadge.badgelevels = this.newBadge.badgelevels.filter(this.checkEmpty);
                    var value = JSON.stringify(this.newBadge);
                    this._badgeService.addBadge(value).subscribe();
                    console.log('you submitted value: ', value);
                    this.toBadges();
                };
                // checkEmpty(item) {
                //   if (item.desc != "") {
                //     return item;
                //   }
                // }
                BadgeNewComponent.prototype.toBadges = function () {
                    this._router.navigate(['Badges']);
                    // location.reload();
                };
                BadgeNewComponent.prototype.goBack = function () {
                    window.history.back();
                };
                BadgeNewComponent = __decorate([
                    core_1.Component({
                        selector: 'my-badge-new',
                        templateUrl: 'app/components/badge/badge-new/badge-new.component.html',
                        styleUrls: ['app/components/badge/badge-new/badge-new.component.css']
                    }), 
                    __metadata('design:paramtypes', [badge_service_1.BadgeService, router_2.Router, router_1.RouteParams])
                ], BadgeNewComponent);
                return BadgeNewComponent;
            }());
            exports_1("BadgeNewComponent", BadgeNewComponent);
        }
    }
});
//# sourceMappingURL=badge-new.component.js.map