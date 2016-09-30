import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Tier} from './tier';
import {TierService} from './tier.service';
import {BadgeSet} from '../badgeset/bs';
import {BSService} from '../badgeset/bs.service';
import {AuthService} from '../auth/auth.service';

import {FilterArrayPipe} from '../pipe/filter-array-pipe';

@Component({
    selector: 'my-tier',
    templateUrl: 'app/components/tier/tier.component.html',
    styleUrls: ['app/components/tier/tier.component.css'],
    directives: [],
    pipes: [FilterArrayPipe]
})
export class TierComponent {

  tier: Tier;
  tiers: Tier[] = [];
  selectedTier: Tier;
  active = false;
  badgesets: BadgeSet[] = [];
  toPay = false;
  tedit =false;
  gmap = {0:"A", 1:"B", 2:"C", 3:"D", 4:"E", 5:"F"};
  et =false;
  ea =false;
  eb =false;
  ec =false;
  ed =false;
  ee =false;
  ef =false;
  ejud =false;
  eexp =false;

  constructor(
    private _tierService: TierService,
    private _bsService: BSService,
    private _router: Router,
    private auth: AuthService) {}

  ngOnInit() {
    this.getTiers();
    this.getBadgeSets();
  }

  getTier() {
    console.log('id from _routeParams: ', this.selectedTier._id); 
    this._tierService.getTier(this.selectedTier._id).subscribe((tier) => {this.tier = tier;});
  }

  getTiers() {
    this._tierService.getTiers().subscribe(tiers => { this.tiers = tiers});
  }

  getBadgeSets() {
    this._bsService.getBadgeSets().subscribe(badgesets => { this.badgesets = badgesets});
  }

  onSelect(tier: Tier,input: string) { 
    this.selectedTier = tier; 
    if(input=='tier') {
      this.et = true;
    }else if(input=='a') {
      this.ea = true;
    }else if(input=='b') {
      this.eb = true;
    }else if(input=='c') {
      this.ec = true;
    }else if(input=='d') {
      this.ed = true;
    }else if(input=='e') {
      this.ee = true;
    }else if(input=='f') {
      this.ef = true;
    }else if(input=='jud') {
      this.ejud = true;
    }else if(input=='exp') {
      this.eexp = true;
    }
  }

  toTierDetail(tid:string) {
    this._router.navigate(['/tier/detail',tid]);
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
        if (this.badgesets[i].tier == t && this.badgesets[i].grade == g && this.badgesets[i].status=='Accepted') {
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

  updateTier(t:Tier) {
      let value = JSON.stringify(t)
      this._tierService.updateTier(t._id,value).subscribe();
      console.log('you submitted value: ', value); 
  }

  checkAdmin() {
    if(this.auth.isAdmin()) {
      this.tedit = true;
    }
  }

   resetEdit() {
      this.tedit =false;
      this.et =false;
      this.ea =false;
      this.eb =false;
      this.ec =false;
      this.ed =false;
      this.ee =false;
      this.ef =false;
      this.ejud =false;
      this.eexp =false;
   }

}


