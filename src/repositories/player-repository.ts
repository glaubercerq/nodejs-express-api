import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Player, CreatePlayerDto, UpdatePlayerDto } from "../models/player";

class PlayerRepository {
  private dataPath = path.join(__dirname, "../data/players.json");

  private async readData(): Promise<Player[]> {
    try {
      const data = await fs.readFile(this.dataPath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private async writeData(players: Player[]): Promise<void> {
    await fs.writeFile(this.dataPath, JSON.stringify(players, null, 2));
  }

  async findAll(): Promise<Player[]> {
    return this.readData();
  }

  async findById(id: string): Promise<Player | null> {
    const players = await this.readData();
    return players.find(player => player.id === id) || null;
  }

  async findByClubId(clubId: string): Promise<Player[]> {
    const players = await this.readData();
    return players.filter(player => player.clubId === clubId);
  }

  async create(playerData: CreatePlayerDto): Promise<Player> {
    const players = await this.readData();
    const newPlayer: Player = {
      id: uuidv4(),
      ...playerData
    };
    players.push(newPlayer);
    await this.writeData(players);
    return newPlayer;
  }

  async update(id: string, playerData: UpdatePlayerDto): Promise<Player | null> {
    const players = await this.readData();
    const index = players.findIndex(player => player.id === id);
    
    if (index === -1) return null;
    
    players[index] = { ...players[index], ...playerData };
    await this.writeData(players);
    return players[index];
  }

  async delete(id: string): Promise<boolean> {
    const players = await this.readData();
    const index = players.findIndex(player => player.id === id);
    
    if (index === -1) return false;
    
    players.splice(index, 1);
    await this.writeData(players);
    return true;
  }

  async findByShirtNumberAndClub(shirtNumber: number, clubId: string): Promise<Player | null> {
    const players = await this.readData();
    return players.find(player => 
      player.shirtNumber === shirtNumber && player.clubId === clubId
    ) || null;
  }
}

export const playerRepository = new PlayerRepository();
