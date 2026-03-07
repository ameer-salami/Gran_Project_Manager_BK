import express from "express";
import { createTask } from "../controllers/taskCtrl.js";
import { newTaskRequestSchema } from "../util/zodSchemas.js";
import { validateNewTask } from "../middleware/taskHanlerMiddleware.js";

const router = express.Router();

router.post("/tasks", validateNewTask(newTaskRequestSchema), createTask);

export default router;

