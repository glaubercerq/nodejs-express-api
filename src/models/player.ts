export interface Player {
  id: string;
  name: string;
  age: number;
  position: string;
  nationality: string;
  clubId: string;
  shirtNumber: number;
  marketValue: number;
  height: number;
  weight: number;
}

export interface CreatePlayerDto {
  name: string;
  age: number;
  position: string;
  nationality: string;
  clubId: string;
  shirtNumber: number;
  marketValue: number;
  height: number;
  weight: number;
}

export interface UpdatePlayerDto {
  name?: string;
  age?: number;
  position?: string;
  nationality?: string;
  clubId?: string;
  shirtNumber?: number;
  marketValue?: number;
  height?: number;
  weight?: number;
}
