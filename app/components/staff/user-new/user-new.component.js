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
var router_1 = require('@angular/router');
var staff_service_1 = require('../staff.service');
var auth_service_1 = require('../../auth/auth.service');
var UserNewComponent = (function () {
    function UserNewComponent(_staffService, _router, route, auth) {
        this._staffService = _staffService;
        this._router = _router;
        this.route = route;
        this.auth = auth;
        this.newUser = { index: 0, fname: "", lname: "", status: "Active", position: "", salary: 0, email: "", phone: "", userbgroups: [], active: true, brief: "", others: [] };
    }
    UserNewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.email = params['email'];
        });
        this.newUser.email = this.email;
    };
    UserNewComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    UserNewComponent.prototype.addNewUser = function () {
        var value = JSON.stringify(this.newUser);
        this._staffService.addStaff(value).subscribe();
        console.log('you submitted value: ', value);
        this.toUserDetail(this.newUser.email);
    };
    UserNewComponent.prototype.toUserDetail = function (email) {
        this._router.navigate(['/user/detail', email]);
        // location.reload();
    };
    UserNewComponent.prototype.goBack = function () {
        window.history.back();
    };
    UserNewComponent = __decorate([
        core_1.Component({
            selector: 'my-user-new',
            templateUrl: 'app/components/staff/user-new/user-new.component.html',
            styleUrls: ['app/components/staff/user-new/user-new.component.css']
        }), 
        __metadata('design:paramtypes', [staff_service_1.StaffService, router_1.Router, router_1.ActivatedRoute, auth_service_1.AuthService])
    ], UserNewComponent);
    return UserNewComponent;
}());
exports.UserNewComponent = UserNewComponent;
//# sourceMappingURL=user-new.component.js.map