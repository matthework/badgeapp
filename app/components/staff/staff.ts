export class Staff {
  _id: string;
  index: number;
  fname: string;
  lname: string;
  position: string;
  salary: string;
  email: string;
  phone: string;
  badgegroups: BadgeGroup[];
  others: string[];
  timestamp: string;
}

export class BadgeGroup {
	badge: string;
	level: number;
}