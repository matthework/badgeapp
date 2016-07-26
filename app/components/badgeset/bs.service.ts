import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BSService {

	constructor(private _http: Http) {}

	getBadgeSets():Observable<any> {
		return this._http.get('/api/bs').map(r => r.json());
	}

	getBadgeSet(id:string):Observable<any> {
		return this._http.get('/api/bs/edit/'+id).map(r => r.json());
	}

	addBadgeSet(value:string):Observable<any> {
		let _messageStringified = value; //JSON.stringify(value);
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this._http.post('/api/bs/new', _messageStringified, {headers});
	}

	updateBadgeSet(id:string,value:string):Observable<any> {
		let _messageStringified = value; //JSON.stringify(value);
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this._http.post('/api/bs/update/'+id, _messageStringified, {headers});
	}

	deleteBadgeSet(id:string):Observable<any> {
		return this._http.post('/api/bs/remove/'+id, "");
	}

}