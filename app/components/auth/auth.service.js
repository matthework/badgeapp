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
var angular2_jwt_1 = require('angular2-jwt');
var http_1 = require('@angular/http');
var AuthService = (function () {
    function AuthService(_router, _http) {
        var _this = this;
        this._router = _router;
        this._http = _http;
        // adminList = [
        //   "matt.wang@propellerhead.co.nz",
        //   "andrew.weston@propellerhead.co.nz",
        //   "andrew.goldie@propellerhead.co.nz",
        //   "jonathan.cupples@propellerhead.co.nz"
        //   ]
        // Configure Auth0
        this.lock = new Auth0Lock('dn6vHGxvwMJzGNuJE3QIOBKIHugB478U', 'matthework.auth0.com', {
            theme: {
                logo: "blogo.png",
                primaryColor: "#4CAF50"
            },
            languageDictionary: {
                title: "Badge App"
            },
        });
        // Set userProfile attribute if already saved profile
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
        // Add callback for lock `authenticated` event
        this.lock.on('authenticated', function (authResult) {
            localStorage.setItem('id_token', authResult.idToken);
            // Fetch profile information
            _this.lock.getProfile(authResult.idToken, function (error, profile) {
                if (error) {
                    // Handle error
                    alert(error);
                    return;
                }
                profile.user_metadata = profile.user_metadata || {};
                profile.app_metadata = profile.app_metadata || {};
                localStorage.setItem('profile', JSON.stringify(profile));
                _this.userProfile = profile;
                _this.toMain();
                // location.reload();
            });
        });
    }
    AuthService.prototype.login = function () {
        // Call the show method to display the widget.
        this.lock.show();
    };
    ;
    AuthService.prototype.authenticated = function () {
        // Check if there's an unexpired JWT
        // It searches for an item in localStorage with key == 'id_token'
        return angular2_jwt_1.tokenNotExpired();
    };
    ;
    // public isAdmin() {
    //   // Check if there's an admin account
    //   var result = false
    //   if (this.userProfile) {
    //     if (this.adminList.indexOf(this.userProfile.email)!=-1) {
    //       result = true
    //     }
    //   }
    //   return result
    // };
    AuthService.prototype.isAdmin = function () {
        // Check if it is admin user
        var isAdmin = false;
        if (this.userProfile && this.userProfile.app_metadata && this.userProfile.app_metadata.isAdmin) {
            isAdmin = true;
        }
        return isAdmin;
    };
    ;
    AuthService.prototype.logout = function () {
        // Remove token from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.userProfile = undefined;
        // location.reload();
        this.toMain();
    };
    ;
    AuthService.prototype.toMain = function () {
        this._router.navigate(['/main']);
        // location.reload();
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map