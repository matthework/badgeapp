import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Tier} from './tier';
import {TierEditComponent} from './tier-edit/tier-edit.component';
import {TierService} from './tier.service';
import {BadgeSet} from '../badgeset/bs';
import {BSService} from '../badgeset/bs.service';
import {AuthService} from '../auth/auth.service';

import {FilterArrayPipe} from '../pipe/filter-array-pipe';

@Component({
    selector: 'my-tier',
    templateUrl: 'app/components/tier/tier.component.html',
    styleUrls: ['app/components/tier/tier.component.css'],
    directives: [TierEditComponent],
    pipes: [FilterArrayPipe]
})
export class TierComponent {

  tiers: Tier[] = [];
  selectedTier: Tier;
  active = false;
  badgesets: BadgeSet[] = [];
  toPay = false;
  gmap = {0:"A", 1:"B", 2:"C", 3:"D", 4:"E", 5:"F"};

  constructor(
    private _tierService: TierService,
    private _bsService: BSService,
    private _router: Router,
    private auth: AuthService) {}

  ngOnInit() {
    this.getTiers();
    this.getBadgeSets();
  }

  getTiers() {
    this._tierService.getTiers().subscribe(tiers => { this.tiers = tiers});
  }

  getBadgeSets() {
    this._bsService.getBadgeSets().subscribe(badgesets => { this.badgesets = badgesets});
  }

  onSelect(tier: Tier) { 
    this.selectedTier = tier; 
  }

  toTierDetail(tid:string) {
    this._router.navigate(['/tier/detail',tid]);
  }

  toTierEdit(tid:string) {
    this._router.navigate(['/tier/edit',tid]);
  }
  
  addTier() {
    this._router.navigate(['/tier/new']);
  }

  removeTier(id:string) {
    this._tierService.deleteTier(id).subscribe();
    location.reload();
  }

  deleteTierPop(id:string) {
    var r = confirm("Are you sure you want to delete this Tier ?");
    if (r == true) {
      this.removeTier(id);
    }
  }

  getTierGradeBS(t:number, g:string) {
    var bset = [];
    if (this.badgesets != null) {
      for (var i = 0; i < this.badgesets.length; i++) { 
        if (this.badgesets[i].tier == t && this.badgesets[i].grade == g) {
          bset.push(this.badgesets[i]);
        }
      }
    }

    // console.log('you submitted value: ', bset); 
    return bset;
  }

  toBSDetail(bsid:string){
    this._router.navigate(['/bs/detail',bsid]);
  }

  toTiers() {
    this._router.navigate(['/tiers']);
    location.reload();
  }

}


