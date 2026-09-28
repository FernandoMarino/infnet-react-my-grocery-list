import { Router } from "express";
import userRoutes from '../../modules/users/routes/usersRoutes.js' 
import listsRoutes from '../../modules/ShoppingLists/routes/listsRouter.js'

const router = Router()

router.use('/users', userRoutes)
router.use('/lists', listsRoutes)

export default router