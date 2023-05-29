import { Router } from "express"
import ProductManager from "../managers/productManager.js"

const viewRouter = Router()
const productManager = new ProductManager()

viewRouter.get('/', async (req, res) => {
    let products = await productManager.getProducts()
    res.render('realTimeProducts', {})
})

export default viewRouter
