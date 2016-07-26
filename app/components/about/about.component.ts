import {Component} from '@angular/core';

import {AuthService} from '../auth/auth.service';

@Component({
    selector: 'my-main',
    templateUrl: 'app/components/about/about.component.html',
    styleUrls: ['app/components/about/about.component.css'],
})

export class AboutComponent {
	constructor(private auth: AuthService) {}
}
