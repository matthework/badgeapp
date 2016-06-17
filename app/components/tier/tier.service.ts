import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http,Response,Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TierService {

	constructor(private _http: Http) {}

	getTiers():Observable<any> {
		return this._http.get('/api/tiers').map(r => r.json());
	}

	getTier(id:string):Observable<any> {
		return this._http.get('/api/tier/edit/'+id).map(r => r.json());
	}

	addTier(value:string):Observable<any> {
		let _messageStringified = value; //JSON.stringify(value);
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this._http.post('/api/tier/new', _messageStringified, {headers});
	}

	updateTier(id:string,value:string):Observable<any> {
		let _messageStringified = value; //JSON.stringify(value);
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this._http.post('/api/tier/update/'+id, _messageStringified, {headers});
	}

	deleteTier(id:string):Observable<any> {
		return this._http.post('/api/tier/remove/'+id, "");
	}

	// getPay(t:string, g:string):Observable<any> {
	// 	return this._http.get('/api/tier/pay/'+t+'/'+g).map(r => r.json());
	// }

}

