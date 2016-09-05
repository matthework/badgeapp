import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BadgeService {

	constructor(private _http: Http) {}

	getBadges():Observable<any> {
		return this._http.get('/api/badges').map(r => r.json());
	}

	getBadge(id:string):Observable<any> {
		return this._http.get('/api/badge/detail/'+id).map(r => r.json());
	}

	addBadge(value:string):Observable<any> {
		let _messageStringified = value;//JSON.stringify(value);
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this._http.post('/api/badge/new', _messageStringified, {headers});
	}

	updateBadge(id:string,value:string):Observable<any> {
		let _messageStringified = value; //JSON.stringify(value);
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this._http.post('/api/badge/update/'+id, _messageStringified, {headers});
	}

	deleteBadge(id:string):Observable<any> {
		return this._http.post('/api/badge/remove/'+id, "");
	}

}

