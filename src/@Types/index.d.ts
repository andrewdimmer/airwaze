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
  points: { [key: string]: Poi };
  scale1width: number;
  scale1height: number;
  imageName: string;
}

declare interface Poi {
  id: string;
  category: string;
  x: number;
  y: number;
  connected: string[];
  name?: string;
  location?: string;
}
