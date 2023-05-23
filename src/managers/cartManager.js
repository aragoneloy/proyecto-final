import fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const path = 'DB/carts.json';

export default class CartManager {
  constructor() {
    this.path = path;
  }

  async getCarts() {
    try {
      if (fs.existsSync(path)) {
        const data = await readFile(path, 'utf-8');
        const carts = JSON.parse(data) || [];
        return carts;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(`Error reading carts data: ${error.message}`);
    }
  }

  async createCart() {
    try {
      const carts = await this.getCarts();
      const cartId = carts.length + 1;
      const cart = {
        id: cartId,
        products: [],
      };
      carts.push(cart);
      await writeFile(path, JSON.stringify(carts, null, '\t'));
      return cart;
    } catch (error) {
      throw new Error(`Error creating cart: ${error.message}`);
    }
  }

  async getCartById(cartId) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.id === cartId);
      return cart || null;
    } catch (error) {
      throw new Error(`Error retrieving cart by ID: ${error.message}`);
    }
  }

  async updateCart(cartId, updatedCart) {
    try {
      let carts = await this.getCarts();
      let cartIndex = carts.findIndex((cart) => cart.id === cartId);

      if (cartIndex === -1) {
        return null;
      } else {
        carts[cartIndex] = updatedCart;
        await writeFile(path, JSON.stringify(carts, null, '\t'));
        return updatedCart;
      }
    } catch (error) {
      throw new Error(`Error updating cart: ${error.message}`);
    }
  }

  async deleteCart(cartId) {
    try {
      let carts = await this.getCarts();
      let cartIndex = carts.findIndex((cart) => cart.id === cartId);

      if (cartIndex === -1) {
        return null;
      } else {
        const deletedCart = carts[cartIndex];
        carts.splice(cartIndex, 1);
        await writeFile(path, JSON.stringify(carts, null, '\t'));
        return deletedCart;
      }
    } catch (error) {
      throw new Error(`Error deleting cart: ${error.message}`);
    }
  }
}