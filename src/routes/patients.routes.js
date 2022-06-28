import {Router} from 'express'

import { index, addNewPatient, deletePatient, profile, validatePatient, createNewControl, registerUser, storeUser, auth, login } from '../controllers/patients.controller'
const router = Router()


router.get('/', index)
router.get('/profile/:runPatient', profile)
router.get('/validatePatient/:runPatient', validatePatient)
router.post('/addNewPatient', addNewPatient)
router.get('/deletePatient/:runPatient', deletePatient)
router.post('/controls', createNewControl)
router.get('/register', registerUser)
router.post('/register', storeUser)
router.get('/login', login)
router.post('/login', auth)

export default router