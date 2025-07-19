import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import UserRoute from '../routes/UserRoute'

// middleware
const app = express()
app.use(cookieParser())
app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true
}))
app.use(express.json())
app.use(UserRoute)
app.disable('x-powered-by')
dotenv.config()


const PORT = parseInt(process.env.PORT || '3000');
const MONGO_URI = process.env.MONGO_URI;

mongoose
   .connect(MONGO_URI!)
   .then(() => {
      console.log('Connected to MongoDB')

      // Start Server
      app.listen(PORT, '0.0.0.0', () => {
         console.log(`Server is running on port ${PORT}`)
      })
   })
   .catch((err) => {
      console.log(err)
   })

