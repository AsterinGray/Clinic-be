import { Request } from 'express'

export interface User {
  _id: string
  first_name: string
  last_name: string
  age: number
  username: string
  email: string
  password: string
  role: string
}

export interface Appointment {
  doctor: string
  description: string
  registrants?: [User]
  capacity: number
}

export interface RequestWithUser extends Request {
  user: User
}
