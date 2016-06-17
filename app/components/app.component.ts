import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from 'angular2/router';
import {MainComponent} from './main/main.component';

import {BadgeComponent} from './badge/badge.component';
import {BadgeService} from './badge/badge.service';
import {BadgeDetailComponent} from './badge/badge-detail/badge-detail.component';
import {BadgeEditComponent} from './badge/badge-edit/badge-edit.component';
import {BadgeNewComponent} from './badge/badge-new/badge-new.component';

import {StaffComponent} from './staff/staff.component';
import {StaffService} from './staff/staff.service';
import {StaffEditComponent} from './staff/staff-edit/staff-edit.component';
import {StaffDetailComponent} from './staff/staff-detail/staff-detail.component';
import {StaffNewComponent} from './staff/staff-new/staff-new.component';

import {TierComponent} from './tier/tier.component';
import {TierService} from './tier/tier.service';
import {TierEditComponent} from './tier/tier-edit/tier-edit.component';
import {TierDetailComponent} from './tier/tier-detail/tier-detail.component';
import {TierNewComponent} from './tier/tier-new/tier-new.component';

import {BSComponent} from './badgeset/bs.component';
import {BSService} from './badgeset/bs.service';
import {BSEditComponent} from './badgeset/bs-edit/bs-edit.component';
import {BSDetailComponent} from './badgeset/bs-detail/bs-detail.component';
import {BSNewComponent} from './badgeset/bs-new/bs-new.component';

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/app.component.html',
    styleUrls: ['app/components/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        BadgeService,
        StaffService,
        TierService,
        BSService
    ]
})
@RouteConfig([
    {
        path: '/main',
        name: 'Main',
        component: MainComponent,
        useAsDefault: true
    },
    {
        path: '/badges',
        name: 'Badges',
        component: BadgeComponent,
    },
    {
        path: '/badge/detail/:id',
        name: 'BadgeDetail',
        component: BadgeDetailComponent,
    },
    {
        path: '/badge/edit/:id',
        name: 'BadgeEdit',
        component: BadgeEditComponent,
    },
    {
        path: '/badge/new',
        name: 'BadgeNew',
        component: BadgeNewComponent,
    },
    {
        path: '/staffs',
        name: 'Staffs',
        component: StaffComponent
    },
    {
        path: '/staff/detail/:id',
        name: 'StaffDetail',
        component: StaffDetailComponent,
    },
    {
        path: '/staff/edit/:id',
        name: 'StaffEdit',
        component: StaffEditComponent,
    },
    {
        path: '/staff/new',
        name: 'StaffNew',
        component: StaffNewComponent,
    },
    {
        path: '/tiers',
        name: 'Tiers',
        component: TierComponent,
    },
    {
        path: '/tier/detail/:id',
        name: 'TierDetail',
        component: TierDetailComponent,
    },
    {
        path: '/tier/edit/:id',
        name: 'TierEdit',
        component: TierEditComponent,
    },
    {
        path: '/tier/new',
        name: 'TierNew',
        component: TierNewComponent,
    },
    {
        path: '/badgeset',
        name: 'BadgeSet',
        component: BSComponent,
    },
    {
        path: '/bs/detail/:id',
        name: 'BSDetail',
        component: BSDetailComponent,
    },
    {
        path: '/bs/edit/:id',
        name: 'BSEdit',
        component: BSEditComponent,
    },
    {
        path: '/bs/new',
        name: 'BSNew',
        component: BSNewComponent,
    }
])
export class AppComponent{
    title = 'My Badge App!';
}


