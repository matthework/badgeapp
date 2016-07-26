import {Component} from '@angular/core';

import {AuthService} from '../auth/auth.service';

@Component({
    selector: 'my-main',
    templateUrl: 'app/components/main/main.component.html',
    styleUrls: ['app/components/main/main.component.css'],
})

export class MainComponent {
	constructor(private auth: AuthService) {}
}
