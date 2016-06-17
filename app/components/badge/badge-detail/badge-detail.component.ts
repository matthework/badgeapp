import {Component,OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Router} from 'angular2/router';
import {Badge} from '../badge';
import {BadgeService} from '../badge.service';
import {Validators,FormBuilder,ControlGroup,AbstractControl} from 'angular2/common';
import {YesNoPipe} from '../../pipe/yes-no-pipe';
import {BadgeSet} from '../../badgeset/bs';
import {BSService} from '../../badgeset/bs.service';

@Component({
    selector: 'my-badge-detail',
    templateUrl: 'app/components/badge/badge-detail/badge-detail.component.html',
    styleUrls: ['app/components/badge/badge-detail/badge-detail.component.css'],
    pipes: [YesNoPipe]
})

export class BadgeDetailComponent implements OnInit {

    title: string = "Badge";
    badge: Badge;
    badgesets: BadgeSet[] = [];

    constructor(
        private _badgeService: BadgeService, 
        private _bsService: BSService,
        private _router: Router,
        private _routeParams: RouteParams) {}

    ngOnInit() {
        this.getBadge();
        this.getBadgeSets();
    }

    getBadge() {
        let id = this._routeParams.get('id');
        console.log('id from _routeParams: ', id); 
        this._badgeService.getBadge(id).subscribe((badge) => {this.badge = badge;});
    }

    getBadgeSets() {
        this._bsService.getBadgeSets().subscribe(badgesets => { this.badgesets = badgesets});
    }

    toBadges() {
        this._router.navigate(['Badges']);
        // location.reload();
    }

    editBadge() {
        this._router.navigate(['BadgeEdit', { id: this._routeParams.get('id') }]);
    }

    findBadgeSet(bname:string, l:number) {
    var bset = [];
    if (this.badgesets != null) {
        for (var i = 0; i < this.badgesets.length; i++) { 
            for (var j = 0; j < this.badgesets[i].badgegroups.length; j++) {   
                if (this.badgesets[i].badgegroups[j].badge == bname && this.badgesets[i].badgegroups[j].level == l) {
                  bset.push(this.badgesets[i]);
                }
            }
        }
    }
    return bset;
    }

    toBSDetail(bsid:string){
        this._router.navigate(['BSDetail', { id: bsid}]);
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

    goBack() {
    window.history.back();
    }
}


