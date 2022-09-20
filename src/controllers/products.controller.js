import { get } from 'express/lib/request'
import { send } from 'process'
import {getConnection, sql, queries} from '../database'
const jwt = require('jsonwebtoken');


export const getProducts = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query(queries.getAllProducts)
        console.log(result) 
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        .res.send(error.message)
    }   
}


export const createNewProduct = async (req, res) => {
    const { name, description } = req.body
    let { quantity } = req.body
    
    if(name == null || description == null){
        return res.status(400).json({message: 'Bad Request: Please fill all fields'})
    }

    if(quantity == null) quantity = 0

    //Enviar datos a la BD
    try {
        const pool = await getConnection()

        await pool.request()
        .input('name', sql.VarChar, name)
        .input('description', sql.VarChar, description)
        .input('quantity', sql.Int, quantity)
        .query(queries.addNewProduct)
    
        console.log(name, description, quantity)
        res.json({name, description, quantity})
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const getProductById = async (req, res) => {
    const { idRequest } = req.params;
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('id', idRequest)
    .query(queries.getProductById)

    console.log(result)
    res.send(result.recordset[0])
}

export const deleteProductById = async (req, res) => {
    const { idRequest } = req.params;
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('id', idRequest)
    .query(queries.deleteProduct)

    console.log(result)
    res.sendStatus(204)
}


export const getTotalProducts = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
    .request()
    .query(queries.getTotalProducts)

    console.log(result)
    res.json(result.recordset[0][''])
}

export const updateProductById = async (req, res) => {
    const { idRequest } = req.params;
    const {name, description, quantity} = req.body

    if(name == null || description == null || quantity == null){
        return res.status(400).json({message: 'Bad Request: Please fill all fields'})
    }

    const pool = await getConnection()
    await pool
    .request()
    .input('id', sql.Int, idRequest)
    .input('name', sql.VarChar, name)
    .input('description', sql.VarChar, description)
    .input('quantity', sql.Int, quantity)
    .query(queries.updateProductById)

    res.json({name, description, quantity})
}


// Proceso Cuidados Paliativos
export const getAllPatients = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query(queries.getAllPatients)
        //console.log(result) 
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        .res.send(error.message)
    }   
}

export const getPatientById = async (req, res) => {
    const { runPatient } = req.params;
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('runPatient', runPatient)
    .query(queries.getPatientByRun)

    console.log(result)
    res.send(result.recordset[0])
}

export const getAllControls = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query(queries.getAllControls)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        .res.send(error.message)
    }   
}

export const getAllControlsByRun = async (req, res) => {
    const { runPatient } = req.params;
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('runPatient', runPatient)
    .query(queries.getAllControlsByRun)

    console.log(result)
    res.send(result.recordset)
}

export const getControlById = async (req, res) => {
    const { idControl } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input('idControl', idControl)
        .query(queries.getControlById)

        console.log(req.params)
        res.send(result.recordset[0])
    } catch (error) {
        res.status(500)
        .res.send(error.message)
    }
}

export const getPatientPhoenixByRun = async (req, res) => {
    const { runPatient } = req.params;
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('runPatient', runPatient)
    .query(queries.getPatientPhoenixByRun)

    console.log(result)
    res.send(result.recordset[0])
}

