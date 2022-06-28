import sql from 'mssql'
import config from '../config'

const dbSettings = {
    user: config.dbUser,
    password: config.dbPassword,
    server: config.dbServer,
    database: config.dbDatabase,
    options: {
        encrypt: false,
        trustServerCertificate: true,
        }
}

export async function getConnection(){
    try {
        const pool = await sql.connect(dbSettings)
        return pool
        // const result = await pool.request().query('SELECT * FROM dbo.Users')
        // console.log(result)        
    } catch (error) {
        console.error(error)
    }
    
}

export {sql}