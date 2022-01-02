import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import connectDB from '../config/db.js'


const connection = await connectDB()

const protect = asyncHandler(async (req,res,next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(token,process.env.TOKEN_SECRET)

      const [row] = await connection.execute('Select * from users where id=?',[decoded.id])
        

        req.user = {
            id : row[0].id,
            firstName : row[0].firstName,
            lastName : row[0].lastName,
            email : row[0].email,
            role : row[0].role
        }
            next()

        } catch (error) {
            res.status(401)
            console.error(error)
            throw new Error('Not authorized - token failed')

        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized - No token')
    }
})

const admin = (req,res,next) => {
    if(req.user && req.user.role==='admin'){
        next()
    }
    else{
        res.status(401)
        throw new Error('Not Authorized as admin')
    }

}

export {protect,admin}