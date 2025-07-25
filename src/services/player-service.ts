import { Player, CreatePlayerDto, UpdatePlayerDto } from "../models/player";
import { ApiResponse } from "../models/api-response";
import { playerRepository } from "../repositories/player-repository";
import { clubRepository } from "../repositories/club-repository";

class PlayerService {
  async getAllPlayers(): Promise<ApiResponse<Player[]>> {
    try {
      const players = await playerRepository.findAll();
      return {
        success: true,
        data: players,
        message: players.length > 0 ? "Players retrieved successfully" : "No players found"
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to retrieve players"
      };
    }
  }

  async getPlayerById(id: string): Promise<ApiResponse<Player>> {
    try {
      const player = await playerRepository.findById(id);
      
      if (!player) {
        return {
          success: false,
          error: "Player not found"
        };
      }

      return {
        success: true,
        data: player,
        message: "Player retrieved successfully"
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to retrieve player"
      };
    }
  }

  async getPlayersByClub(clubId: string): Promise<ApiResponse<Player[]>> {
    try {
      const club = await clubRepository.findById(clubId);
      
      if (!club) {
        return {
          success: false,
          error: "Club not found"
        };
      }

      const players = await playerRepository.findByClubId(clubId);
      return {
        success: true,
        data: players,
        message: `Players from ${club.name} retrieved successfully`
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to retrieve players"
      };
    }
  }

  async createPlayer(playerData: CreatePlayerDto): Promise<ApiResponse<Player>> {
    try {
      const club = await clubRepository.findById(playerData.clubId);
      if (!club) {
        return {
          success: false,
          error: "Club not found"
        };
      }

      const existingPlayer = await playerRepository.findByShirtNumberAndClub(
        playerData.shirtNumber, 
        playerData.clubId
      );
      
      if (existingPlayer) {
        return {
          success: false,
          error: "Shirt number already taken in this club"
        };
      }

      const newPlayer = await playerRepository.create(playerData);
      return {
        success: true,
        data: newPlayer,
        message: "Player created successfully"
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to create player"
      };
    }
  }

  async updatePlayer(id: string, playerData: UpdatePlayerDto): Promise<ApiResponse<Player>> {
    try {
      if (playerData.clubId) {
        const club = await clubRepository.findById(playerData.clubId);
        if (!club) {
          return {
            success: false,
            error: "Club not found"
          };
        }
      }

      if (playerData.shirtNumber && playerData.clubId) {
        const existingPlayer = await playerRepository.findByShirtNumberAndClub(
          playerData.shirtNumber, 
          playerData.clubId
        );
        
        if (existingPlayer && existingPlayer.id !== id) {
          return {
            success: false,
            error: "Shirt number already taken in this club"
          };
        }
      }

      const updatedPlayer = await playerRepository.update(id, playerData);
      
      if (!updatedPlayer) {
        return {
          success: false,
          error: "Player not found"
        };
      }

      return {
        success: true,
        data: updatedPlayer,
        message: "Player updated successfully"
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to update player"
      };
    }
  }

  async deletePlayer(id: string): Promise<ApiResponse<void>> {
    try {
      const deleted = await playerRepository.delete(id);
      
      if (!deleted) {
        return {
          success: false,
          error: "Player not found"
        };
      }

      return {
        success: true,
        message: "Player deleted successfully"
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to delete player"
      };
    }
  }
}

export const playerService = new PlayerService();
