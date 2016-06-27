
import {Component,OnInit,Inject} from 'angular2/core';
// import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {Router} from 'angular2/router';
import {Badge} from './badge';
import {BadgeDetailComponent} from './badge-detail/badge-detail.component';
import {BadgeEditComponent} from './badge-edit/badge-edit.component';
import {BadgeService} from './badge.service';

import {FilterArrayPipe} from '../pipe/filter-array-pipe';
import {YesNoPipe} from '../pipe/yes-no-pipe';

@Component({
    selector: 'my-badge',
    templateUrl: 'app/components/badge/badge.component.html',
    styleUrls: ['app/components/badge/badge.component.css'],
    directives: [BadgeDetailComponent,BadgeEditComponent],
    pipes: [FilterArrayPipe,YesNoPipe]
})

export class BadgeComponent implements OnInit {

  // title: string = "Badges";
  badges: Badge[] = [];
  selectedBadge: Badge;
  active = false;
  showBadges = false;

  // private _ws: $WebSocket;

  constructor (
      private _router: Router,
      private _badgeService: BadgeService) {}
  //     this._ws = new $WebSocket("ws://localhost:8080/");
  //     let cb = function(message: any) {
  //         if (message.data.length > 0) {
  //             alert(message.data);
  //         }
  //     }
  //     this._ws.onMessage(cb, null);
  // }

  // sendMessage(message: string) {
  //     if (message.length > 0) {
  //         this._ws.send(message);
  //     }
  // }

  ngOnInit() {
    this.getBadges();
  }

  getBadges() {
    this._badgeService.getBadges().subscribe(badges => { this.badges = badges});
  }

  onSelect(badge: Badge) { 
    this.selectedBadge = badge;
  }

  toDetail() {
    this._router.navigate(['BadgeDetail', { id: this.selectedBadge._id }]);
  }

  toEdit(bid:string) {
    this._router.navigate(['BadgeEdit', { id: bid}]);
  }

  addBadge() {
    this._router.navigate(['BadgeNew']);
  }

  removeBadge(id:string) {
    // let id = this.selectedBadge._id;
    this._badgeService.deleteBadge(id).subscribe();
    location.reload();
  }

  deleteBadgePop(id:string) {
    var r = confirm("Are you sure you want to delete this Badge ?");
    if (r == true) {
      this.removeBadge(id);
    }
  }

  toBadges() {
    this._router.navigate(['Badges']);
    location.reload();
  }

  groupByTag(tag) {
    var b = [];
    if (this.badges != null) {
      for (var i = 0; i < this.badges.length; i++) { 
        if (this.badges[i].tags.indexOf(tag) != -1) {
          this.badges[i].tags = [tag];
          b.push(this.badges[i]);
        }
      }
    }
    this.badges = b;
    this.showBadges = true;
  }

  getBadgeCat() {
    this._router.navigate(['BadgeSet']);
  }

}



