import express from 'express'
import config from './config'
import cors from 'cors'
import path from 'path'
import session from 'express-session'
// import productsRoutes from './routes/products.routes'
import productsRoutes from './routes/patients.routes'

const app = express()

//settings
app.set('port', config.port || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))



//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(productsRoutes)

export default app