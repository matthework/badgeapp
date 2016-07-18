System.register(['angular2/core', 'angular2/router', './badge-detail/badge-detail.component', './badge-edit/badge-edit.component', './badge.service', '../pipe/filter-array-pipe', '../pipe/yes-no-pipe'], function(exports_1, context_1) {
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
    var core_1, router_1, badge_detail_component_1, badge_edit_component_1, badge_service_1, filter_array_pipe_1, yes_no_pipe_1;
    var BadgeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (badge_detail_component_1_1) {
                badge_detail_component_1 = badge_detail_component_1_1;
            },
            function (badge_edit_component_1_1) {
                badge_edit_component_1 = badge_edit_component_1_1;
            },
            function (badge_service_1_1) {
                badge_service_1 = badge_service_1_1;
            },
            function (filter_array_pipe_1_1) {
                filter_array_pipe_1 = filter_array_pipe_1_1;
            },
            function (yes_no_pipe_1_1) {
                yes_no_pipe_1 = yes_no_pipe_1_1;
            }],
        execute: function() {
            BadgeComponent = (function () {
                // private _ws: $WebSocket;
                function BadgeComponent(_router, _badgeService) {
                    this._router = _router;
                    this._badgeService = _badgeService;
                    // title: string = "Badges";
                    this.badges = [];
                    this.active = false;
                    this.showBadges = false;
                    this.showBCat = false;
                }
                //     this._ws = new $WebSocket("ws://localhost:8080/");
                //     let cb = function(message: any) {
                //         if (message.data.length > 0) {
                //             alert(message.data);
                //         }
                //     }
                //     this._ws.onMessage(cb, null);
                // }
                // sendMessage(message: string) {
                //     if (message.length > 0) {
                //         this._ws.send(message);
                //     }
                // }
                BadgeComponent.prototype.ngOnInit = function () {
                    this.getBadges();
                };
                BadgeComponent.prototype.getBadges = function () {
                    var _this = this;
                    this._badgeService.getBadges().subscribe(function (badges) { _this.badges = badges; });
                };
                BadgeComponent.prototype.onSelect = function (badge) {
                    this.selectedBadge = badge;
                };
                BadgeComponent.prototype.toDetail = function () {
                    this._router.navigate(['BadgeDetail', { id: this.selectedBadge._id }]);
                };
                BadgeComponent.prototype.toEdit = function (bid) {
                    this._router.navigate(['BadgeEdit', { id: bid }]);
                };
                BadgeComponent.prototype.addBadge = function () {
                    this._router.navigate(['BadgeNew']);
                };
                BadgeComponent.prototype.removeBadge = function (id) {
                    // let id = this.selectedBadge._id;
                    this._badgeService.deleteBadge(id).subscribe();
                    location.reload();
                };
                BadgeComponent.prototype.deleteBadgePop = function (id) {
                    var r = confirm("Are you sure you want to delete this Badge ?");
                    if (r == true) {
                        this.removeBadge(id);
                    }
                };
                BadgeComponent.prototype.toBadges = function () {
                    this._router.navigate(['Badges']);
                    location.reload();
                };
                BadgeComponent.prototype.showBadgeCat = function () {
                    this.showBCat = true;
                };
                BadgeComponent = __decorate([
                    core_1.Component({
                        selector: 'my-badge',
                        templateUrl: 'app/components/badge/badge.component.html',
                        styleUrls: ['app/components/badge/badge.component.css'],
                        directives: [badge_detail_component_1.BadgeDetailComponent, badge_edit_component_1.BadgeEditComponent],
                        pipes: [filter_array_pipe_1.FilterArrayPipe, yes_no_pipe_1.YesNoPipe]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, badge_service_1.BadgeService])
                ], BadgeComponent);
                return BadgeComponent;
            }());
            exports_1("BadgeComponent", BadgeComponent);
        }
    }
});
//# sourceMappingURL=badge.component.js.map