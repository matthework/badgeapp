export class Badge {
  _id: string;
  index: number;
  name: string;
  code: string;
  overview: string;
  badgelevels: BadgeLevel[];
  approved: boolean;
  inused: boolean;
  status: string;
  timestamp: string;
}

export class BadgeLevel {
  level: number;
  desc: string;
}