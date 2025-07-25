import { Club, CreateClubDto, UpdateClubDto } from "../models/club";
import { ApiResponse } from "../models/api-response";
import { clubRepository } from "../repositories/club-repository";

class ClubService {
  async getAllClubs(): Promise<ApiResponse<Club[]>> {
    try {
      const clubs = await clubRepository.findAll();
      return {
        success: true,
        data: clubs,
        message: clubs.length > 0 ? "Clubs retrieved successfully" : "No clubs found"
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to retrieve clubs"
      };
    }
  }

  async getClubById(id: string): Promise<ApiResponse<Club>> {
    try {
      const club = await clubRepository.findById(id);
      
      if (!club) {
        return {
          success: false,
          error: "Club not found"
        };
      }

      return {
        success: true,
        data: club,
        message: "Club retrieved successfully"
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to retrieve club"
      };
    }
  }

  async createClub(clubData: CreateClubDto): Promise<ApiResponse<Club>> {
    try {
      const existingClub = await clubRepository.findByName(clubData.name);
      
      if (existingClub) {
        return {
          success: false,
          error: "Club with this name already exists"
        };
      }

      const newClub = await clubRepository.create(clubData);
      return {
        success: true,
        data: newClub,
        message: "Club created successfully"
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to create club"
      };
    }
  }

  async updateClub(id: string, clubData: UpdateClubDto): Promise<ApiResponse<Club>> {
    try {
      if (clubData.name) {
        const existingClub = await clubRepository.findByName(clubData.name);
        if (existingClub && existingClub.id !== id) {
          return {
            success: false,
            error: "Club with this name already exists"
          };
        }
      }

      const updatedClub = await clubRepository.update(id, clubData);
      
      if (!updatedClub) {
        return {
          success: false,
          error: "Club not found"
        };
      }

      return {
        success: true,
        data: updatedClub,
        message: "Club updated successfully"
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to update club"
      };
    }
  }

  async deleteClub(id: string): Promise<ApiResponse<void>> {
    try {
      const deleted = await clubRepository.delete(id);
      
      if (!deleted) {
        return {
          success: false,
          error: "Club not found"
        };
      }

      return {
        success: true,
        message: "Club deleted successfully"
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to delete club"
      };
    }
  }
}

export const clubService = new ClubService();
