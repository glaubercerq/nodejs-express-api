import { Request, Response } from "express";
import { clubService } from "../services/club-service";
import { CreateClubDto, UpdateClubDto } from "../models/club";
import { StatusCode } from "../utils/status-code";

export const getAllClubs = async (req: Request, res: Response) => {
  const result = await clubService.getAllClubs();
  
  if (result.success) {
    res.status(StatusCode.OK).json(result);
  } else {
    res.status(StatusCode.InternalServerError).json(result);
  }
};

export const getClubById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await clubService.getClubById(id);
  
  if (result.success) {
    res.status(StatusCode.OK).json(result);
  } else {
    res.status(StatusCode.NotFound).json(result);
  }
};

export const createClub = async (req: Request, res: Response) => {
  const clubData: CreateClubDto = req.body;
  const result = await clubService.createClub(clubData);
  
  if (result.success) {
    res.status(StatusCode.Created).json(result);
  } else {
    res.status(StatusCode.BadRequest).json(result);
  }
};

export const updateClub = async (req: Request, res: Response) => {
  const { id } = req.params;
  const clubData: UpdateClubDto = req.body;
  const result = await clubService.updateClub(id, clubData);
  
  if (result.success) {
    res.status(StatusCode.OK).json(result);
  } else {
    const statusCode = result.error === "Club not found" ? StatusCode.NotFound : StatusCode.BadRequest;
    res.status(statusCode).json(result);
  }
};

export const deleteClub = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await clubService.deleteClub(id);
  
  if (result.success) {
    res.status(StatusCode.OK).json(result);
  } else {
    res.status(StatusCode.NotFound).json(result);
  }
};
