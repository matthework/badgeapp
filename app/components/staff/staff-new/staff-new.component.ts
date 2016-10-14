import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Staff,UserBGroup} from '../staff';
import {StaffService} from '../staff.service';
import {Badge,BadgeLevel} from '../../badge/badge';
import {BadgeService} from '../../badge/badge.service';
import {AuthService} from '../../auth/auth.service';
import {BadgeSet} from '../../badgeset/bs';
import {BSService} from '../../badgeset/bs.service';

@Component({
  selector: 'my-staff-new',
  templateUrl: 'app/components/staff/staff-new/staff-new.component.html',
  styleUrls: ['app/components/staff/staff-new/staff-new.component.css']
})

export class StaffNewComponent {
  
  badges: Badge[] = [];
  badgesets: BadgeSet[] = [];
  selectedBadgeSet: BadgeSet;
  active = false;
  nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  selectedUG: UserBGroup;
  addNew = false;
  newBID = "";
  newLevel = 0;
  newFocus = [];
  newStatus = true;
  newL = 0;
  selectedLevel = 0;
  newBSID = "";
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
  focusOptions = [];

  // newBGs = [{bid: "", badge: "", level: 0, status: false, focus: []},
  //           {bid: "", badge: "", level: 0, status: false, focus: []},
  //           {bid: "", badge: "", level: 0, status: false, focus: []},
  //           {bid: "", badge: "", level: 0, status: false, focus: []},
  //           {bid: "", badge: "", level: 0, status: false, focus: []},
  //           {bid: "", badge: "", level: 0, status: false, focus: []},
  //           {bid: "", badge: "", level: 0, status: false, focus: []},
  //           {bid: "", badge: "", level: 0, status: false, focus: []},
  //           {bid: "", badge: "", level: 0, status: false, focus: []},
  //           {bid: "", badge: "", level: 0, status: false, focus: []}];

  statusOptions = ['Active','Inactive'];
  
  newStaff = {index: 0, fname: "", lname: "", status: "Active", position: "", salary: 0, email: "", phone: "", userbgroups: [], active: false, brief:"", others: []}

  constructor(
      private _staffService: StaffService, 
      private _bsService: BSService,
      private _badgeService: BadgeService,
      private _router: Router,
      private auth: AuthService) {}

  ngOnInit() {
    this.getBadges();
    this.getBadgeSets();
  }

  getBadges() {
    this._badgeService.getBadges().subscribe(badges => { this.badges = badges});
  }

  getBadgeSets() {
    this._bsService.getBadgeSets().subscribe(badgesets => { this.badgesets = badgesets});
  }

  getBadgeSetsOptions() {
    var bsOptions = [];
    if (this.badgesets != null) {
      for (var i = 0; i < this.badgesets.length; i++) { 
        if (this.badgesets[i].status=='Accepted') {
          bsOptions.push([this.badgesets[i].name,this.badgesets[i]._id]);
        }
      }
    }
    return bsOptions.sort();
  }

  onSelect(ug: UserBGroup) { 
    this.selectedUG = ug;
  }

  addStaff() {
    for (var i = 0; i < this.newStaff.userbgroups.length; i++) { 
      if (this.newStaff.userbgroups[i].level != 0) {
        this.newStaff.userbgroups[i].level = +this.newStaff.userbgroups[i].level;
      }
    }
    this.newStaff.userbgroups.sort(this.toCompare);
    let value = JSON.stringify(this.newStaff)
    this._staffService.addStaff(value).subscribe();
    console.log('you submitted value: ', value); 
    this.toStaffs();
  }

  addBadgeGroup(level:number) {
    this.newLevel = level;
    this.newStaff.userbgroups.push({bid: this.newBID, badge: this.getBadgeName(this.newBID), level: this.newLevel, focus: this.newFocus, status: true});
    this.newStaff.userbgroups.sort(this.toCompare);
    let value = JSON.stringify(this.newStaff)
    console.log('you submitted value: ', value);
  }

  toCompare(a,b) {
    if (a.badge < b.badge)
      return -1;
    else if (a.badge > b.badge)
      return 1;
    else 
      return 0;
  }

  toStaffs() {
    this._router.navigate(['/staffs']);
    location.reload();
  }

  getDesc(bid:string, l:number) {
    var desc = "";
    if (this.badges != null && l > 0 && bid != "") {
      for (var i = 0; i < this.badges.length; i++) { 
        if (this.badges[i]._id == bid) {
          for (var j = 0; j < this.badges[i].badgelevels.length; j++) { 
            if (this.badges[i].badgelevels[j].level == l) {
              desc = this.badges[i].badgelevels[j].desc;
            }
          }
        }
      }
    }
    return desc;
  }

  getBadgesOptions() {
    var badgesOptions = [];
    if (this.badges != null) {
      for (var i = 0; i < this.badges.length; i++) { 
        if (this.badges[i].status=='Accepted') {
          badgesOptions.push([this.badges[i].name,this.badges[i]._id]);
        }
      }
    }
    return badgesOptions.sort();
  }

