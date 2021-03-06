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
var StaffService = (function () {
    // staffs: Staff[] = [];
    function StaffService(_http) {
        this._http = _http;
    }
    StaffService.prototype.getStaffs = function () {
        return this._http.get('/api/staffs').map(function (r) { return r.json(); });
    };
    StaffService.prototype.getStaff = function (id) {
        return this._http.get('/api/staff/edit/' + id).map(function (r) { return r.json(); });
    };
    StaffService.prototype.getStaffByEmail = function (email) {
        return this._http.get('/api/staff/detail/email/' + email).map(function (r) { return r.json(); });
    };
    StaffService.prototype.addStaff = function (value) {
        var _messageStringified = value; //JSON.stringify(value);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/staff/new', _messageStringified, { headers: headers });
        //.map((r) => r.json());
    };
    StaffService.prototype.updateStaff = function (id, value) {
        var _messageStringified = value; //JSON.stringify(value);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/staff/update/' + id, _messageStringified, { headers: headers });
    };
    StaffService.prototype.deleteStaff = function (id) {
        return this._http.post('/api/staff/remove/' + id, "");
    };
    StaffService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], StaffService);
    return StaffService;
}());
exports.StaffService = StaffService;
//# sourceMappingURL=staff.service.js.map