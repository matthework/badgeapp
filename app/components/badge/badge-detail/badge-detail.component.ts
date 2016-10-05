import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

import {Badge,BadgeLevel} from '../badge';
import {BadgeService} from '../badge.service';
import {BadgeSet} from '../../badgeset/bs';
import {BSService} from '../../badgeset/bs.service';
import {AuthService} from '../../auth/auth.service';

import {YesNoPipe} from '../../pipe/yes-no-pipe';

@Component({
    selector: 'my-badge-detail',
    templateUrl: 'app/components/badge/badge-detail/badge-detail.component.html',
    styleUrls: ['app/components/badge/badge-detail/badge-detail.component.css'],
    pipes: [YesNoPipe]
})

export class BadgeDetailComponent implements OnInit {

    badge: Badge;
    badges: Badge[] = [];
    badgesets: BadgeSet[] = [];
    selectedBL: BadgeLevel;
    sub: any;
    id: string;
    newFC = "";
    newLevel = 0;
    newDesc = "";
    statusOptions = ['Accepted','Draft','NotUsed'];
    bName = false;
    oview =false;
    editStatus = false;
    bedit = false;
    addLevel = false;
    editFC = false;
    editOwner = false;
    labels = [  "I understand... ", 
              "I participate... ", 
              "I contribute... ", 
              "I lead... ", 
              "I advise... ", 
              "I can teach... ", 
              "I plan sophisticated... ",
              "I have achieved wide recognition... ", 
              "I am a world leading... "
            ];

    constructor(
        private _badgeService: BadgeService, 
        private _bsService: BSService,
        private _router: Router,
        private route: ActivatedRoute,
        private auth: AuthService) {}

    ngOnInit() {
        this.getParams();
        this.getBadge();
        this.getBadges()
        this.getBadgeSets();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getParams() {
        this.sub = this.route.params.subscribe(params => {
          this.id = params['id'];
        });
    }

    getBadge() {
        console.log('id from _routeParams: ', this.id); 
        this._badgeService.getBadge(this.id).subscribe((badge) => {this.badge = badge;});
    }

    onSelect(bl: BadgeLevel) { 
      this.selectedBL = bl;
    }

    getBadges() {
        this._badgeService.getBadges().subscribe(badges => { this.badges = badges});
    }

    getBadgeSets() {
        this._bsService.getBadgeSets().subscribe(badgesets => { this.badgesets = badgesets});
    }

    toBadges() {
        this._router.navigate(['/badges']);
        this.getBadges()
        // location.reload();
    }

    editBadge() {
        this._router.navigate(['/badge/edit', this.id]);
    }

   findBadgeSet(bid:string, l:number) {
      var bset = [];
      if (this.badgesets != null) {
         for (var i = 0; i < this.badgesets.length; i++) { 
            for (var j = 0; j < this.badgesets[i].badgegroups.length; j++) {   
               if (this.badgesets[i].status=='Accepted' && this.badgesets[i].badgegroups[j].bid == bid && this.badgesets[i].badgegroups[j].level == l) {
                  bset.push(this.badgesets[i]);
               }
            }
         }
      }
      return bset;
   }

    toBSDetail(bsid:string){
        this._router.navigate(['bs/detail',bsid]);
    }

    checkCore(bs:BadgeSet,b:string) {
        var result = "";
        if (bs != null) {
            for (var i = 0; i < bs.corebadges.length; i++) { 
                if (bs.corebadges[i].badge == b) {
                result = " ** ";
                }
            }
        }
        return result;
    }

  updateBadge() {
    this.badge.code = this.badge.code.toUpperCase();
    this.badge.owner = this.badge.owner.toUpperCase();
    if(this.badge.focus == null) {
        this.badge.focus = [];
    }
    this.badge.badgelevels.sort(this.toCompare);
    let value = JSON.stringify(this.badge)
    this._badgeService.updateBadge(this.id,value).subscribe();
    console.log('you updated value: ', value); 
  }

  addBadge() {
    this._router.navigate(['/badge/new']);
  }

  removeBadge() {
    this._badgeService.deleteBadge(this.id).subscribe();
    this.toBadges();
  }

  deleteBadgePop() {
    var name = this.badge.name
    var r = confirm("Are you sure you want to delete Badge: " + name.toUpperCase() +" ?");
    if (r == true) {
      this.removeBadge();
    }
  }

  addBadgeLevel() {
    this.badge.badgelevels.push({level: this.newLevel, desc: this.newDesc});
    this.badge.badgelevels.sort(this.toCompare);
    let value = JSON.stringify(this.badge)
    console.log('you submitted value: ', value);
    this.newLevel = 0;
    this.newDesc = "";
  }

  toCompare(a,b) {
    if (a.level < b.level)
      return -1;
    else if (a.level > b.level)
      return 1;
    else 
      return 0;
  }

  removeBadgeLevel(selectedLevel: BadgeLevel) {
    let index = this.badge.badgelevels.indexOf(selectedLevel);
    this.badge.badgelevels.splice(index,1);
    let value = JSON.stringify(this.badge)
    console.log('you submitted value: ', value);
  }

  deleteBadgeLevelPop(selectedLevel: BadgeLevel) {
    var name = this.badge.name
    var level = selectedLevel.level
    var r = confirm("Are you sure you want to delete "+ name.toUpperCase() + " Level " + level +" ?");
    if (r == true) {
      this.removeBadgeLevel(selectedLevel);
    }
  }

  checkAdmin() {
    if(this.auth.isAdmin()) {
      this.bedit = true;
    }
  }

  addFC(fc:string) {
    if(this.badge.focus == null) {
        this.badge.focus = [];
    }
    this.badge.focus.push(fc.toUpperCase());
    this.newFC = "";
    this.editFC = true;
  }

  deleteFC(fc:string) {
    let index = this.badge.focus.indexOf(fc);
    this.badge.focus.splice(index,1);
  }

  checkEmptyFocus() {
      if (this.badge.focus != null) {
          if (this.badge.focus.length == 0) {
              return true;
          }else {
              return false;
          }
      }else {
          return true;
      }

  }

  cleanEmpty(bls:BadgeLevel[]) {
    var b = [];
    for (var i = 0; i < this.badge.badgelevels.length; i++) { 
      if(this.badge.badgelevels[i].desc != "") {
        b.push(this.badge.badgelevels[i]);
      }
    }
    return b;
  }

  updatePublish(event) {
    if(event.target.checked) {
      this.badge.published = true;
    }else {
      this.badge.published = false;
    }
    this.updateBadge();
  }

   clickOut() {
      console.log("click........");
   }
  goBack() {
    window.history.back();
  }

}


