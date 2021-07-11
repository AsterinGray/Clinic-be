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
  registrants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  capacity: {
    type: Number,
    required: true,
  },
})

const AppointmentModel = model<Appointment>('Appointment', AppointmentSchema)

export default AppointmentModel
