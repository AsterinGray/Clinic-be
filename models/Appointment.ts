import { Schema, model } from 'mongoose'
import { Appointment } from '../types'

const AppointmentSchema = new Schema<Appointment>({
  doctor: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  registrants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})

const AppointmentModel = model<Appointment>('Appointment', AppointmentSchema)

export default AppointmentModel
