import { Router } from "express"
import ProductManager from "../dao/managers/productManager.js"

const viewRouter = Router()
const productManager = new ProductManager()

viewRouter.get('/', async (req, res) => {
    let products = await productManager.getProducts()
    res.render('home', {products})
})
viewRouter.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts', {})
})

export default viewRouter
