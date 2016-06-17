import {Component,OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Router} from 'angular2/router';
import {Tier} from '../tier';
import {TierService} from '../tier.service';
import {Validators,FormBuilder,ControlGroup,AbstractControl} from 'angular2/common';

@Component({
  selector: 'my-tier-edit',
  templateUrl: 'app/components/tier/tier-edit/tier-edit.component.html',
  styleUrls: ['app/components/tier/tier-edit/tier-edit.component.css']
})

export class TierEditComponent implements OnInit {

  tier: Tier;

  constructor(
      private _tierService: TierService, 
      private _router: Router,
      private _routeParams: RouteParams) {}

  ngOnInit() {
    let id = this._routeParams.get('id');
    console.log('id from _routeParams: ', id); 
    this._tierService.getTier(id).subscribe((tier) => {this.tier = tier;});
  }

  toTiers() {
    this._router.navigate(['Tiers']);
    // location.reload();
  }

  updateTier() {
      let id = this._routeParams.get('id');
      let value = JSON.stringify(this.tier)
      this._tierService.updateTier(id,value).subscribe();
      console.log('you submitted value: ', value); 
      this.toTiers();
  }

  addTier() {
    this._router.navigate(['TierNew']);
  }

  removeTier() {
    let id = this._routeParams.get('id');
    this._tierService.deleteTier(id).subscribe();
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

