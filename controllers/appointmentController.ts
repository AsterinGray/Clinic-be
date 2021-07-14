import { Request, Response } from 'express'
import AppointmentModel from '../models/Appointment'
import jwt from 'jsonwebtoken'

export const getAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await AppointmentModel.find()
    res.json(appointment)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getAppointmentsById = async (req: Request, res: Response) => {
  try {
    const appointment = await AppointmentModel.findById(req.params.id)
    res.json(appointment)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getRegistrantsInAppointment = async (
  req: Request,
  res: Response
) => {
  const appointment = await AppointmentModel.findById(req.params.id)

  if (appointment) {
    if (appointment.registrants) {
      const registrants = await appointment.registrants
      res.status(200).json(registrants)
    } else {
      res.status(404).json({ message: 'No registrant' })
    }
  } else {
    res.status(404).json({ message: 'Appointment not found' })
  }
}

export const createAppointment = async (req: Request, res: Response) => {
  const appointment = new AppointmentModel(req.body)
  try {
    const createdAppointment = await appointment.save()
    res.status(201).json(createdAppointment)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const applyAppointment = async (req: Request, res: Response) => {
  const appointment = await AppointmentModel.findById(req.params.id)
  let decoded: any

  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'JWT')
  }

  if (appointment) {
    if (appointment.registrants) {
      if (!appointment.registrants.some((r) => r._id === decoded.id)) {
        if (appointment.registrants.length < appointment.capacity) {
          const apply = await AppointmentModel.findByIdAndUpdate(
            req.params.id,
            { $push: { registrants: decoded.id } },
            { upsert: true, new: true }
          )
          return res.status(200).json(apply)
        } else {
          return res.status(401).json({ message: 'Capacity is full' })
        }
      }
    } else {
      return res.status(404).json({ message: 'You have apply' })
    }
  } else {
    return res.status(404).json({ message: 'Appointment not found' })
  }
}

export const cancelAppointment = async (req: Request, res: Response) => {
  const appointment = await AppointmentModel.findById(req.params.id)
  let decoded: any

  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'JWT')
  }

  if (appointment) {
    if (appointment.registrants) {
      if (!appointment.registrants.some((r) => r._id === decoded.id)) {
        const cancel = await AppointmentModel.findByIdAndDelete(req.params.id, {
          upsert: true,
          new: true,
        })

        return res.status(200).json(cancel)
      }
    } else {
      return res.status(404).json({ message: 'You have not apply' })
    }
  } else {
    return res.status(404).json({ message: 'Appointment not found' })
  }
}

export const updateAppointment = async (req: Request, res: Response) => {
  const id = await AppointmentModel.findById(req.params.id)
  if (!id) return res.status(404).json({ message: 'Appointment not found' })

  try {
    const updatedAppointment = await AppointmentModel.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    )
    res.status(200).json(updatedAppointment)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteAppointment = async (req: Request, res: Response) => {
  const id = await AppointmentModel.findById(req.params.id)
  if (!id) return res.status(404).json({ message: 'Appointment Not Found' })
  try {
    const deletedAppointment = await AppointmentModel.deleteOne({
      _id: req.params.id,
    })
    res.status(200).json(deletedAppointment)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
