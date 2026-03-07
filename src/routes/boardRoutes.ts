import express from "express";
import { createBoard, getBoardDetailsByBoardId, getBoardsByWspId } from "../controllers/boardCtrl.js";
import { validateQueryWspId } from "../middleware/workspaceHandlerMiddleware.js";
import { getBoardDetailsSchema, getWorkspaceBoardsSchema } from "../util/zodSchemas.js";
import { validateBoardId } from "../middleware/boardHandlerMiddleware.js";

const router = express.Router();

router.post("/workspaces/:workspaceId/boards", createBoard);
router.get("/boards", validateQueryWspId(getWorkspaceBoardsSchema), getBoardsByWspId);
router.get("/board/:id", validateBoardId(getBoardDetailsSchema), getBoardDetailsByBoardId)


export default router;

