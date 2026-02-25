import express from "express";
// import { createWorkspace } from "../controllers/workspaceCtrl.js";
import { createBoard } from "../controllers/boardCtrl.js";

const router = express.Router();

router.post("/workspaces/:workspaceId/boards", createBoard);

export default router;

