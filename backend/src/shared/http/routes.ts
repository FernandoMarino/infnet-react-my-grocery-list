import { Router } from "express";
import userRoutes from '../../modules/users/routes/usersRoutes.js' 
import storeRoutes from '../../modules/stores/routes/storeRoutes.js'

const router = Router()

router.use('/users', userRoutes)
router.use('/stores', storeRoutes)

export default router