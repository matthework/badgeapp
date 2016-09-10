import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

import {Tier} from '../tier';
import {TierService} from '../tier.service';
import {BadgeSet} from '../../badgeset/bs';
import {BSService} from '../../badgeset/bs.service';
import {AuthService} from '../../auth/auth.service';

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
  sub: any;
  id: string;
  tName =false;
  judge =false;
  expert =false;
  bedit = false;

  constructor(
    private _tierService: TierService, 
    private _bsService: BSService,
    private _router: Router,
    private route: ActivatedRoute,
    private auth: AuthService) {}

  ngOnInit() {
    this.getParams();
    this.getTier();
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

  getTier() {
    console.log('id from _routeParams: ', this.id); 
    this._tierService.getTier(this.id).subscribe((tier) => {this.tier = tier;});
  }

  getBadgeSets() {
    this._bsService.getBadgeSets().subscribe(badgesets => { this.badgesets = badgesets});
  }

  toTiers() {
    this._router.navigate(['/tiers']);
    location.reload();
  }

  toTierEdit(tid:string) {
    this._router.navigate(['/tier/edit',tid]);
  }

  updateTier() {
      this.tier.tier = +this.tier.tier;
      let value = JSON.stringify(this.tier)
      this._tierService.updateTier(this.tier._id,value).subscribe();
      console.log('you submitted value: ', value); 
  }

  addTier() {
    this._router.navigate(['/tier/new']);
  }

  removeTier() {
    this._tierService.deleteTier(this.tier._id).subscribe();
    this.toTiers();
  }

  deleteTierPop() {
    var tier = this.tier.tier;
    var r = confirm("Are you sure you want to delete Tier: " + tier +" ?");
    if (r == true) {
      this.removeTier();
    }
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
    this._router.navigate(['/bs/detail',bsid]);
  }

  checkAdmin() {
    if(this.auth.isAdmin()) {
      this.bedit = true;
    }
  }

  goBack() {
    window.history.back();
  }

}

