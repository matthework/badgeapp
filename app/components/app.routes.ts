import {provideRouter,RouterConfig}  from '@angular/router';

import {MainComponent} from './main/main.component';
import {AboutComponent} from './about/about.component';

import {BadgeComponent} from './badge/badge.component';
import {BadgeDetailComponent} from './badge/badge-detail/badge-detail.component';
import {BadgeNewComponent} from './badge/badge-new/badge-new.component';

import {StaffComponent} from './staff/staff.component';
import {StaffDetailComponent} from './staff/staff-detail/staff-detail.component';
import {StaffNewComponent} from './staff/staff-new/staff-new.component';
import {UserDetailComponent} from './staff/user-detail/user-detail.component';
import {UserNewComponent} from './staff/user-new/user-new.component';

import {TierComponent} from './tier/tier.component';
import {TierDetailComponent} from './tier/tier-detail/tier-detail.component';
import {TierNewComponent} from './tier/tier-new/tier-new.component';

import {BSComponent} from './badgeset/bs.component';
import {BSDetailComponent} from './badgeset/bs-detail/bs-detail.component';
import {BSNewComponent} from './badgeset/bs-new/bs-new.component';

const routes: RouterConfig = [
  {
      path: '',
      component: MainComponent,
      // redirectTo: 'main',
      // pathMatch: 'full'
  },
  {
      path: 'main',
      component: MainComponent,
      // useAsDefault: true
  },
  {
      path: 'about',
      component: AboutComponent,
  },
  {
      path: 'badges',
      component: BadgeComponent,
  },
  {
      path: 'badge/detail/:id',
      component: BadgeDetailComponent,
  },
  {
      path: 'badge/new',
      component: BadgeNewComponent,
  },
  {
      path: 'staffs',
      component: StaffComponent
  },
  {
      path: 'staff/detail/:id',
      component: StaffDetailComponent,
  },
  {
      path: 'staff/new',
      component: StaffNewComponent,
  },
  {
      path: 'user',
      component: UserDetailComponent,
  },
  {
      path: 'user/new/:email',
      component: UserNewComponent,
  },
  {
      path: 'user/detail/:email',
      component: UserDetailComponent,
  },
  {
      path: 'tiers',
      component: TierComponent,
  },
  {
      path: 'tier/detail/:id',
      component: TierDetailComponent,
  },
  {
      path: 'tier/new',
      component: TierNewComponent,
  },
  {
      path: 'badgeset',
      component: BSComponent,
  },
  {
      path: 'bs/detail/:id',
      component: BSDetailComponent,
  },
  {
      path: 'bs/new',
      component: BSNewComponent,
  }
];

export const AppRouterProviders = [
  provideRouter(routes)
];



