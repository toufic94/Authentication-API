import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/usersRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'


dotenv.config()

const app = express()

app.use(express.json())

app.use("/api/users",userRoutes)

app.get("/", (req,res) =>
    res.send("Api is running..."))

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3000

app.listen(port,console.log(`server started in ${process.env.NODE_MOD} module on port ${port} `))