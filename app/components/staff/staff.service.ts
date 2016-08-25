import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StaffService {

	// staffs: Staff[] = [];

	constructor(private _http: Http) {}

	getStaffs():Observable<any> {
		return this._http.get('/api/staffs').map(r => r.json());
	}

	getStaff(id:string):Observable<any> {
		return this._http.get('/api/staff/edit/'+id).map(r => r.json());
	}

	getStaffByEmail(email:string):Observable<any> {
		return this._http.get('/api/staff/edit/email/'+email).map(r => r.json());
	}

	addStaff(value:string):Observable<any> {
		let _messageStringified = value; //JSON.stringify(value);
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this._http.post('/api/staff/new', _messageStringified, {headers});
	           //.map((r) => r.json());
	}

	updateStaff(id:string,value:string):Observable<any> {
		let _messageStringified = value; //JSON.stringify(value);
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this._http.post('/api/staff/update/'+id, _messageStringified, {headers});
	}

	deleteStaff(id:string):Observable<any> {
		return this._http.post('/api/staff/remove/'+id, "");
	}


}

