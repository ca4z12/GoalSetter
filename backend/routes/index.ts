import { Router } from "express";
import { goalrouter } from "./goalRoute.routes";

const router = Router();

router.use("/api/goals", goalrouter);

export { router }