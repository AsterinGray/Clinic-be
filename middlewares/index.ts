import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import UserModel from '../models/User'
import { RequestWithUser } from '../types'

export const isAdmin = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    try {
      const user = await UserModel.findById(req.user._id)
      if (user) {
        if (user.role === 'Administrator') {
          next()
        } else {
          return res.status(401).json({ message: 'Unauthorized user' })
        }
      } else {
        return res.status(401).json({ message: 'Unauthorized user' })
      }
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized user' })
  }
}

export const isLogged = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    next()
  } else {
    return res.status(401).json({ message: 'Unauthorized user' })
  }
}

export const authMiddleware = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'JWT'
  ) {
    jwt.verify(
      req.headers.authorization.split(' ')[1],
      'RESTFULAPIs',
      (err, decode) => {
        if (err) req.body.user = undefined

        req.body.user = decode
        next()
      }
    )
  } else {
    req.body.user = undefined
    next()
  }
}
