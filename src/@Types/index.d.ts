declare enum CATEGORY {
  "Food",
  "Gate",
  "Hallway",
  "Information and Services",
  "Luggage Claim",
  "Parking and Transportation",
  "Restroom",
  "Shopping"
}

declare interface Airport {
  name: string;
  code: string;
  points: { [key: any]: Poi };
}

declare interface Poi {
  [key: string]: {
    id: string;
    category: CATEGORY;
    x: number;
    y: number;
    connected: string[];
    name?: string;
    location?: string;
  };
}
