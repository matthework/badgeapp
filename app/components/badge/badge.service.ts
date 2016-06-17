import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http,Response,Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BadgeService {

	// static ENDPOINT: string = '/badge/detail/:id';

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








// import { Injectable } from 'angular2/core';
// import { Badge } from './badge';
// import { BADGES } from './data-badges';


// @Injectable()
// export class BadgeService {

//   getBadges() {
//     return Promise.resolve(BADGES);
//   }

//   getBadge(name: string) {
//     return Promise.resolve(BADGES).then(
//       badges => badges.filter(badge => badge.name === name)[0]
//     );
//   }
// }





// import {Inject} from 'angular2/core';
// import {Observable} from 'rxjs/Observable';
// import {Http,Headers} from 'angular2/http';
// import 'rxjs/add/operator/map';

// export class BadgeService {
//   static ENDPOINT: string = '/badges/:id';

//   constructor(@Inject(Http) private _http: Http) {

//   }

//   getAll():Observable<any> {
//     return this._http
//                .get(BadgeService.ENDPOINT.replace(':id', ''))
//                .map((r) => r.json());
//   }

//   getBadge(id:string):Observable<any> {
//     return this._http
//                .get(BadgeService.ENDPOINT.replace(':id', id))
//                .map((r) => r.json());
//   }

//   add(description:string):Observable<any> {
//     let _descStringified = JSON.stringify({desc: description});

//     let headers = new Headers();

//     headers.append('Content-Type', 'application/json');

//     return this._http
//                .post(BadgeService.ENDPOINT.replace(':id', ''), _descStringified, {headers})
//                .map((r) => r.json());
//   }

//   remove(id: string):Observable<any> {
//     return this._http
//                .delete(BadgeService.ENDPOINT.replace(':id', id));
//   }
// }
