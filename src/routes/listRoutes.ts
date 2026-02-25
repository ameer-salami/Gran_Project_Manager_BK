import express from "express";
import { createList } from "../controllers/listCtrl.js";

const router = express.Router();

router.post("/workspaces/:workspaceId/lists", createList);

export default router;