  getLevelsOptions(bid: string) {
    var levelsOptions = [];
    if (this.badges != null) {
      for (var i = 0; i < this.badges.length; i++) { 
        if (this.badges[i]._id == bid) {
          for (var j = 0; j < this.badges[i].badgelevels.length; j++) { 
            levelsOptions.push(this.badges[i].badgelevels[j].level);
          }
        }
      }
    }
    return levelsOptions.sort();
  }

  getFocusOptions(bid:string) {
    var focusOptions = [];
    if (this.badges != null) {
        for (var i = 0; i < this.badges.length; i++) { 
            if (this.badges[i]._id == bid && this.badges[i].focus != null) {
              for (var j = 0; j < this.badges[i].focus.length; j++) { 
                focusOptions.push(this.badges[i].focus[j]);
              }
            }
        }
    }
    return focusOptions.sort();
  }
  
  updateChecked(option, event, bg) {
    console.log('event.target.value ' + event.target.value);
    var index = bg.focus.indexOf(option);
    if(event.target.checked) {
      console.log('add');
      if(index === -1) {
        bg.focus.push(option);
      }
    } else {
      console.log('remove');
      if(index !== -1) {
        bg.focus.splice(index, 1);
      }
    }
    //this.checked[option]=event.target.value; // or `event.target.value` not sure what this event looks like
    console.log(bg.focus);
    for (var i = 0; i < this.newStaff.userbgroups.length; i++) { 
      if(this.newStaff.userbgroups[i].bid == this.selectedUG.bid && this.newStaff.userbgroups[i].level == this.selectedUG.level) {
         this.newStaff.userbgroups[i].focus = this.selectedUG.focus;
      }
    }
  }

   updateCheckedNew(option, event, focus) {
      console.log('event.target.value ' + event.target.value);
      var index = focus.indexOf(option);
      if(event.target.checked) {
         console.log('add');
         if(index === -1) {
            focus.push(option);
         }
      } else {
         console.log('remove');
         if(index !== -1) {
            focus.splice(index, 1);
         }
      }
      console.log(focus);
      this.newFocus = focus;
   }

  checkFocus(fc,focus) {
    var result = false;
    if(focus.includes(fc)) {
      result = true;
    }
    return result;
  }

  resetNewValue() {
    this.newBID = "";
    this.newLevel = 0;
    this.newFocus = [];
    this.newStatus = true;
    this.selectedLevel = 0;
  }

 onSelectNewLevel(level:number) {
    this.newL = level;
    // console.log('you submitted value: ', this.newL);
    for (var i = 0; i < this.newStaff.userbgroups.length; i++) { 
       if(this.newStaff.userbgroups[i].bid == this.selectedUG.bid && this.newStaff.userbgroups[i].level == this.selectedUG.level) {
          this.newStaff.userbgroups[i].level = this.newL;
          this.newStaff.userbgroups[i].focus = this.selectedUG.focus;
       }
    }
    // this.updateBadgeSet();
 }

 onSelectedLevel(level:number) {
    this.selectedLevel = level;
 }

  getBLs(bid:string) {
    var bls: BadgeLevel[];
    for (var i = 0; i < this.badges.length; i++) { 
      if(this.badges[i]._id == bid) {
        bls = this.badges[i].badgelevels;
      }
    }
    // console.log('you submitted value: ', bls);
    return bls;
  }

  deleteUserBGroupPop(selectedGroup: UserBGroup) {
    var name = this.newStaff.fname.toUpperCase() + this.newStaff.lname.toUpperCase();
    var badge = this.getBadgeName(selectedGroup.bid).toUpperCase()
    var r = confirm("Are you sure you want to delete "+ badge + " from " + name +" ?");
    if (r == true) {
        this.removeBadgeGroup(selectedGroup);
    }
  }

  removeBadgeGroup(selectedGroup: UserBGroup) {
    let index = this.newStaff.userbgroups.indexOf(selectedGroup);
    this.newStaff.userbgroups.splice(index,1);
    let value = JSON.stringify(this.newStaff)
    console.log('you submitted value: ', value);
  }

  getBadgeName(bid:string) {
    var bname = "";
    for (var i = 0; i < this.badges.length; i++) { 
      if(this.badges[i]._id == bid) {
        bname = this.badges[i].name;
      }
    }
    return bname;
  }

  updateStatus(ubg,event) {
    for (var i = 0; i < this.newStaff.userbgroups.length; i++) { 
      if(this.newStaff.userbgroups[i].bid == ubg.bid) {
         if(event.target.checked) {
            this.newStaff.userbgroups[i].status = true;
         }else {
            this.newStaff.userbgroups[i].status = false;
         }
      }
    }
  }

  loadTemplate(bsid) {
    console.log("bset id: ", bsid);
    this.newStaff.userbgroups = [];
    if(bsid) {
      for (var i = 0; i < this.badgesets.length; i++) { 
        if (this.badgesets[i]._id==bsid && this.badgesets[i].badgegroups.length!=0) {
          for (var j = 0; j < this.badgesets[i].badgegroups.length; j++) { 
            this.newStaff.userbgroups.push({bid: this.badgesets[i].badgegroups[j].bid, badge: this.getBadgeName(this.badgesets[i].badgegroups[j].bid), level: this.badgesets[i].badgegroups[j].level, focus:[], status: true});
          }
        }
      }
    }
  }

  goBack() {
    window.history.back();
  }

}

