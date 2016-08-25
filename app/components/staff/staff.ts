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
  others: string[];
  timestamp: string;
}

export class UserBGroup {
	badge: string;
	level: number;
  status: boolean;
}