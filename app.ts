import express, { Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import jwt from 'jsonwebtoken'

import routes from './routes'
import { authMiddleware } from './middlewares'
import { RequestWithUser } from './types'
import { NextFunction } from 'express-serve-static-core'

const app = express()

mongoose.connect('mongodb://localhost:27017/compfest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Database Connected'))

app.use(cors())
app.use(express.json())
app.use('/', routes)

app.listen(8000)
