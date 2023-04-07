import express from 'express'
import dotenv from 'dotenv'
import { router } from './routes'
import { errorHandler } from './middlewares/errorMiddleware'
import { connectDB } from './config/db'


connectDB()

dotenv.config()

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(errorHandler)

app.use(router)

export { app }
