"use strict";
var router_1 = require('@angular/router');
var main_component_1 = require('./main/main.component');
var about_component_1 = require('./about/about.component');
var badge_component_1 = require('./badge/badge.component');
var badge_detail_component_1 = require('./badge/badge-detail/badge-detail.component');
var badge_new_component_1 = require('./badge/badge-new/badge-new.component');
var staff_component_1 = require('./staff/staff.component');
var staff_detail_component_1 = require('./staff/staff-detail/staff-detail.component');
var staff_new_component_1 = require('./staff/staff-new/staff-new.component');
var user_detail_component_1 = require('./staff/user-detail/user-detail.component');
var user_new_component_1 = require('./staff/user-new/user-new.component');
var tier_component_1 = require('./tier/tier.component');
var tier_detail_component_1 = require('./tier/tier-detail/tier-detail.component');
var tier_new_component_1 = require('./tier/tier-new/tier-new.component');
var bs_component_1 = require('./badgeset/bs.component');
var bs_detail_component_1 = require('./badgeset/bs-detail/bs-detail.component');
var bs_new_component_1 = require('./badgeset/bs-new/bs-new.component');
var routes = [
    {
        path: '',
        component: main_component_1.MainComponent,
    },
    {
        path: 'main',
        component: main_component_1.MainComponent,
    },
    {
        path: 'about',
        component: about_component_1.AboutComponent,
    },
    {
        path: 'badges',
        component: badge_component_1.BadgeComponent,
    },
    {
        path: 'badge/detail/:id',
        component: badge_detail_component_1.BadgeDetailComponent,
    },
    {
        path: 'badge/new',
        component: badge_new_component_1.BadgeNewComponent,
    },
    {
        path: 'staffs',
        component: staff_component_1.StaffComponent
    },
    {
        path: 'staff/detail/:id',
        component: staff_detail_component_1.StaffDetailComponent,
    },
    {
        path: 'staff/new',
        component: staff_new_component_1.StaffNewComponent,
    },
    {
        path: 'user',
        component: user_detail_component_1.UserDetailComponent,
    },
    {
        path: 'user/new/:email',
        component: user_new_component_1.UserNewComponent,
    },
    {
        path: 'user/detail/:email',
        component: user_detail_component_1.UserDetailComponent,
    },
    {
        path: 'tiers',
        component: tier_component_1.TierComponent,
    },
    {
        path: 'tier/detail/:id',
        component: tier_detail_component_1.TierDetailComponent,
    },
    {
        path: 'tier/new',
        component: tier_new_component_1.TierNewComponent,
    },
    {
        path: 'badgeset',
        component: bs_component_1.BSComponent,
    },
    {
        path: 'bs/detail/:id',
        component: bs_detail_component_1.BSDetailComponent,
    },
    {
        path: 'bs/new',
        component: bs_new_component_1.BSNewComponent,
    }
];
exports.AppRouterProviders = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map