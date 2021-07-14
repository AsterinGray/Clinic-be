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
