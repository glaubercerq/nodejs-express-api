import { Router } from "express";
import {
  getAllClubs,
  getClubById,
  createClub,
  updateClub,
  deleteClub
} from "../controllers/club-controller";
import {
  getAllPlayers,
  getPlayerById,
  getPlayersByClub,
  createPlayer,
  updatePlayer,
  deletePlayer
} from "../controllers/player-controller";

const router = Router();

router.get("/clubs", getAllClubs);
router.get("/clubs/:id", getClubById);
router.post("/clubs", createClub);
router.put("/clubs/:id", updateClub);
router.delete("/clubs/:id", deleteClub);

router.get("/players", getAllPlayers);
router.get("/players/:id", getPlayerById);
router.get("/clubs/:clubId/players", getPlayersByClub);
router.post("/players", createPlayer);
router.put("/players/:id", updatePlayer);
router.delete("/players/:id", deletePlayer);

export { router };
