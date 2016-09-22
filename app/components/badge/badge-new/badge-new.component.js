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
var badge_service_1 = require('../badge.service');
var auth_service_1 = require('../../auth/auth.service');
var BadgeNewComponent = (function () {
    function BadgeNewComponent(_badgeService, _router, auth) {
        this._badgeService = _badgeService;
        this._router = _router;
        this.auth = auth;
        this.newFC = "";
        // newbls = [
        //           {label: "I understand... ", level: 1, desc:""},
        //           {label: "I participate... ", level: 2, desc:""},
        //           {label: "I contribute... ", level: 3, desc:""},
        //           {label: "I lead... ", level: 4, desc:""},
        //           {label: "I advise... ", level: 5, desc:""},
        //           {label: "I can teach... ", level: 6, desc:""},
        //           {label: "I plan sophisticated... ", level: 7, desc:""},
        //           {label: "I have achieved wide recognition... ", level: 8, desc:""},
        //           {label: "I am a world leading... ", level: 9, desc:""}];
        this.labels = ["I understand... ",
            "I participate... ",
            "I contribute... ",
            "I lead... ",
            "I advise... ",
            "I can teach... ",
            "I plan sophisticated... ",
            "I have achieved wide recognition... ",
            "I am a world leading... "
        ];
        this.newbls = [
            { level: 1, desc: "" },
            { level: 2, desc: "" },
            { level: 3, desc: "" },
            { level: 4, desc: "" },
            { level: 5, desc: "" },
            { level: 6, desc: "" },
            { level: 7, desc: "" },
            { level: 8, desc: "" },
            { level: 9, desc: "" }];
        // newbls = [
        //           {level: 1, desc:"I understand "},
        //           {level: 2, desc:"I participate "},
        //           {level: 3, desc:"I contribute "},
        //           {level: 4, desc:"I lead "},
        //           {level: 5, desc:"I advise "},
        //           {level: 6, desc:"I can teach "},
        //           {level: 7, desc:"I plan sophisticated "},
        //           {level: 8, desc:"I have achieved wide recognition "},
        //           {level: 9, desc:"I am a world leading "}];
        this.statusOptions = ['Accepted', 'Draft', 'NotUsed'];
        this.newBadge = { index: 0, name: "", code: "", owner: "PHL", published: false, overview: "", focus: [], status: "Accepted", badgelevels: this.newbls, approved: true, inused: true };
    }
    BadgeNewComponent.prototype.addBadge = function () {
        this.newBadge.code = this.newBadge.code.toUpperCase();
        this.newBadge.owner = this.newBadge.owner.toUpperCase();
        this.newBadge.badgelevels.sort(this.toCompare);
        this.newBadge.focus = this.newBadge.focus.sort();
        var value = JSON.stringify(this.newBadge);
        this._badgeService.addBadge(value).subscribe();
        console.log('you submitted value: ', value);
        this.toBadges();
    };
    BadgeNewComponent.prototype.toCompare = function (a, b) {
        if (a.level < b.level)
            return -1;
        else if (a.level > b.level)
            return 1;
        else
            return 0;
    };
    BadgeNewComponent.prototype.toBadges = function () {
        this._router.navigate(['/badges']);
        location.reload();
    };
    BadgeNewComponent.prototype.addFC = function (fc) {
        this.newBadge.focus.push(fc.toUpperCase());
        this.newFC = "";
    };
    BadgeNewComponent.prototype.deleteFC = function (fc) {
        var index = this.newBadge.focus.indexOf(fc);
        this.newBadge.focus.splice(index, 1);
    };
    BadgeNewComponent.prototype.goBack = function () {
        window.history.back();
    };
    BadgeNewComponent = __decorate([
        core_1.Component({
            selector: 'my-badge-new',
            templateUrl: 'app/components/badge/badge-new/badge-new.component.html',
            styleUrls: ['app/components/badge/badge-new/badge-new.component.css']
        }), 
        __metadata('design:paramtypes', [badge_service_1.BadgeService, router_1.Router, auth_service_1.AuthService])
    ], BadgeNewComponent);
    return BadgeNewComponent;
}());
exports.BadgeNewComponent = BadgeNewComponent;
//# sourceMappingURL=badge-new.component.js.map