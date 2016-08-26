import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Staff} from '../staff/staff';
import {StaffService} from '../staff/staff.service';

import {AuthService} from '../auth/auth.service';

@Component({
    selector: 'my-main',
    templateUrl: 'app/components/main/main.component.html',
    styleUrls: ['app/components/main/main.component.css'],
})

export class MainComponent {

	staffs: Staff[] = [];
	newUser = {index: 0, fname: "", lname: "", position: "", salary: 0, email: "", phone: "", badgegroups: [], others: []}

	constructor(private auth: AuthService,
				private _router: Router,
				private _staffService: StaffService ) {}

	ngOnInit() {
		this.getStaffs();
	}

	getStaffs() {
		this._staffService.getStaffs().subscribe(staffs => { this.staffs = staffs});
	}

	checkProfile() {
		var hasProfile = false;
		for (var i = 0; i < this.staffs.length; i++) { 
			var name = this.staffs[i].fname + " " + this.staffs[i].lname;
			if(this.staffs[i].email==this.auth.userProfile.email){
				hasProfile = true;
				break;
			}
		}
		// console.log('you submitted value: ', hasProfile); 
		return hasProfile;
	}

	addNewUser(email:string) {
		this._router.navigate(['/user/new',email]);
	}

	toUserDetail(email:string) {
		this._router.navigate(['/user/detail',email]);
	}

	toAdmin() {
		this._router.navigate(['/admin']);
	}
}
