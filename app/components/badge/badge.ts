export class Badge {
  _id: string;
  index: number;
  name: string;
  overview: string;
  badgelevels: BadgeLevel[];
  approved: boolean;
  inused: boolean;
  timestamp: string;
}

export class BadgeLevel {
  level: number;
  desc: string;
}