export const createNewPatient = async (req, res) => {
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
        res.json({Run, EdadIngreso, FechaIPD, FechaSolicitud, FechaIngreso, EvaIngreso, PsIngreso, Diagnostico, MedicoDeriva, MedicoIngresa, PacientePresente, Conocimiento, Comite, AnalgesiaPrevia, LugarIngreso, UsuarioOncologico, Domicilio, Observaciones})
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const createNewControl = async (req, res) => {
    console.log(req.body)
    const { Run
    , TipoControl
    , Observaciones
    , FechaControl
    , EdadControl
    , FechaRegistro
    , RunResponsable} = req.body
    
    if(Run == null || 
        TipoControl == null
        || Observaciones == null
        || FechaControl == null
        || EdadControl == null
        || FechaRegistro == null
        || RunResponsable == null
        ){
        return res.status(400).json({message: 'Bad Request: Please fill all fields'})
    }

    //Enviar datos a la BD
    try {
        const pool = await getConnection()

        await pool.request()
        .input('Run', sql.Int, Run)
        .input('TipoControl', sql.VarChar, TipoControl)
        .input('Observaciones', sql.VarChar, Observaciones)
        .input('FechaControl', sql.DateTime, FechaControl)
        .input('EdadControl', sql.Int, EdadControl)
        .input('FechaRegistro', sql.DateTime, FechaRegistro)
        .input('RunResponsable', sql.Int, RunResponsable)
        .query(queries.addNewControl)
    
        console.log(Run, TipoControl, Observaciones, FechaControl, EdadControl, FechaRegistro, RunResponsable)
        res.json({Run, TipoControl, Observaciones, FechaControl, EdadControl, FechaRegistro, RunResponsable})
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const deleteControlById = async (req, res) => {
    try {
        const { idControl } = req.params;
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('idControl', idControl)
    .query(queries.deleteControl)

    console.log(result)
    res.status(401).send("Control con ID "+idControl +" Eliminado ")
    
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const updatePatientByRun = async (req, res) => {
    const { runPatient } = req.params;
    const {EdadIngreso
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

    if(EdadIngreso == null
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

    const pool = await getConnection()
    await pool.request()
        .input('runPatient', sql.Int, runPatient)
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
        .query(queries.updatePatientByRun)
    console.log(req.body)
    res.json({runPatient, EdadIngreso, FechaIPD, FechaSolicitud, FechaIngreso, EvaIngreso, PsIngreso, Diagnostico, MedicoDeriva, MedicoIngresa, PacientePresente, Conocimiento, Comite, AnalgesiaPrevia, LugarIngreso, UsuarioOncologico, Domicilio, Observaciones})
}

export const updateControlById = async (req, res) => {
    const { idControl } = req.params;
    const {TipoControl
        , Observaciones
        , FechaControl
        , EdadControl
        , FechaRegistro
        , RunResponsable} = req.body
        
        if(
            TipoControl == null
            || Observaciones == null
            || FechaControl == null
            || EdadControl == null
            || FechaRegistro == null
            || RunResponsable == null
            ){
            return res.status(400).json({message: 'Bad Request: Please fill all fields'})
        }

    const pool = await getConnection()
    await pool.request()
        .input('idControl', sql.Int, idControl)
        .input('TipoControl', sql.VarChar, TipoControl)
        .input('Observaciones', sql.VarChar, Observaciones)
        .input('FechaControl', sql.DateTime, FechaControl)
        .input('EdadControl', sql.Int, EdadControl)
        .input('RunResponsable', sql.Int, RunResponsable)
        .query(queries.updateControlById)
        console.log(req.body)
        res.json(req.body)
}


export const validateUser = async (req, res) => {
    //console.log(req.body)
    const { email, password} = req.body
    
    if(email == null || password == null){
        return res.status(400).json({message: 'Bad Request: Please fill all fields'})
    }
            //Enviar datos a la BD
    try {
        const pool = await getConnection()

        const result = await pool
        .request()
        .input('email', sql.VarChar, email)
        .input('password', sql.VarChar, password)
        .query(queries.validateUser)

        const cantidad = Object.keys(result.recordset).length

        if(cantidad >= 1){
            const {name, run} = result.recordset[0]
            //res.send("cantidad de registros: " + cantidad +" " +name + " " + run)

             // create token
            const token = jwt.sign({
                name: name,
                id: run
            }, process.env.TOKEN_SECRET)
            
            res.send(token)

        }else{
            res.json({"message": "datos incorrectos"})
        }
        console.log(email, password)
        
        
        
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }




}

export const index = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
    .request()
    .query(queries.getAllPatients)

    const data = result.recordset

    // res.render('pages/customers', {'data': data})
 res.render('customers', {'data': data})
}