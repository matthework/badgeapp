import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {Observable} from 'rxjs/Rx';
import {Tier} from './tier';
import {TierEditComponent} from './tier-edit/tier-edit.component';
import {TierService} from './tier.service';
import {FilterArrayPipe} from '../pipe/filter-array-pipe';
import {BadgeSet} from '../badgeset/bs';
import {BSService} from '../badgeset/bs.service';

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
    private _router: Router) {}

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
    this._router.navigate(['TierDetail', { id: tid }]);
  }

  toTierEdit(tid:string) {
    this._router.navigate(['TierEdit', { id: tid }]);
  }
  
  addTier() {
    this._router.navigate(['TierNew']);
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
    this._router.navigate(['BSDetail', { id: bsid}]);
  }

  toTiers() {
    this._router.navigate(['Tiers']);
    location.reload();
  }

}


