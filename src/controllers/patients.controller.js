import { get } from 'express/lib/request'
import { send } from 'process'
import {getConnection, sql, queries} from '../database'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


export const index = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllPatients)
    const resultDiagnosticos = await pool.request().query(queries.getAllDianosticos)

    const data = result.recordset
    const dataDiagnosticos = resultDiagnosticos.recordset

    // res.render('pages/customers', {'data': data})
 res.render('customers', {'data': data, 'dataDiagnosticos': dataDiagnosticos})
}

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
    // res.render('pages/customers', {'data': data})
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
    const { runPatient } = req.params;
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('runPatient', runPatient)
    .query(queries.deletePatient)
    res.redirect('/')
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
        res.redirect('/')
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}


export const registerUser = async (req, res) => {
    res.render('register')    
}

export const storeUser = async (req, res) => {
    const data = req.body
    const pool = await getConnection();
    //const { run, name, password, email} = req.body
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
        res.render('register', {'data': 1})
    } else {
    try {
        await pool.request()
        .input('Run', sql.Int, data.run)
        .input('Name', sql.VarChar, data.name)
        .input('Email', sql.VarChar, data.email)
        .input('Password', passwordHash)
        .query(queries.storeUser)
    
        res.redirect('/register')  

} catch (error) {
    res.status(500)
    res.send(error.message)
}
    }    
}

export const login = async (req, res) =>{
    res.render('login', {'error': ''}) 
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

        
        
        ///res.render('login', {'error': ''})
    } else {
        res.render('login', {'error': 'No existe usuario'})
    }

    //console.log(req.body)

}



