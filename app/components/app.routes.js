"use strict";
var router_1 = require('@angular/router');
var main_component_1 = require('./main/main.component');
var badge_component_1 = require('./badge/badge.component');
var badge_detail_component_1 = require('./badge/badge-detail/badge-detail.component');
var badge_edit_component_1 = require('./badge/badge-edit/badge-edit.component');
var badge_new_component_1 = require('./badge/badge-new/badge-new.component');
var staff_component_1 = require('./staff/staff.component');
var staff_edit_component_1 = require('./staff/staff-edit/staff-edit.component');
var staff_detail_component_1 = require('./staff/staff-detail/staff-detail.component');
var staff_new_component_1 = require('./staff/staff-new/staff-new.component');
var tier_component_1 = require('./tier/tier.component');
var tier_edit_component_1 = require('./tier/tier-edit/tier-edit.component');
var tier_detail_component_1 = require('./tier/tier-detail/tier-detail.component');
var tier_new_component_1 = require('./tier/tier-new/tier-new.component');
var bs_component_1 = require('./badgeset/bs.component');
var bs_edit_component_1 = require('./badgeset/bs-edit/bs-edit.component');
var bs_detail_component_1 = require('./badgeset/bs-detail/bs-detail.component');
var bs_new_component_1 = require('./badgeset/bs-new/bs-new.component');
var bcat_component_1 = require('./badgecat/bcat.component');
var bcat_edit_component_1 = require('./badgecat/bcat-edit/bcat-edit.component');
var bcat_new_component_1 = require('./badgecat/bcat-new/bcat-new.component');
var routes = [
    // {
    //   path: '',
    //   redirectTo: '/dashboard',
    //   pathMatch: 'full'
    // },
    // {
    //   path: 'dashboard',
    //   component: DashboardComponent
    // },
    // {
    //   path: 'detail/:id',
    //   component: HeroDetailComponent
    // },
    // {
    //   path: 'heroes',
    //   component: HeroesComponent
    // }
    {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
    },
    {
        path: 'main',
        // name: 'Main',
        component: main_component_1.MainComponent,
    },
    {
        path: 'badges',
        // name: 'Badges',
        component: badge_component_1.BadgeComponent,
    },
    {
        path: 'badge/detail/:id',
        // name: 'BadgeDetail',
        component: badge_detail_component_1.BadgeDetailComponent,
    },
    {
        path: 'badge/edit/:id',
        // name: 'BadgeEdit',
        component: badge_edit_component_1.BadgeEditComponent,
    },
    {
        path: 'badge/new',
        // name: 'BadgeNew',
        component: badge_new_component_1.BadgeNewComponent,
    },
    {
        path: 'staffs',
        // name: 'Staffs',
        component: staff_component_1.StaffComponent
    },
    {
        path: 'staff/detail/:id',
        // name: 'StaffDetail',
        component: staff_detail_component_1.StaffDetailComponent,
    },
    {
        path: 'staff/edit/:id',
        // name: 'StaffEdit',
        component: staff_edit_component_1.StaffEditComponent,
    },
    {
        path: 'staff/new',
        // name: 'StaffNew',
        component: staff_new_component_1.StaffNewComponent,
    },
    {
        path: 'tiers',
        // name: 'Tiers',
        component: tier_component_1.TierComponent,
    },
    {
        path: 'tier/detail/:id',
        // name: 'TierDetail',
        component: tier_detail_component_1.TierDetailComponent,
    },
    {
        path: 'tier/edit/:id',
        // name: 'TierEdit',
        component: tier_edit_component_1.TierEditComponent,
    },
    {
        path: 'tier/new',
        // name: 'TierNew',
        component: tier_new_component_1.TierNewComponent,
    },
    {
        path: 'badgeset',
        // name: 'BadgeSet',
        component: bs_component_1.BSComponent,
    },
    {
        path: 'bs/detail/:id',
        // name: 'BSDetail',
        component: bs_detail_component_1.BSDetailComponent,
    },
    {
        path: 'bs/edit/:id',
        // name: 'BSEdit',
        component: bs_edit_component_1.BSEditComponent,
    },
    {
        path: 'bs/new',
        // name: 'BSNew',
        component: bs_new_component_1.BSNewComponent,
    },
    {
        path: 'badgecat',
        // name: 'BadgeCat',
        component: bcat_component_1.BCatComponent,
    },
    {
        path: 'bcat/edit/:id',
        // name: 'BCatEdit',
        component: bcat_edit_component_1.BCatEditComponent,
    },
    {
        path: 'bcat/new',
        // name: 'BCatNew',
        component: bcat_new_component_1.BCatNewComponent,
    }
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map