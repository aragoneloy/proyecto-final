import express from 'express'
import handlebars from 'express-handlebars';
import productRouter from './src/routes/products.routes.js';
import cartRouter from './src/routes/carts.routes.js';
import path from 'path'
import __dirname from './src/utils.js';
import viewsRouter from './src/routes/views.routes.js';
import { Server } from 'socket.io';
import { createServer } from 'http';

// ---------------------------- instancias del servidor ----------------------------
const app = express();
const httpServer = createServer(app)
const io = new Server(httpServer, {})

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')));


// ---------------------------- Rutas ----------------------------

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)

// ---------------------------- View engine ----------------------------
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

//----------------------- Server ------------------------------
httpServer.listen(8080, () =>  {
    console.log(`servidor corriendo en el puerto 8080`)
    } );

// ---------------------------- Socket io --------------------------
io.on('connection', (socket)=>{
    console.log(`Nuevo cliente conectado!`);

})