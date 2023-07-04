import { Router } from "express";
import ProductController from "../../application/controllers/ProductController";

const productController = new ProductController();
const router = Router();

router.post('/', productController.create);
router.get('/', productController.listProducts);

export default router;