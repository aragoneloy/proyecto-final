import CartManager from "../managers/cartManager.js";
import ProductManager from "../managers/productManager.js";
import Joi from "joi";

const schema = Joi.object({
    id: Joi.number().required(),
    quantity: Joi.number()
})

class CartController {
  constructor() {
    this.cartManager = new CartManager();
    this.ProductManager = new ProductManager();
    this.newCart = this.newCart.bind(this)
    this.getCart = this.getCarts.bind(this)
    this.getCartById = this.getCartById.bind(this)
    this.updateCart = this.updateCart.bind(this)
    this.deleteCart = this.deleteCart.bind(this)
  }
  
  async getCarts(req, res) {
    try {
      const carts = await this.cartManager.getCarts();
      res.json(carts);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  async getCartById(req, res) {
    try {
      const cartId = Number(req.params.cartId);
      const cart = await this.cartManager.getCartById(cartId);

      if (!cart) {
        return res.status(404).send('Cart not found');
      }

      res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  async newCart(req, res) {
    try {
      const cart = await this.cartManager.createCart();
      res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  async updateCart(req, res) {
    try {
      const cartId = Number(req.params.cartId);
      const productId = Number(req.params.productId);
  
      if (isNaN(productId)) {
        return res.status(400).send('Invalid product');
      }
  
      const cart = await this.cartManager.getCartById(cartId);
      const product = await this.ProductManager.getProductById(productId)
  
      if (!cart) {
        return res.status(404).send('Cart not found');
      }
      
      if(!product) {
        return res.status(404).send('Product not found');
      }

      const productIndex = cart.products.findIndex((item) => item.productId === productId);
  
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ productId, quantity: 1 });
      }
  
      const updatedCartResult = await this.cartManager.updateCart(cartId, cart);
  
      if (!updatedCartResult) {
        return res.status(404).send('Cart not found');
      }
  
      res.json(updatedCartResult);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }
  
  

  async deleteCart(req, res) {
    try {
      const cartId = Number(req.params.cartId);
      const deletedCart = await this.cartManager.deleteCart(cartId);

      if (!deletedCart) {
        return res.status(404).send('Cart not found');
      }

      res.json(deletedCart);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }
}

export default CartController;
