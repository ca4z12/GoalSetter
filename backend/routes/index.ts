import { Router } from "express"
import { goalrouter } from "./goal.routes"
import { userRoutes } from "./user.routes"

const router = Router()

router.use("/api/goals", goalrouter)
router.use("/api/users", userRoutes)

export { router }