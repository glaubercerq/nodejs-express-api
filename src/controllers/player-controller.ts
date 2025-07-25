import { Request, Response } from "express";
import { playerService } from "../services/player-service";
import { CreatePlayerDto, UpdatePlayerDto } from "../models/player";
import { StatusCode } from "../utils/status-code";

export const getAllPlayers = async (req: Request, res: Response) => {
  const result = await playerService.getAllPlayers();
  
  if (result.success) {
    res.status(StatusCode.OK).json(result);
  } else {
    res.status(StatusCode.InternalServerError).json(result);
  }
};

export const getPlayerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await playerService.getPlayerById(id);
  
  if (result.success) {
    res.status(StatusCode.OK).json(result);
  } else {
    res.status(StatusCode.NotFound).json(result);
  }
};

export const getPlayersByClub = async (req: Request, res: Response) => {
  const { clubId } = req.params;
  const result = await playerService.getPlayersByClub(clubId);
  
  if (result.success) {
    res.status(StatusCode.OK).json(result);
  } else {
    res.status(StatusCode.NotFound).json(result);
  }
};

export const createPlayer = async (req: Request, res: Response) => {
  const playerData: CreatePlayerDto = req.body;
  const result = await playerService.createPlayer(playerData);
  
  if (result.success) {
    res.status(StatusCode.Created).json(result);
  } else {
    res.status(StatusCode.BadRequest).json(result);
  }
};

export const updatePlayer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const playerData: UpdatePlayerDto = req.body;
  const result = await playerService.updatePlayer(id, playerData);
  
  if (result.success) {
    res.status(StatusCode.OK).json(result);
  } else {
    const statusCode = result.error === "Player not found" ? StatusCode.NotFound : StatusCode.BadRequest;
    res.status(statusCode).json(result);
  }
};

export const deletePlayer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await playerService.deletePlayer(id);
  
  if (result.success) {
    res.status(StatusCode.OK).json(result);
  } else {
    res.status(StatusCode.NotFound).json(result);
  }
};
