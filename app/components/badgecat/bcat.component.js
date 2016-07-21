System.register(['angular2/core', 'angular2/router', './bcat-edit/bcat-edit.component', './bcat.service', '../badge/badge.service', '../pipe/filter-array-pipe', '../pipe/yes-no-pipe'], function(exports_1, context_1) {
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
    var core_1, router_1, bcat_edit_component_1, bcat_service_1, badge_service_1, filter_array_pipe_1, yes_no_pipe_1;
    var BCatComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (bcat_edit_component_1_1) {
                bcat_edit_component_1 = bcat_edit_component_1_1;
            },
            function (bcat_service_1_1) {
                bcat_service_1 = bcat_service_1_1;
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
            BCatComponent = (function () {
                function BCatComponent(_router, _bcatService, _badgeService) {
                    this._router = _router;
                    this._bcatService = _bcatService;
                    this._badgeService = _badgeService;
                    this.badgecats = [];
                    this.badges = [];
                    this.active = false;
                }
                BCatComponent.prototype.ngOnInit = function () {
                    this.getBadgeCats();
                    this.getBadges();
                };
                BCatComponent.prototype.getBadgeCats = function () {
                    var _this = this;
                    this._bcatService.getBadgeCats().subscribe(function (badgecats) { _this.badgecats = badgecats; });
                    if (this.badgecats == null) {
                        this.active = true;
                    }
                    // this.badgesets.sort(this.toCompare);
                };
                // toCompare(a,b) {
                // 	if (a.index < b.index)
                // 		return -1;
                // 	else if (a.index > b.index)
                // 		return 1;
                // 	else 
                // 		return 0;
                // }
                BCatComponent.prototype.getBadges = function () {
                    var _this = this;
                    this._badgeService.getBadges().subscribe(function (badges) { _this.badges = badges; });
                };
                BCatComponent.prototype.toBadges = function () {
                    this._router.navigate(['Badges']);
                };
                BCatComponent.prototype.onSelect = function (badgecat) {
                    this.selectedBadgeCat = badgecat;
                };
                BCatComponent.prototype.toBCatEdit = function (bcatid) {
                    this._router.navigate(['BCatEdit', { id: bcatid }]);
                };
                BCatComponent.prototype.addBadgeCat = function () {
                    this._router.navigate(['BCatNew']);
                };
                BCatComponent.prototype.removeBadgeCat = function (id) {
                    this._bcatService.deleteBadgeCat(id).subscribe();
                    location.reload();
                };
                BCatComponent.prototype.deleteBadgeCatPop = function (id) {
                    var r = confirm("Are you sure you want to delete this Badge Category ?");
                    if (r == true) {
                        this.removeBadgeCat(id);
                    }
                };
                BCatComponent.prototype.toBadgeCats = function () {
                    this._router.navigate(['BadgeCat']);
                    location.reload();
                };
                BCatComponent.prototype.toBadgeDetail = function (bname) {
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
                BCatComponent = __decorate([
                    core_1.Component({
                        selector: 'my-badgecat',
                        templateUrl: 'app/components/badgecat/bcat.component.html',
                        styleUrls: ['app/components/badgecat/bcat.component.css'],
                        directives: [bcat_edit_component_1.BCatEditComponent],
                        pipes: [filter_array_pipe_1.FilterArrayPipe, yes_no_pipe_1.YesNoPipe]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, bcat_service_1.BCatService, badge_service_1.BadgeService])
                ], BCatComponent);
                return BCatComponent;
            }());
            exports_1("BCatComponent", BCatComponent);
        }
    }
});
//# sourceMappingURL=bcat.component.js.map