import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Badge} from '../badge';
import {BadgeService} from '../badge.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'my-badge-new',
  templateUrl: 'app/components/badge/badge-new/badge-new.component.html',
  styleUrls: ['app/components/badge/badge-new/badge-new.component.css']
})

export class BadgeNewComponent {

  newFC = "";

  // newbls = [
  //           {label: "I understand... ", level: 1, desc:""},
  //           {label: "I participate... ", level: 2, desc:""},
  //           {label: "I contribute... ", level: 3, desc:""},
  //           {label: "I lead... ", level: 4, desc:""},
  //           {label: "I advise... ", level: 5, desc:""},
  //           {label: "I can teach... ", level: 6, desc:""},
  //           {label: "I plan sophisticated... ", level: 7, desc:""},
  //           {label: "I have achieved wide recognition... ", level: 8, desc:""},
  //           {label: "I am a world leading... ", level: 9, desc:""}];

  labels = [  "I understand... ", 
              "I participate... ", 
              "I contribute... ", 
              "I lead... ", 
              "I advise... ", 
              "I can teach... ", 
              "I plan sophisticated... ",
              "I have achieved wide recognition... ", 
              "I am a world leading... "
            ];

  newbls = [
            {level: 1, desc:""},
            {level: 2, desc:""},
            {level: 3, desc:""},
            {level: 4, desc:""},
            {level: 5, desc:""},
            {level: 6, desc:""},
            {level: 7, desc:""},
            {level: 8, desc:""},
            {level: 9, desc:""}];

  // newbls = [
  //           {level: 1, desc:"I understand "},
  //           {level: 2, desc:"I participate "},
  //           {level: 3, desc:"I contribute "},
  //           {level: 4, desc:"I lead "},
  //           {level: 5, desc:"I advise "},
  //           {level: 6, desc:"I can teach "},
  //           {level: 7, desc:"I plan sophisticated "},
  //           {level: 8, desc:"I have achieved wide recognition "},
  //           {level: 9, desc:"I am a world leading "}];

  statusOptions = ['Accepted','Draft','NotUsed'];

  newBadge = {index: 0, name: "", code: "", overview: "", focus: [], status: "Accepted", badgelevels: this.newbls, approved: true, inused: true};

  constructor(
    private _badgeService: BadgeService, 
    private _router: Router,
    private auth: AuthService) {}

  addBadge() {
    this.newBadge.code = this.newBadge.code.toUpperCase();
    this.newBadge.badgelevels.sort(this.toCompare);
    this.newBadge.focus = this.newBadge.focus.sort();
    let value = JSON.stringify(this.newBadge);
    this._badgeService.addBadge(value).subscribe();
    console.log('you submitted value: ', value); 
    this.toBadges();
  }

  toCompare(a,b) {
    if (a.level < b.level)
      return -1;
    else if (a.level > b.level)
      return 1;
    else 
      return 0;
  }

  toBadges() {
    this._router.navigate(['/badges']);
    location.reload();
  }

  addFC(fc:string) {
    this.newBadge.focus.push(fc.toUpperCase());
    this.newFC = "";
  }

  deleteFC(fc:string) {
    let index = this.newBadge.focus.indexOf(fc);
    this.newBadge.focus.splice(index,1);
  }

  goBack() {
    window.history.back();
  }
  
}



