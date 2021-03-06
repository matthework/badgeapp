import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {BadgeService} from './badge/badge.service';
import {StaffService} from './staff/staff.service';
import {TierService} from './tier/tier.service';
import {BSService} from './badgeset/bs.service';

import {AuthService} from './auth/auth.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/app.component.html',
    styleUrls: ['app/components/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        BadgeService,
        StaffService,
        TierService,
        BSService,
        AuthService
    ]
})

export class AppComponent {
    title = 'Badge App';
    constructor(private auth: AuthService) {}
}


