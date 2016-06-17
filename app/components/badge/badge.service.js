System.register(['angular2/core', 'angular2/http', 'rxjs/add/operator/map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var BadgeService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            BadgeService = (function () {
                // static ENDPOINT: string = '/badge/detail/:id';
                function BadgeService(_http) {
                    this._http = _http;
                }
                BadgeService.prototype.getBadges = function () {
                    return this._http.get('/api/badges').map(function (r) { return r.json(); });
                };
                BadgeService.prototype.getBadge = function (id) {
                    return this._http.get('/api/badge/detail/' + id).map(function (r) { return r.json(); });
                };
                BadgeService.prototype.addBadge = function (value) {
                    var _messageStringified = value; //JSON.stringify(value);
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this._http.post('/api/badge/new', _messageStringified, { headers: headers });
                };
                BadgeService.prototype.updateBadge = function (id, value) {
                    var _messageStringified = value; //JSON.stringify(value);
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this._http.post('/api/badge/update/' + id, _messageStringified, { headers: headers });
                };
                BadgeService.prototype.deleteBadge = function (id) {
                    return this._http.post('/api/badge/remove/' + id, "");
                };
                BadgeService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], BadgeService);
                return BadgeService;
            }());
            exports_1("BadgeService", BadgeService);
        }
    }
});
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
//# sourceMappingURL=badge.service.js.map