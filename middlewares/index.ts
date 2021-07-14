import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'
import UserModel from '../models/User'
import { RequestWithUser } from '../types'

export const isAdmin = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    try {
      const decoded: any = jwt.verify(
        req.headers.authorization.split(' ')[1],
        'JWT'
      )
      console.log(decoded)
      if (decoded.role === 'Administrator') {
        next()
      } else {
        return res.status(401).json({ message: 'Unauthorized user' })
      }
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized user' })
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized user' })
  }
}

export const isPatient = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    try {
      const decoded: any = jwt.verify(
        req.headers.authorization.split(' ')[1],
        'JWT'
      )
      if (decoded.role === 'Patient') {
        next()
      } else {
        return res.status(401).json({ message: 'Unauthorized user' })
      }
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized user' })
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
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    try {
      const decoded: any = jwt.verify(
        req.headers.authorization.split(' ')[1],
        'JWT'
      )
      if (decoded.role !== '') {
        next()
      } else {
        return res.status(401).json({ message: 'Unauthorized user' })
      }
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized user' })
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized user' })
  }
}
