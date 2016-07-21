import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http,Response,Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BCatService {

	constructor(private _http: Http) {}

	getBadgeCats():Observable<any> {
		return this._http.get('/api/bcats').map(r => r.json());
	}

	getBadgeCat(id:string):Observable<any> {
		return this._http.get('/api/bcat/edit/'+id).map(r => r.json());
	}

	addBadgeCat(value:string):Observable<any> {
		let _messageStringified = value;
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this._http.post('/api/bcat/new', _messageStringified, {headers});
	}

	updateBadgeCat(id:string,value:string):Observable<any> {
		let _messageStringified = value;
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this._http.post('/api/bcat/update/'+id, _messageStringified, {headers});
	}

	deleteBadgeCat(id:string):Observable<any> {
		return this._http.post('/api/bcat/remove/'+id, "");
	}

}