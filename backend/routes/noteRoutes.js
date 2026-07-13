import { Router } from "express";
import protect from "../middleware/auth.js";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  toggleFavorite
} from "../controllers/noteController.js";

const router = Router();

router.use(protect);

router.get("/", getNotes);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
router.patch("/:id/favorite", toggleFavorite);

export default router;
