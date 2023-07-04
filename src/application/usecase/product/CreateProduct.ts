import Product from "../../../domain/entity/Product";
import AppError from "../../../infra/errors/AppError";
import InterfaceProductRepository from "../../repository/InterfaceProductRepository";
import InterfaceRestaurantRepository from "../../repository/InterfaceRestaurantRepository";

class CreateProduct {

    constructor(readonly repository: InterfaceProductRepository,
                readonly restaurantRepository: InterfaceRestaurantRepository) {}

    async execute({ name, price, restaurantId }: Input): Promise<Product> {
        await this.validate({ name, price, restaurantId });
        const product = await this.repository.create({ name, price, restaurantId });
        return product;
    }
    
    async validate({name, price, restaurantId}: Input){
        if (!(name && price && restaurantId)){
            throw new AppError('Invalid product input', 401);
        }
        const restaurant = await this.restaurantRepository.findOne({ id: restaurantId });
        if (!restaurant){
            throw new AppError(`Restaurant id ${restaurantId} does not exist`, 401);
        }
    }
}

type Input = {
    name: string;
    price: number;
    restaurantId: string;
}

export default CreateProduct;