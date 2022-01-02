import express from 'express'
import { registerUser, userAuth,editUser } from '../controllers/usersController.js'
import { protect,admin } from '../middleware/authMiddleware.js'


const router= express.Router()


router.post('/login',userAuth)
router.post('/register',registerUser)
router.post('/create',protect,admin,registerUser)
router.put('/edit/:id',protect,admin,editUser)


export default router