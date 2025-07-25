export interface Club {
  id: string;
  name: string;
  country: string;
  foundedYear: number;
  stadium: string;
  capacity: number;
  coach: string;
  website?: string;
}

export interface CreateClubDto {
  name: string;
  country: string;
  foundedYear: number;
  stadium: string;
  capacity: number;
  coach: string;
  website?: string;
}

export interface UpdateClubDto {
  name?: string;
  country?: string;
  foundedYear?: number;
  stadium?: string;
  capacity?: number;
  coach?: string;
  website?: string;
}
