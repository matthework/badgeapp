import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

import {BadgeSet,BadgeGroup} from '../bs';
import {BSService} from '../bs.service';
import {Badge} from '../../badge/badge';
import {BadgeService} from '../../badge/badge.service';
import {Tier} from '../../tier/tier';
import {TierService} from '../../tier/tier.service';
import {AuthService} from '../../auth/auth.service';

import {YesNoPipe} from '../../pipe/yes-no-pipe';

@Component({
  selector: 'my-badgeset-detail',
  templateUrl: 'app/components/badgeset/bs-detail/bs-detail.component.html',
  styleUrls: ['app/components/badgeset/bs-detail/bs-detail.component.css'],
  pipes: [YesNoPipe]
})

export class BSDetailComponent implements OnInit {

  badgeset: BadgeSet;
  badges: Badge[] = [];
  tiers: Tier[] = [];
  active = false;
  // newBadge = "";
  // newLevel = 0;
  // newFocus = "";
  gmap = {"A":0, "B":1, "C":2, "D":3, "E":4, "F":5};
  gradesOptions =["A", "B", "C", "D", "E", "F"]; 
  sub: any;
  id: string;
  more = false;

  constructor(
    private _bsService: BSService,
    private _badgeService: BadgeService,
    private _tierService: TierService,
    private _router: Router,
    private route: ActivatedRoute,
    private auth: AuthService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getBadgeSet();
    this.getBadges();
    this.getTiers();
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }

  getBadgeSet() {
    console.log('id from _routeParams: ', this.id); 
    this._bsService.getBadgeSet(this.id).subscribe(badgeset => {this.badgeset = badgeset});
  }

  getBadges() {
    this._badgeService.getBadges().subscribe(badges => { this.badges = badges});
  }

  getTiers() {
    this._tierService.getTiers().subscribe(tiers => { this.tiers = tiers});
  }

  toBadgeSets() {
    this._router.navigate(['/badgeset']);
    location.reload();
  }

  toBSEdit(bsid:string) {
    this._router.navigate(['/bs/edit',bsid]);
  }

  getPay(t:number, g:string) {
    var pay = 0;
    if (this.tiers != null && t != 0 && g != "") {
        for (var i = 0; i < this.tiers.length; i++) { 
            if (this.tiers[i].tier == t) {
                pay = this.tiers[i].grades[this.gmap[g]];
            }
        }
    }
    return pay;
  }

  getDesc(b:string, l:number) {
    var desc = "";
    if (this.badges != null && l > 0 && b != "") {
        for (var i = 0; i < this.badges.length; i++) { 
            if (this.badges[i].name == b) {
                for (var j = 0; j < this.badges[i].badgelevels.length; j++) { 
                    if (this.badges[i].badgelevels[j].level == l) {
                        desc = this.badges[i].badgelevels[j].desc;
                    }
                }
            }
        }
    }
    return desc;
  }

  getBadgesOptions() {
    var badgesOptions = [];
    if (this.badges != null) {
        for (var i = 0; i < this.badges.length; i++) { 
          badgesOptions.push(this.badges[i].name);
        }
    }
    // console.log('getBadgesOptions: ', badgesOptions);
    return badgesOptions.sort();
  }

  getLevelsOptions(bname: string) {
    var levelsOptions = [];
    if (this.badges != null) {
        for (var i = 0; i < this.badges.length; i++) { 
            if (this.badges[i].name == bname) {
                for (var j = 0; j < this.badges[i].badgelevels.length; j++) { 
                    levelsOptions.push(this.badges[i].badgelevels[j].level);
                }
            }
        }
    }
    // console.log('getBadgesOptions: ', badgesOptions);
    return levelsOptions.sort();
  }

  getTiersOptions() {
    var tiersOptions =[];
    if (this.tiers != null) {
        for (var i = 0; i < this.tiers.length; i++) { 
          tiersOptions.push(this.tiers[i].tier);
        }
    }
    // console.log('getTiersOptions: ', tiersOptions);
    return tiersOptions.sort();
  }

  checkCore(b:string) {
    var result = "No";
    if (this.badgeset != null) {
        for (var i = 0; i < this.badgeset.corebadges.length; i++) { 
            if (this.badgeset.corebadges[i].badge == b) {
                result = "Yes";
            }
        }
    }
    return result;
  }

  toBadgeDetail(bname:string) {
    var bid = "";
    if (this.badges != null) {
        for (var i = 0; i < this.badges.length; i++) {   
            if (this.badges[i].name == bname) {
                bid = this.badges[i]._id;
            }
        }
    }
    this._router.navigate(['/badge/detail',bid]);
  }

  getMoreBadges(bgs:BadgeGroup[]) {
    var moreBadges = [];
    if (bgs != null) {
      for (var i = 0; i < bgs.length; i++) { 
        for (var j = 0; j < this.badges.length; j++) { 
          for (var k = 0; k < this.badges[j].badgelevels.length; k++) { 
            if (bgs[i].badge == this.badges[j].name && bgs[i].level>this.badges[j].badgelevels[k].level) {
              moreBadges.push({"badge": this.badges[j].name, "level": this.badges[j].badgelevels[k].level, "focus": bgs[i].focus, "current":false});
            }
            if (bgs[i].badge == this.badges[j].name && bgs[i].level==this.badges[j].badgelevels[k].level) {
              moreBadges.push({"badge": this.badges[j].name, "level": this.badges[j].badgelevels[k].level, "focus": bgs[i].focus, "current":true});
            }
          }
        }
        
      }
    }
    return moreBadges;
  }

  goBack() {
    window.history.back();
  }

}


