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
    var BadgeEditComponent;
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
            BadgeEditComponent = (function () {
                function BadgeEditComponent(_badgeService, _router, _routeParams) {
                    this._badgeService = _badgeService;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.active = false;
                    this.newLevel = 0;
                    this.newDesc = "";
                }
                BadgeEditComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = this._routeParams.get('id');
                    console.log('id from _routeParams: ', id);
                    this._badgeService.getBadge(id).subscribe(function (badge) { _this.badge = badge; });
                };
                BadgeEditComponent.prototype.toBadges = function () {
                    this._router.navigate(['Badges']);
                    // location.reload();
                };
                BadgeEditComponent.prototype.toBadgeDetail = function () {
                    var id = this._routeParams.get('id');
                    this._router.navigate(['BadgeDetail', { id: id }]);
                    // location.reload();
                };
                BadgeEditComponent.prototype.updateBadge = function () {
                    var id = this._routeParams.get('id');
                    var value = JSON.stringify(this.badge);
                    this._badgeService.updateBadge(id, value).subscribe();
                    console.log('you submitted value: ', value);
                    this.toBadgeDetail();
                };
                BadgeEditComponent.prototype.addBadge = function () {
                    this._router.navigate(['BadgeNew']);
                };
                BadgeEditComponent.prototype.removeBadge = function () {
                    var id = this._routeParams.get('id');
                    this._badgeService.deleteBadge(id).subscribe();
                    this.toBadges();
                };
                BadgeEditComponent.prototype.deleteBadgePop = function () {
                    var name = this.badge.name;
                    var r = confirm("Are you sure you want to delete Badge: " + name.toUpperCase() + " ?");
                    if (r == true) {
                        this.removeBadge();
                    }
                };
                BadgeEditComponent.prototype.addBadgeLevel = function () {
                    this.badge.badgelevels.push({ level: this.newLevel, desc: this.newDesc });
                    this.badge.badgelevels.sort(this.toCompare);
                    var id = this._routeParams.get('id');
                    var value = JSON.stringify(this.badge);
                    // this._badgeService.updateBadge(id,value).subscribe();
                    console.log('you submitted value: ', value);
                    this.newLevel = 0;
                    this.newDesc = "";
                };
                BadgeEditComponent.prototype.toCompare = function (a, b) {
                    if (a.level < b.level)
                        return -1;
                    else if (a.level > b.level)
                        return 1;
                    else
                        return 0;
                };
                BadgeEditComponent.prototype.removeBadgeLevel = function (selectedLevel) {
                    var index = this.badge.badgelevels.indexOf(selectedLevel);
                    this.badge.badgelevels.splice(index, 1);
                    var id = this._routeParams.get('id');
                    var value = JSON.stringify(this.badge);
                    // this._badgeService.updateBadge(id,value).subscribe();
                    console.log('you submitted value: ', value);
                };
                BadgeEditComponent.prototype.deleteBadgeLevelPop = function (selectedLevel) {
                    var name = this.badge.name;
                    var level = selectedLevel.level;
                    var r = confirm("Are you sure you want to delete " + name.toUpperCase() + " Level " + level + " ?");
                    if (r == true) {
                        this.removeBadgeLevel(selectedLevel);
                    }
                };
                BadgeEditComponent.prototype.addTag = function (tag) {
                    this.badge.tags.push(tag.toUpperCase());
                };
                BadgeEditComponent.prototype.deleteTag = function (tag) {
                    var index = this.badge.tags.indexOf(tag);
                    this.badge.tags.splice(index, 1);
                };
                BadgeEditComponent.prototype.goBack = function () {
                    window.history.back();
                };
                BadgeEditComponent = __decorate([
                    core_1.Component({
                        selector: 'my-badge-edit',
                        templateUrl: 'app/components/badge/badge-edit/badge-edit.component.html',
                        styleUrls: ['app/components/badge/badge-edit/badge-edit.component.css']
                    }), 
                    __metadata('design:paramtypes', [badge_service_1.BadgeService, router_2.Router, router_1.RouteParams])
                ], BadgeEditComponent);
                return BadgeEditComponent;
            }());
            exports_1("BadgeEditComponent", BadgeEditComponent);
        }
    }
});
//# sourceMappingURL=badge-edit.component.js.map