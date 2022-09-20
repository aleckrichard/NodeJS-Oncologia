import { Router } from 'express'

const axios = require('axios').default;
import {
    index,
    addNewPatient,
    profile,
    validatePatient,
    createNewControl,
    registerUser,
    storeUser,
    auth,
    login,
    logout,
    patients,
    updatePatientStateByRun,
    searchPatient,
    patientDischarge,
    deleteUser,
    updateUser,
    reports
} from '../controllers/patients.controller'
const router = Router()


router.get('/', index)
router.get('/patients', patients)
router.get('/profile/:runPatient', profile)
router.get('/validatePatient/:runPatient', validatePatient)
router.get('/searchPatient/:searchString', searchPatient)
router.post('/addNewPatient', addNewPatient)
router.get('/updateStatePatient/:runPatient', updatePatientStateByRun)
router.post('/controls', createNewControl)
router.get('/register', registerUser)
router.post('/register', storeUser)
router.get('/login', login)
router.get('/logout', logout)
router.post('/login', auth)
router.get('/register', registerUser)
router.get('/reports', reports)
router.post('/register', storeUser)
router.post('/patientDischarge', patientDischarge)
router.get('/deleteUser/:runUser', deleteUser)
router.post('/updateUser', updateUser)

export default router