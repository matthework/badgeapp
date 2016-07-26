import {Injectable}      from '@angular/core';
import {Router} from '@angular/router';
import {tokenNotExpired} from 'angular2-jwt';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  // Configure Auth0
  lock = new Auth0Lock('HZeBxWHzhhebpsDpSR8E5IJaZGHcuii7', 'mattwangprop.auth0.com', {
    theme: {
      logo: "test-icon.png",
      primaryColor: "#b81b1c"
    },
    languageDictionary: {
      title: "My Badge"
    }
  });

  //Store profile object in auth class
  userProfile: any;

  constructor(private _router: Router) {
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
    if (tokenNotExpired() && this.userProfile.email=="matt.wang@propellerhead.co.nz") {
      return true;
    }else {
      return false;
    }
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
    this.toMain();
  };

  toMain() {
    this._router.navigate(['/main']);
    location.reload();
  }

}
