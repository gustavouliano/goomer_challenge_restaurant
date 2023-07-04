import { randomUUID } from "crypto";
import Product from "../../domain/entity/Product";
import RedisCacheRepository from "./RedisCacheRepository";
import InterfaceProductRepository from "../../application/repository/InterfaceProductRepository";

class RedisCacheProductRepository<T extends Product> extends RedisCacheRepository<T> implements InterfaceProductRepository {

    private readonly key = 'products';

    async create({ name, price, restaurantId }: dataSave): Promise<T> {
        const newProduct = new Product(randomUUID(), name, price, restaurantId);
        let products = await this.redisCache.recover<Product[]>(this.key);
        if (products){
            products.push(newProduct);
        }
        else{
            products = [newProduct];
        }
        await this.redisCache.save(this.key, products);
        return newProduct as T;
    }

    async findAll(): Promise<T[] | null> {
        const products = await this.redisCache.recover<Product[]>(this.key);
        if (products){
            return products as T[];
        }
        return null;
    }

}

type dataSave = {
    name: string;
    price: number;
    restaurantId: string;
}

export default RedisCacheProductRepository;