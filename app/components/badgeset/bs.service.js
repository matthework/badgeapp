"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var BSService = (function () {
    function BSService(_http) {
        this._http = _http;
    }
    BSService.prototype.getBadgeSets = function () {
        return this._http.get('/api/bs').map(function (r) { return r.json(); });
    };
    BSService.prototype.getBadgeSet = function (id) {
        return this._http.get('/api/bs/edit/' + id).map(function (r) { return r.json(); });
    };
    BSService.prototype.addBadgeSet = function (value) {
        var _messageStringified = value; //JSON.stringify(value);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/bs/new', _messageStringified, { headers: headers });
    };
    BSService.prototype.updateBadgeSet = function (id, value) {
        var _messageStringified = value; //JSON.stringify(value);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/bs/update/' + id, _messageStringified, { headers: headers });
    };
    BSService.prototype.deleteBadgeSet = function (id) {
        return this._http.post('/api/bs/remove/' + id, "");
    };
    BSService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], BSService);
    return BSService;
}());
exports.BSService = BSService;
//# sourceMappingURL=bs.service.js.map