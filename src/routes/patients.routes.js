import {Router} from 'express'

import { index, addNewPatient, deletePatient, profile, validatePatient, createNewControl, registerUser, storeUser, auth, login, logout, patients, updatePatientStateByRun } from '../controllers/patients.controller'
const router = Router()


router.get('/', index)
router.get('/patients', patients)
router.get('/profile/:runPatient', profile)
router.get('/validatePatient/:runPatient', validatePatient)
router.post('/addNewPatient', addNewPatient)
router.get('/deletePatient/:runPatient', deletePatient)
router.get('/updateStatePatient/:runPatient', updatePatientStateByRun)
router.post('/controls', createNewControl)
router.get('/register', registerUser)
router.post('/register', storeUser)
router.get('/login', login)
router.get('/logout', logout)
router.post('/login', auth)
router.get('/login2', (req, res) =>{
    res.render('login2')
})
router.get('/register', registerUser)

router.post('/register', storeUser)

router.get('/home', (req, res) =>{
    res.render('home')
})

export default router