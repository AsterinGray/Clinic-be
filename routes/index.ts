import express from 'express'
import {
  applyAppointment,
  cancelAppointment,
  createAppointment,
  deleteAppointment,
  getAppointment,
  getAppointmentsById,
  getRegistrantsInAppointment,
  updateAppointment,
} from '../controllers/appointmentController'
import { login, register } from '../controllers/userController'
import { isAdmin, isPatient } from '../middlewares'

const router: any = express.Router()

router.post('/register', register)
router.post('/login', login)

router.post('/appointment', isAdmin, createAppointment)
router.get('/appointment', isAdmin, getAppointment)
router.get('/appointment/:id', isAdmin, getAppointmentsById)
router.patch('/appointment/:id', isAdmin, updateAppointment)
router.delete('/appointment/:id', isAdmin, deleteAppointment)

router.post('/appointment/:id/apply', isPatient, applyAppointment)
router.post('/appointment/:id/cancel', isPatient, cancelAppointment)
router.get(
  '/appointment/:id/registrant',
  isPatient,
  getRegistrantsInAppointment
)

export default router
