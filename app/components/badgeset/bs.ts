export class BadgeSet {
	_id: string;
	index: number;
	name: string;
	badgegroups: BadgeGroup[];
	tier: number;
	grade: string;
	pay: number;
	tags: string[];
	approved: boolean;
  	inused: boolean;
  	status: string;
	others: string[];
	timestamp: string;
}

export class BadgeGroup {
	bid: string;
	badge: string;
	level: number;
	focus: string[];
	iscore: boolean;
}