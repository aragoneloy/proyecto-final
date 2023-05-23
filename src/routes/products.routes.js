import { Router } from "express";
import ProductController from "../controllers/productController.js";

const productRouter = Router();
const productController = new ProductController();

productRouter.get("/", productController.getProducts);
productRouter.get("/:productId", productController.getProductById);
productRouter.post("/", productController.addProduct);
productRouter.put("/:productId", productController.updateProduct);
productRouter.delete("/:productId", productController.deleteProduct);

export default productRouter;
