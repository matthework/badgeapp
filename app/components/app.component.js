System.register(['angular2/core', 'angular2/router', './main/main.component', './badge/badge.component', './badge/badge.service', './badge/badge-detail/badge-detail.component', './badge/badge-edit/badge-edit.component', './badge/badge-new/badge-new.component', './staff/staff.component', './staff/staff.service', './staff/staff-edit/staff-edit.component', './staff/staff-detail/staff-detail.component', './staff/staff-new/staff-new.component', './tier/tier.component', './tier/tier.service', './tier/tier-edit/tier-edit.component', './tier/tier-detail/tier-detail.component', './tier/tier-new/tier-new.component', './badgeset/bs.component', './badgeset/bs.service', './badgeset/bs-edit/bs-edit.component', './badgeset/bs-detail/bs-detail.component', './badgeset/bs-new/bs-new.component'], function(exports_1, context_1) {
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
    var core_1, router_1, main_component_1, badge_component_1, badge_service_1, badge_detail_component_1, badge_edit_component_1, badge_new_component_1, staff_component_1, staff_service_1, staff_edit_component_1, staff_detail_component_1, staff_new_component_1, tier_component_1, tier_service_1, tier_edit_component_1, tier_detail_component_1, tier_new_component_1, bs_component_1, bs_service_1, bs_edit_component_1, bs_detail_component_1, bs_new_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (main_component_1_1) {
                main_component_1 = main_component_1_1;
            },
            function (badge_component_1_1) {
                badge_component_1 = badge_component_1_1;
            },
            function (badge_service_1_1) {
                badge_service_1 = badge_service_1_1;
            },
            function (badge_detail_component_1_1) {
                badge_detail_component_1 = badge_detail_component_1_1;
            },
            function (badge_edit_component_1_1) {
                badge_edit_component_1 = badge_edit_component_1_1;
            },
            function (badge_new_component_1_1) {
                badge_new_component_1 = badge_new_component_1_1;
            },
            function (staff_component_1_1) {
                staff_component_1 = staff_component_1_1;
            },
            function (staff_service_1_1) {
                staff_service_1 = staff_service_1_1;
            },
            function (staff_edit_component_1_1) {
                staff_edit_component_1 = staff_edit_component_1_1;
            },
            function (staff_detail_component_1_1) {
                staff_detail_component_1 = staff_detail_component_1_1;
            },
            function (staff_new_component_1_1) {
                staff_new_component_1 = staff_new_component_1_1;
            },
            function (tier_component_1_1) {
                tier_component_1 = tier_component_1_1;
            },
            function (tier_service_1_1) {
                tier_service_1 = tier_service_1_1;
            },
            function (tier_edit_component_1_1) {
                tier_edit_component_1 = tier_edit_component_1_1;
            },
            function (tier_detail_component_1_1) {
                tier_detail_component_1 = tier_detail_component_1_1;
            },
            function (tier_new_component_1_1) {
                tier_new_component_1 = tier_new_component_1_1;
            },
            function (bs_component_1_1) {
                bs_component_1 = bs_component_1_1;
            },
            function (bs_service_1_1) {
                bs_service_1 = bs_service_1_1;
            },
            function (bs_edit_component_1_1) {
                bs_edit_component_1 = bs_edit_component_1_1;
            },
            function (bs_detail_component_1_1) {
                bs_detail_component_1 = bs_detail_component_1_1;
            },
            function (bs_new_component_1_1) {
                bs_new_component_1 = bs_new_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.title = 'My Badge App!';
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/components/app.component.html',
                        styleUrls: ['app/components/app.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            badge_service_1.BadgeService,
                            staff_service_1.StaffService,
                            tier_service_1.TierService,
                            bs_service_1.BSService
                        ]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/main',
                            name: 'Main',
                            component: main_component_1.MainComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/badges',
                            name: 'Badges',
                            component: badge_component_1.BadgeComponent,
                        },
                        {
                            path: '/badge/detail/:id',
                            name: 'BadgeDetail',
                            component: badge_detail_component_1.BadgeDetailComponent,
                        },
                        {
                            path: '/badge/edit/:id',
                            name: 'BadgeEdit',
                            component: badge_edit_component_1.BadgeEditComponent,
                        },
                        {
                            path: '/badge/new',
                            name: 'BadgeNew',
                            component: badge_new_component_1.BadgeNewComponent,
                        },
                        {
                            path: '/staffs',
                            name: 'Staffs',
                            component: staff_component_1.StaffComponent
                        },
                        {
                            path: '/staff/detail/:id',
                            name: 'StaffDetail',
                            component: staff_detail_component_1.StaffDetailComponent,
                        },
                        {
                            path: '/staff/edit/:id',
                            name: 'StaffEdit',
                            component: staff_edit_component_1.StaffEditComponent,
                        },
                        {
                            path: '/staff/new',
                            name: 'StaffNew',
                            component: staff_new_component_1.StaffNewComponent,
                        },
                        {
                            path: '/tiers',
                            name: 'Tiers',
                            component: tier_component_1.TierComponent,
                        },
                        {
                            path: '/tier/detail/:id',
                            name: 'TierDetail',
                            component: tier_detail_component_1.TierDetailComponent,
                        },
                        {
                            path: '/tier/edit/:id',
                            name: 'TierEdit',
                            component: tier_edit_component_1.TierEditComponent,
                        },
                        {
                            path: '/tier/new',
                            name: 'TierNew',
                            component: tier_new_component_1.TierNewComponent,
                        },
                        {
                            path: '/badgeset',
                            name: 'BadgeSet',
                            component: bs_component_1.BSComponent,
                        },
                        {
                            path: '/bs/detail/:id',
                            name: 'BSDetail',
                            component: bs_detail_component_1.BSDetailComponent,
                        },
                        {
                            path: '/bs/edit/:id',
                            name: 'BSEdit',
                            component: bs_edit_component_1.BSEditComponent,
                        },
                        {
                            path: '/bs/new',
                            name: 'BSNew',
                            component: bs_new_component_1.BSNewComponent,
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map