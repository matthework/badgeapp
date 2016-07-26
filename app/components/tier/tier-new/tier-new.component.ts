import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Tier} from '../tier';
import {TierService} from '../tier.service';

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
      private _router: Router) {}

  addTier() {
    // this.newTier.grades = this.newTier.grades.filter(this.checkEmpty);
    let value = JSON.stringify(this.newTier)
    this._tierService.addTier(value).subscribe();
    console.log('you submitted value: ', value); 
    this.toTiers();
  }

  toTiers() {
    this._router.navigate(['/tiers']);
    // location.reload();
  }

  goBack() {
    window.history.back();
  }

}

