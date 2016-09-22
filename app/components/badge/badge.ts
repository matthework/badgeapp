export class Badge {
  _id: string;
  index: number;
  name: string;
  code: string;
  owner: string;
  overview: string;
  focus: string[];
  badgelevels: BadgeLevel[];
  approved: boolean;
  inused: boolean;
  published: boolean;
  status: string;
  timestamp: string;
}

export class BadgeLevel {
  level: number;
  desc: string;
}