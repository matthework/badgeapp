import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

import {Tier} from '../tier';
import {TierService} from '../tier.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'my-tier-edit',
  templateUrl: 'app/components/tier/tier-edit/tier-edit.component.html',
  styleUrls: ['app/components/tier/tier-edit/tier-edit.component.css']
})

export class TierEditComponent implements OnInit {

  tier: Tier;
  sub: any;
  id: string;

  constructor(
      private _tierService: TierService, 
      private _router: Router,
      private route: ActivatedRoute,
      private auth: AuthService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getTier();
  }

  getTier() {
    console.log('id from _routeParams: ', this.id); 
    this._tierService.getTier(this.id).subscribe((tier) => {this.tier = tier;});
  }

  toTiers() {
    this._router.navigate(['/tiers']);
    // location.reload();
  }

  updateTier() {
      let value = JSON.stringify(this.tier)
      this._tierService.updateTier(this.id,value).subscribe();
      console.log('you submitted value: ', value); 
      this.toTiers();
  }

  addTier() {
    this._router.navigate(['/tier/new']);
  }

  removeTier() {
    this._tierService.deleteTier(this.id).subscribe();
    this.toTiers();
  }

  deleteTierPop() {
    var tier = this.tier.tier;
    var r = confirm("Are you sure you want to delete Tier: " + tier +" ?");
    if (r == true) {
      this.removeTier();
    }
  }

  goBack() {
    window.history.back();
  }

}

