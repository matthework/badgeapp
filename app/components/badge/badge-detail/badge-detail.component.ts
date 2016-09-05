import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

import {Badge} from '../badge';
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
    badgesets: BadgeSet[] = [];
    sub: any;
    id: string;
    bName = false;

    constructor(
        private _badgeService: BadgeService, 
        private _bsService: BSService,
        private _router: Router,
        private route: ActivatedRoute,
        private auth: AuthService) {}

    ngOnInit() {
        this.getParams();
        this.getBadge();
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

    getBadgeSets() {
        this._bsService.getBadgeSets().subscribe(badgesets => { this.badgesets = badgesets});
    }

    toBadges() {
        this._router.navigate(['/badges']);
        location.reload();
    }

    editBadge() {
        this._router.navigate(['/badge/edit', this.id]);
    }

    findBadgeSet(bname:string, l:number) {
    var bset = [];
    if (this.badgesets != null) {
        for (var i = 0; i < this.badgesets.length; i++) { 
            for (var j = 0; j < this.badgesets[i].badgegroups.length; j++) {   
                if (this.badgesets[i].status=='Accepted' && this.badgesets[i].badgegroups[j].badge == bname && this.badgesets[i].badgegroups[j].level == l) {
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

    goBack() {
    window.history.back();
    }
}


