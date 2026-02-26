import express from "express";
import { createBoard, getBoardsByWspId } from "../controllers/boardCtrl.js";
import { validateQueryWspId } from "../middleware/workspaceHandlerMiddleware.js";
import { getWorkspaceBoardsSchema } from "../util/zodSchemasl.js";

const router = express.Router();

router.post("/workspaces/:workspaceId/boards", createBoard);
router.get("/boards", validateQueryWspId(getWorkspaceBoardsSchema), getBoardsByWspId);


export default router;

