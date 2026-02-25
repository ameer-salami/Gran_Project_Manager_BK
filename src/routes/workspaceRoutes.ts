import express from "express";
import { createWorkspace } from "../controllers/workspaceCtrl.js";

const router = express.Router();

router.post("/workspaces", createWorkspace);

export default router;

