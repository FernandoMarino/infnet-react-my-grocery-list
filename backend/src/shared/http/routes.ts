import { Router } from "express";
import userRoutes from '../../modules/users/routes/usersRoutes.js' 

const router = Router()

router.use('/users', userRoutes)

export default router