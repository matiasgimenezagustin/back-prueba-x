const express = require('express')
const dotenv = require('dotenv')
const jwt =  require('jsonwebtoken')
const cors = require('cors')

dotenv.config() //Habilita las viariables de entorno

const productRouter = require('./router/productRouter')
const authMiddleware = require('./middlewares/authMiddleware')



const app = express()
const PORT = process.env.PORT || 8081


app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + '/public'))

const secretKey = process.env.SECRET_KEY_JWT

app.use('/api/products/', productRouter)

const users = []

app.post('/register', (req, res) =>{
    console.log(req.body)
    const {username, password} = req.body

    if(users.find((user) => user.username === username)){
        return res.status(400).json({message: 'Username is not available', status: 400})
    }
    const newUser = { username, password}
    users.push(newUser)
    res.status(201).json({message: 'User was created successfully!', status: 201})
})

app.post('/login', (req, res) =>{
    const {username, password} = req.body
    const user = users.find(user => user.username == username && user.password == password)
    if(!user){
        return res.status(401).json({message: 'Invalid credentials', status: 401})
    }
    const token = jwt.sign({username}, secretKey, {expiresIn: '1h'})
    res.status(200).json({accessToken: token, status: 200})

})


app.post('/auth/verify', authMiddleware, (req, res) =>{
    res.status(200).json({status:200, message: 'Valid token'})
})


app.listen(PORT, () =>{
    console.log('El servidor se esta escuhando en http://localhost:' + PORT + '/')
})




/* 

LIBRERIAS:

Express
nodemon
dotenv

EJEMPLO DE RUTA: 

app.get('/fulano', (req, res) =>{
    res.status(200).json({product: product, status: 200, message: 'product found' })
})



=> /api/products

GET => 
recibe el id por params y devuelve el producto 200 'product found'
Si no existe devuelve 404 con un mensaje de error 'not found'
Si falla SQL devuelve un 500 'internal server error'


GET =>
Puede recibir limit por query param
Devuelve todos los productos (limitados si es que hay limite) 200
Si falla SQL devuelve un 500 'internal server error'


POST =>
Recibe un body en JSON con todos los datos para crear un producto ([nombre, precio, stock, descripcion])
Verificaremos que todos los datos existan
Una vez creado devolveremos un 201  'product created'

Si no estan todos los datos devolvemos un '400' 'bad request'
Si falla SQL devuelve un 500 'internal server error'

(
    PROXIMAMENTE... cuando alguien postee algo enviaremos un mail de support a nuestro propio mail 
    que informara acerca del producto creado
)


DELETE =>
recibe el id por params y elimina el producto 200 'product deleted'
Si no existe devuelve 404 con un mensaje de error 'not found'
Si falla SQL devuelve un 500 'internal server error'



PUT


*/


