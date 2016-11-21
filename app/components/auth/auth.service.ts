import {Injectable}      from '@angular/core';
import {Router} from '@angular/router';
import {tokenNotExpired} from 'angular2-jwt';
import {Http} from '@angular/http';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  adminList = [
    "matt.wang@propellerhead.co.nz",
    "andrew.weston@propellerhead.co.nz",
    "andrew.goldie@propellerhead.co.nz",
    "jonathan.cupples@propellerhead.co.nz"
    ]

  // Configure Auth0
  lock = new Auth0Lock('HZeBxWHzhhebpsDpSR8E5IJaZGHcuii7', 'mattwangprop.auth0.com', {
    theme: {
      logo: "plogo.png",
      primaryColor: "#4CAF50"
    },
    languageDictionary: {
      title: "My Badge"
    },
    // rememberLastLogin: true,
    // redirect: false
  });

  //Store profile object in auth class
  userProfile: any;

  constructor(private _router: Router,private _http: Http) {
    // Set userProfile attribute if already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
      
      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        profile.user_metadata = profile.user_metadata || {};
        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
        this.toMain();
        // location.reload();
      });

    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public isAdmin() {
    // Check if there's an admin account
    var result = false
    if (this.userProfile) {
      if (this.adminList.indexOf(this.userProfile.email)!=-1) {
        result = true
      }
    }
    return result
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
    // location.reload();
    this.toMain();
  };

  toMain() {
    this._router.navigate(['/main']);
    // location.reload();
  }

}
