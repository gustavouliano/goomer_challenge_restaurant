import { Request, Response } from "express";
import Product from "../../domain/entity/Product";
import Restaurant from "../../domain/entity/Restaurant";
import RedisCacheProvider from "../../infra/provider/RedisCacheProvider";
import RedisCacheProductRepository from "../../infra/repository/RedisCacheProductRepository";
import RedisCacheRestaurantRepository from "../../infra/repository/RedisCacheRestaurantRepository";
import CreateProduct from "../usecase/product/CreateProduct";
import ListProduct from "../usecase/product/ListProduct";

class ProductController {

    public async create(req: Request, res: Response): Promise<Response> {
        const productRepository = new RedisCacheProductRepository<Product>(new RedisCacheProvider());
        const restaurantRepository = new RedisCacheRestaurantRepository<Restaurant>(new RedisCacheProvider());
        const createProduct = new CreateProduct(productRepository, restaurantRepository);
        const product = await createProduct.execute({
            name: req.body.name,
            price: req.body.price,
            restaurantId: req.body.restaurantId
        });
        return res.status(201).json(product);
    }

    public async listProducts(req: Request, res: Response): Promise<Response> {
        const productRepository = new RedisCacheProductRepository<Product>(new RedisCacheProvider());
        const listProduct = new ListProduct(productRepository);
        const products = await listProduct.execute();
        return res.status(200).json(products);
    }
}

export default ProductController;