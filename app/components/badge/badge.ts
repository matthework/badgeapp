export class Badge {
  _id: string;
  index: number;
  name: string;
  code: string;
  overview: string;
  badgelevels: BadgeLevel[];
  tags: string[];
  approved: boolean;
  inused: boolean;
  timestamp: string;
}

export class BadgeLevel {
  level: number;
  desc: string;
}