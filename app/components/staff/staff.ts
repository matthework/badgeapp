export class Staff {
  _id: string;
  index: number;
  fname: string;
  lname: string;
  position: string;
  salary: number;
  email: string;
  phone: string;
  badgegroups: BadgeGroup[];
  active: boolean;
  others: string[];
  timestamp: string;
}

export class BadgeGroup {
	badge: string;
	level: number;
}