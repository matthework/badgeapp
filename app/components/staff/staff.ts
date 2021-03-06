export class Staff {
  _id: string;
  index: number;
  fname: string;
  lname: string;
  position: string;
  salary: number;
  email: string;
  phone: string;
  userbgroups: UserBGroup[];
  active: boolean;
  brief:string;
  status: string;
  others: string[];
  timestamp: string;
  latestbadge: string;
  latestbadgetime: string;
  latestbset: string;
  latestbsettime: string;
}

export class UserBGroup {
  bid: string;
	badge: string;
	level: number;
  focus: string[];
  approved: boolean;
  ubtimestamp: string;
}