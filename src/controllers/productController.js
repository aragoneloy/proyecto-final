import ProductManager from "../managers/productManager.js";
import Joi from "joi";

// Esquema de validacion para agregar y modificar productos
const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    thumbnail: Joi.array(),
    code: Joi.string().required(),
    stock: Joi.number().integer().required(),
    status: Joi.boolean().required(),
  })
class ProductController {
  constructor() {
    this.productManager = new ProductManager();
    this.addProduct = this.addProduct.bind(this)
    this.getProductById = this.getProductById.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  async getProducts(req, res) {
    try {
      const productData = await this.productManager.getProducts();
      const limit = Number(req.query.limit);

      if (isNaN(limit)) {
        return res.json(productData);
      }

      if (limit > productData.length) {
        return res.status(400).send("Limit is greater than the number of products");
      }

      if (limit < 0) {
        return res.status(400).send("Limit is less than zero");
      }

      const productDataLimit = productData.slice(0, limit);
      res.json(productDataLimit);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  async getProductById(req, res) {
    try {
      const productId = Number(req.params.productId);
      const product = await this.productManager.getProductById(productId);

      if (!product) {
        return res.status(404).send("Product not found");
      }

      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  async addProduct(req, res) {
    try {
      const productData = req.body;

      const validationResult = schema.validate(productData)

      if (validationResult.error) {
        console.log('Validation Error:', validationResult.error.details);
      } else {
        const product = await this.productManager.addProduct(productData);
        res.json(product);
      }

      
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  async updateProduct(req, res) {
    try {
      const productId = Number(req.params.productId);
      const productData = req.body;

      const validationResult = schema.validate(productData)

      if (validationResult.error) {
        console.log('Validation Error:', validationResult.error.details);
      } else {
        const updatedProduct = await this.productManager.updateProduct(productId, productData);

        if (!updatedProduct) {
          return res.status(404).send("Producto no encontrado");
        }
  
        res.json(updatedProduct);
      }

    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  async deleteProduct(req, res) {
    try {
      const productId = Number(req.params.productId);
      const deletedProduct = await this.productManager.deleteProduct(productId);

      if (!deletedProduct) {
        return res.status(404).send("Producto no encontrado");
      }

      res.json(deletedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
}

export default ProductController;