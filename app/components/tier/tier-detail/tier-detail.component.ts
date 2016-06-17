import {Component,OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Router} from 'angular2/router';
import {Tier} from '../tier';
import {TierService} from '../tier.service';
import {Validators,FormBuilder,ControlGroup,AbstractControl} from 'angular2/common';
import {BadgeSet} from '../../badgeset/bs';
import {BSService} from '../../badgeset/bs.service';

@Component({
  selector: 'my-tier-detail',
  templateUrl: 'app/components/tier/tier-detail/tier-detail.component.html',
  styleUrls: ['app/components/tier/tier-detail/tier-detail.component.css']
})

export class TierDetailComponent implements OnInit {

  tier: Tier;
  badgesets: BadgeSet[] = [];
  gradesIndex =[0, 1, 2, 3, 4, 5]; 
  gmap = {0:"A", 1:"B", 2:"C", 3:"D", 4:"E", 5:"F"};

  constructor(
      private _tierService: TierService, 
      private _bsService: BSService,
      private _router: Router,
      private _routeParams: RouteParams) {}

  ngOnInit() {
    this.getTier();
    this.getBadgeSets()
  }

  getTier() {
    let id = this._routeParams.get('id');
    console.log('id from _routeParams: ', id); 
    this._tierService.getTier(id).subscribe((tier) => {this.tier = tier;});
  }

  getBadgeSets() {
    this._bsService.getBadgeSets().subscribe(badgesets => { this.badgesets = badgesets});
  }

  toTiers() {
    this._router.navigate(['Tiers']);
    // location.reload();
  }

  toTierEdit(tid:string) {
    this._router.navigate(['TierEdit', { id: tid}]);
  }

  getTierBS(t:number) {
    var bset = [];
    for (var i = 0; i < this.badgesets.length; i++) { 
      if (this.badgesets[i].tier == t) {
        bset.push(this.badgesets[i]);
      }
    }
    return bset;
  }

  getTierGradeBS(t:number, g:string) {
    var bset = [];
    for (var i = 0; i < this.badgesets.length; i++) { 
      if (this.badgesets[i].tier == t && this.badgesets[i].grade == g) {
        bset.push(this.badgesets[i]);
      }
    }
    return bset;
  }

  toBSDetail(bsid:string){
    this._router.navigate(['BSDetail', { id: bsid}]);
  }

  goBack() {
    window.history.back();
  }

}

