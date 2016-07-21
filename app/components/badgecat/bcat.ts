export class BadgeCat {
	_id: string;
	name: string;
	root: string;
	bgroups: BGroup[];
	others: string[];
	timestamp: string;
}

export class BGroup {
	badge: string;
	levels: number[];
}