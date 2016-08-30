import {Component} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {Staff} from '../staff';
import {StaffService} from '../staff.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'my-user-new',
  templateUrl: 'app/components/staff/user-new/user-new.component.html',
  styleUrls: ['app/components/staff/user-new/user-new.component.css']
})

export class UserNewComponent {
  
  email: string;
  sub: any;
  newUser = {index: 0, fname: "", lname: "", status: "Active", position: "", salary: 0, email: "", phone: "", userbgroups: [], active: true, brief:"", others: []}

  constructor(
      private _staffService: StaffService, 
      private _router: Router,
      private route: ActivatedRoute,
      private auth: AuthService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.email = params['email'];
    });
    this.newUser.email = this.email;
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }

  addNewUser() {
    let value = JSON.stringify(this.newUser)
    this._staffService.addStaff(value).subscribe();
    console.log('you submitted value: ', value);
    this.toUserDetail(this.newUser.email);
  }

  toUserDetail(email:string) {
    this._router.navigate(['/user/detail',email]);
    // location.reload();
  }

  goBack() {
    window.history.back();
  }

}

