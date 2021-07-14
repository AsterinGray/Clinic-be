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
import { login, register, getRole } from '../controllers/userController'
import { isAdmin, isLogged, isPatient } from '../middlewares'

const router: any = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/role', getRole)

router.get('/appointment', isLogged, getAppointment)
router.get('/appointment/:id', isLogged, getAppointmentsById)

router.post('/appointment', isAdmin, createAppointment)
router.patch('/appointment/:id', isAdmin, updateAppointment)
router.delete('/appointment/:id', isAdmin, deleteAppointment)
router.get('/appointment/:id/registrant', isAdmin, getRegistrantsInAppointment)

router.post('/appointment/:id/apply', isPatient, applyAppointment)
router.post('/appointment/:id/cancel', isPatient, cancelAppointment)

export default router
