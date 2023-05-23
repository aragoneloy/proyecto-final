import { Router } from "express";
import CartController from "../controllers/cartController.js";

const cartRouter = Router();
const cartController = new CartController();

cartRouter.post("/", cartController.newCart);
cartRouter.get("/:cartId", cartController.getCartById);
cartRouter.post("/:cartId/product/:productId", cartController.updateCart);


export default cartRouter;



