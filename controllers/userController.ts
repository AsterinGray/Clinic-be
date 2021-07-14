import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import UserModel from '../models/User'

export const register = async (req: Request, res: Response) => {
  const userData = req.body
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new UserModel({
      ...userData,
      password: hashedPassword,
    })
    const registeredUser = await user.save()
    res.status(201).json(registeredUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email })

    if (user) {
      const isPasswordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      )

      if (isPasswordMatch) {
        return res.status(200).json({
          data: user,
          token: jwt.sign({ id: user.id, role: user.role }, 'JWT'),
        })
      } else {
        return res.status(401).json({
          message: 'Authentication failed',
        })
      }
    }
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' })
  }
}

export const getRole = async (
  req: Request,
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
        return res.status(201).json({ role: 'Patient' })
      } else if (decoded.role === 'Administrator') {
        return res.status(201).json({ role: 'Administrator' })
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
