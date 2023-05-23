import express from 'express'
import productRouter from './src/routes/products.routes.js';
import cartRouter from './src/routes/carts.routes.js';
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// ---------------------------- instancias del servidor ----------------------------
const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));




// ---------------------------- Rutas ----------------------------

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)



app.listen(8080, ()=> console.log('Servidor escuchando en el puerto 8080'))