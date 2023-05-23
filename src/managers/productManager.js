import fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const path = 'DB/products.json';

export default class ProductManager {
  constructor() {
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(path)) {
        const data = await readFile(path, 'utf-8');
        const products = JSON.parse(data) || [];
        return products;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(`Error reading products data: ${error.message}`);
    }
  }

  async addProduct({ title, description, category, price, thumbnail, code, stock }) {
    try {
      const product = {
        title,
        description,
        category,
        price,
        thumbnail,
        code,
        stock,
        status: true,
      };

      const products = await this.getProducts();
      const newProdCode = product.code;
      const existingCodes = new Set(products.map((producto) => producto.code));

      if (existingCodes.has(newProdCode)) {
        throw new Error('Codigo de producto ya existente');
      }

      if (!title || !description || !price || !code || !stock || !category) {
        throw new Error('Faltan completar campos obligatorios');
      } else {
        function generateProductId(products) {
          return products.length === 0 ? 1 : products[products.length - 1].id + 1;
        }

        const productId = generateProductId(products);
        product.id = productId;
      }

      products.push(product);
      console.log(`Se ha agregado ${product.title} exitosamente`);
      await writeFile(path, JSON.stringify(products, null, '\t'));
    } catch (error) {
      throw new Error(`Error adding product: ${error.message}`);
    }
  }

  async getProductById(productId) {
    try {
      const products = await this.getProducts();
      const product = products.find((product) => product.id === productId);
      return product || null;
    } catch (error) {
      throw new Error(`Error retrieving product by ID: ${error.message}`);
    }
  }

  async updateProduct(productId, update) {
    try {
      let products = await this.getProducts();
      let productIndex = products.findIndex((p) => p.id === productId);

      if (productIndex === -1) {
        return "elemento no encontrado";
      } else {
        products[productIndex] = { id: productId, ...update };
        await writeFile(path, JSON.stringify(products, null, '\t'));
        return { id: productId, ...update };
      }
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  async deleteProduct(productId) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((product) => product.id === productId);

      if (productIndex === -1) {
        return 'elemento no encontrado';
      } else {
        products.splice(productIndex, 1);
        await writeFile(path, JSON.stringify(products, null, '\t'));
        return 'elemento eliminado';
      }
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }
}











