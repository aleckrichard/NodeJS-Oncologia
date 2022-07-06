import { get } from 'express/lib/request'
import { send } from 'process'
import {getConnection, sql, queries} from '../database'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')




export const profile = async (req, res) => {
    const { runPatient } = req.params;
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('runPatient', runPatient)
    .query(queries.getPatientByRun)

    const resultControls = await pool.request()
    .input('runPatient', runPatient)
    .query(queries.getAllControlsByRun)

    const dataControls = resultControls.recordset
    const data = result.recordset[0]
    console.log(dataControls)
    // res.render('pages/patients', {'data': data})
 res.render('profile', {'data': data, 'dataControls': dataControls})
}

export const validatePatient = async (req, res) => {
    const { runPatient } = req.params;
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('runPatient', runPatient)
    .query(queries.getPatientPhoenixByRun)
    const data = result.recordset[0]
    if (data) {
        console.log(data)
        res.send(data)
    }else{
        console.log("No ha datos")
    res.json({message: 'resultado'})
    }
    
}

export const searchPatient = async (req, res) => {
    const { searchString } = req.params;
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('Busqueda', searchString)
    .query(queries.searchPatient)
    const data = result.recordset
    if (data != "") {
        res.send(data)
    }else{
        console.log("No ha datos")
    res.json({message: 'error'})
    }
    
}

