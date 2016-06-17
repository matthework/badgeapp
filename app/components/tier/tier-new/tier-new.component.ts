import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Router} from 'angular2/router';
import {Tier} from '../tier';
import {TierService} from '../tier.service';
import {Validators,FormBuilder,ControlGroup,AbstractControl,Control} from 'angular2/common';

@Component({
  selector: 'my-tier-new',
  templateUrl: 'app/components/tier/tier-new/tier-new.component.html',
  styleUrls: ['app/components/tier/tier-new/tier-new.component.css']
})

export class TierNewComponent {

  newGrades = [0, 0, 0, 0, 0, 0]

  newTier = {index: 0, tier: 0, grades: this.newGrades, judgement: "", expertise: ""}

  constructor(
      private _tierService: TierService, 
      private _router: Router,
      private _routeParams: RouteParams) {}

  addTier() {
    // this.newTier.grades = this.newTier.grades.filter(this.checkEmpty);
    let value = JSON.stringify(this.newTier)
    this._tierService.addTier(value).subscribe();
    console.log('you submitted value: ', value); 
    this.toTiers();
  }

  toTiers() {
    this._router.navigate(['Tiers']);
    // location.reload();
  }

  goBack() {
    window.history.back();
  }

}

