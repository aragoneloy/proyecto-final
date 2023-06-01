import express from 'express'
import handlebars from 'express-handlebars';
import productRouter from './src/routes/products.routes.js';
import cartRouter from './src/routes/carts.routes.js';
import path from 'path'
import __dirname from './src/utils.js';
import viewsRouter from './src/routes/views.routes.js';
import { createServer } from "http";
import { Server } from "socket.io";
import ProductManager from './src/managers/productManager.js';


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });




//--------------------------- DB ----------------------------
// importo los productos de la base de datos para poder enviarlos por websocket(al agregar productos no se actualiza en la base de datos)
const productManager = new ProductManager()
const DB_PRODUCTS = await productManager.getProducts()


// ---------------------------- instancias del servidor ----------------------------


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
httpServer.listen(8080, ()=>{
    console.log('Escuchando en el puerto 8080')
});

io.on("connection", async (socket) => {
    console.log(`a user connected ${socket.id}`);
    
    socket.emit('from-server-products', DB_PRODUCTS)

    socket.on('from-client-product', async product =>{
            
        DB_PRODUCTS.push(product)
            
        socket.emit('from-server-productos', DB_PRODUCTS)
    })
});