export const addNewPatient = async (req, res) => {
    const { Run
    , EdadIngreso
    , FechaIPD
    , FechaSolicitud
    , FechaIngreso
    , EvaIngreso
    , PsIngreso
    , Diagnostico
    , MedicoDeriva
    , MedicoIngresa
    , PacientePresente
    , Conocimiento
    , Comite
    , AnalgesiaPrevia
    , LugarIngreso
    , UsuarioOncologico
    , Domicilio
    , Observaciones } = req.body
    //let { quantity } = req.body
    
    if(Run == null || 
        EdadIngreso == null
        || FechaIPD == null
        || FechaSolicitud == null
        || FechaIngreso == null
        || EvaIngreso == null
        || PsIngreso == null
        || Diagnostico == null
        || MedicoDeriva == null
        || MedicoIngresa == null
        || PacientePresente == null
        || Conocimiento == null
        || Comite == null
        || AnalgesiaPrevia == null
        || LugarIngreso == null
        || UsuarioOncologico == null
        || Domicilio == null
        || Observaciones == null
        ){
        return res.status(400).json({message: 'Bad Request: Please fill all fields'})
    }

    //Enviar datos a la BD
    try {
        const pool = await getConnection()

        await pool.request()
        .input('Run', sql.Int, Run)
        .input('EdadIngreso', sql.Int, EdadIngreso)
        .input('FechaIPD', sql.DateTime, FechaIPD)
        .input('FechaSolicitud', sql.DateTime, FechaSolicitud)
        .input('FechaIngreso', sql.DateTime, FechaIngreso)
        .input('EvaIngreso', sql.VarChar, EvaIngreso)
        .input('PsIngreso', sql.VarChar, PsIngreso)
        .input('Diagnostico', sql.VarChar, Diagnostico)
        .input('MedicoDeriva', sql.VarChar, MedicoDeriva)
        .input('MedicoIngresa', sql.VarChar, MedicoIngresa)
        .input('PacientePresente', sql.VarChar, PacientePresente)
        .input('Conocimiento', sql.VarChar, Conocimiento)
        .input('Comite', sql.VarChar, Comite)
        .input('AnalgesiaPrevia', sql.VarChar, AnalgesiaPrevia)
        .input('LugarIngreso', sql.VarChar, LugarIngreso)
        .input('UsuarioOncologico', sql.VarChar, UsuarioOncologico)
        .input('Domicilio', sql.VarChar, Domicilio)
        .input('Observaciones', sql.VarChar, Observaciones)
        .query(queries.addNewPatient)
    
        console.log(Run, EdadIngreso, FechaIPD, FechaSolicitud, FechaIngreso, EvaIngreso, PsIngreso, Diagnostico, MedicoDeriva, MedicoIngresa, PacientePresente, Conocimiento, Comite, AnalgesiaPrevia, LugarIngreso, UsuarioOncologico, Domicilio, Observaciones)
        //res.json({message: 'paciente creado con éxito'})
        res.redirect('/')
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}


export const deletePatient = async (req, res) => {
    const { IdCuidadosPaliativos } = req.params;
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('IdCuidadosPaliativos', IdCuidadosPaliativos)
    .query(queries.deletePatient)
    res.redirect('/patients')
}

export const createNewControl = async (req, res) => {
    console.log(req.body)
    const { runControl
    , tipoControl
    , observacionControl
    , fechaControl
    , runResponsable} = req.body
    
    if(runControl == null || 
        tipoControl == null
        || observacionControl == null
        || fechaControl == null
        || runResponsable == null
        ){
        return res.status(400).json({message: 'Bad Request: Please fill all fields'})
    }

    //Enviar datos a la BD
    try {
        const pool = await getConnection()

        await pool.request()
        .input('Run', sql.Int, runControl)
        .input('TipoControl', sql.VarChar, tipoControl)
        .input('Observaciones', sql.VarChar, observacionControl)
        .input('FechaControl', sql.DateTime, fechaControl)
        .input('RunResponsable', sql.Int, runResponsable)
        .query(queries.addNewControl)
    
        console.log(runControl, tipoControl, observacionControl, fechaControl, runResponsable)
        res.redirect('/patients')
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const patientDischarge = async (req, res) => {
    console.log(req.body)
    const { runAltaPaciente, tipoEstado, motivoAlta } = req.body
    
    if(runAltaPaciente == null || tipoEstado == null || motivoAlta == null){
        return res.status(400).json({message: 'Bad Request: Please fill all fields'})
    }else{
    //Enviar datos a la BD
    try {
        const pool = await getConnection()

        if (tipoEstado != 2) {
            //ACTUALIZA COLUMNA Estado 1 o 0
            await pool.request()
            .input('Run', sql.Int, runAltaPaciente)
            .input('tipoEstado', sql.Int, tipoEstado)
            .input('motivoAlta', sql.VarChar, motivoAlta)
            .query(queries.setpatientDischarge)     
            res.redirect('/patients')
        } else {
            //ACTUALIZA COLUMNA Fallecido A 1
            await pool.request()
            .input('Run', sql.Int, runAltaPaciente)
            .query(queries.setpatientDeceased)       
            res.redirect('/patients')
        }
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
    }

}


export const registerUser = async (req, res) => {
    const pool = await getConnection();
    const resultUsers = await pool.request().query(queries.getAllUsers)

    const datadataUsers = resultUsers.recordset

    if(req.session.loggedin == true){
        res.render('register', {'dataUsers': datadataUsers, 'error': ''})
    }else{
        res.redirect('/login')
    }

    //  res.render('register', {'error': ''}) 
}

export const storeUser = async (req, res) => {
    const data = req.body
    const pool = await getConnection();
    const passwordHash = await bcrypt.hash(data.password, 12)
    
    if(data.run == null || 
        data.name == null
        || data.password == null
        || data.email == null
        ){
        return res.status(400).json({message: 'Bad Request: Please fill all fields'})
    }


    const resultUser = await pool.request()
    .input('Email', data.email)
    .query(queries.getUserbyEmail)

    const quantityUser = Object.keys(resultUser.recordset).length
    console.log(quantityUser)

    if (quantityUser > 0) {
        console.log(quantityUser)
        res.render('register', {'error': 'El usuario ya existe'})
    } else {
    try {
        await pool.request()
        .input('Run', sql.Int, data.run)
        .input('Name', sql.VarChar, data.name)
        .input('Email', sql.VarChar, data.email)
        .input('Password', passwordHash)
        .query(queries.storeUser)
    
        res.redirect('/login')  

} catch (error) {
    res.status(500)
    res.send(error.message)
}
    }    
}

export const login = async (req, res) =>{
    if(req.session.loggedin != true){
        res.render('login', {'error': ''}) 
    }else{
        res.redirect('/')
    }
    
}

export const auth = async (req, res) =>{
    const data = req.body
    const pool = await getConnection();

    const resultUser = await pool.request()
    .input('Email', data.email)
    .query(queries.getUserbyEmail)

    //console.log(resultUser.recordset[0].password)
    
    const quantityUser = Object.keys(resultUser.recordset).length
    if (quantityUser > 0) {
        bcrypt.compare(data.password, resultUser.recordset[0].password, (err, isMatch)=>{
            if(isMatch == false){
                res.render('login', {'error': 'Contraseña incorrecta'})
            }else{
                req.session.loggedin = true
                req.session.name = resultUser.recordset[0].name
                res.redirect('/')
            }
        })
    } else {
        res.render('login', {'error': 'No existe el usuario'})
    }
}

export const logout = async(req, res) => {
    if(req.session.loggedin == true){
        req.session.destroy()
    }
        res.redirect('/login')
}

export const index = async (req, res) => {
    const pool = await getConnection();
    const resultTotalsDashboard = await pool.request().query(queries.getTotalsDashboard)
    const resultQuantityControls = await pool.request().query(queries.getQuantityControls)
    const resultLastControls = await pool.request().query(queries.getLastControls)
    const resultQuantityControlsByDate = await pool.request().query(queries.getQuantityControlsByDate)

    const dataTotalsDashboard = resultTotalsDashboard.recordset[0]
    const dataQuantityControls =  resultQuantityControls.recordset
    const dataLastControls =  resultLastControls.recordset
    const dataQuantityControlsByDate =  resultQuantityControlsByDate.recordset

    if(req.session.loggedin == true){
        res.render('home', {'dataTotalsDashboard': dataTotalsDashboard, 'dataQuantityControls': dataQuantityControls, 'dataLastControls': dataLastControls, 'dataQuantityControlsByDate': dataQuantityControlsByDate, 'userName': req.session.name})
    }else{
        res.redirect('/login')
    }
}

export const patients = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllPatients)
    const resultDiagnosticos = await pool.request().query(queries.getAllDianosticos)

    const data = result.recordset
    const dataDiagnosticos = resultDiagnosticos.recordset

    if(req.session.loggedin == true){
        res.render('patients', {'data': data, 'dataDiagnosticos': dataDiagnosticos, 'userName': req.session.name})
    }else{
        res.redirect('/login')
    }
}

export const updatePatientStateByRun = async (req, res) => {
    const { runPatient } = req.params;
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('Run', runPatient)
    .query(queries.updatePatientStateByRun)
    res.redirect('/patients')
}

