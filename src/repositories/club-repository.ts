import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Club, CreateClubDto, UpdateClubDto } from "../models/club";

class ClubRepository {
  private dataPath = path.join(__dirname, "../data/clubs.json");

  private async readData(): Promise<Club[]> {
    try {
      const data = await fs.readFile(this.dataPath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private async writeData(clubs: Club[]): Promise<void> {
    await fs.writeFile(this.dataPath, JSON.stringify(clubs, null, 2));
  }

  async findAll(): Promise<Club[]> {
    return this.readData();
  }

  async findById(id: string): Promise<Club | null> {
    const clubs = await this.readData();
    return clubs.find(club => club.id === id) || null;
  }

  async create(clubData: CreateClubDto): Promise<Club> {
    const clubs = await this.readData();
    const newClub: Club = {
      id: uuidv4(),
      ...clubData
    };
    clubs.push(newClub);
    await this.writeData(clubs);
    return newClub;
  }

  async update(id: string, clubData: UpdateClubDto): Promise<Club | null> {
    const clubs = await this.readData();
    const index = clubs.findIndex(club => club.id === id);
    
    if (index === -1) return null;
    
    clubs[index] = { ...clubs[index], ...clubData };
    await this.writeData(clubs);
    return clubs[index];
  }

  async delete(id: string): Promise<boolean> {
    const clubs = await this.readData();
    const index = clubs.findIndex(club => club.id === id);
    
    if (index === -1) return false;
    
    clubs.splice(index, 1);
    await this.writeData(clubs);
    return true;
  }

  async findByName(name: string): Promise<Club | null> {
    const clubs = await this.readData();
    return clubs.find(club => club.name.toLowerCase() === name.toLowerCase()) || null;
  }
}

export const clubRepository = new ClubRepository();
