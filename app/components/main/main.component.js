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
var staff_service_1 = require('../staff/staff.service');
var auth_service_1 = require('../auth/auth.service');
var MainComponent = (function () {
    function MainComponent(auth, _router, _staffService) {
        this.auth = auth;
        this._router = _router;
        this._staffService = _staffService;
        this.staffs = [];
        this.newUser = { index: 0, fname: "", lname: "", position: "", salary: 0, email: "", phone: "", badgegroups: [], others: [] };
    }
    MainComponent.prototype.ngOnInit = function () {
        this.getStaffs();
    };
    MainComponent.prototype.getStaffs = function () {
        var _this = this;
        this._staffService.getStaffs().subscribe(function (staffs) { _this.staffs = staffs; });
    };
    MainComponent.prototype.checkProfile = function () {
        var hasProfile = false;
        for (var i = 0; i < this.staffs.length; i++) {
            var name = this.staffs[i].fname + " " + this.staffs[i].lname;
            if (this.staffs[i].email == this.auth.userProfile.email) {
                hasProfile = true;
                break;
            }
        }
        // console.log('you submitted value: ', hasProfile); 
        return hasProfile;
    };
    MainComponent.prototype.addNewUser = function (email) {
        this._router.navigate(['/user/new', email]);
    };
    MainComponent.prototype.toUserDetail = function (email) {
        this._router.navigate(['/user/detail', email]);
    };
    MainComponent.prototype.toAdmin = function () {
        this._router.navigate(['/admin']);
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: 'my-main',
            templateUrl: 'app/components/main/main.component.html',
            styleUrls: ['app/components/main/main.component.css'],
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router, staff_service_1.StaffService])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map