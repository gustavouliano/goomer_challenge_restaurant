import Restaurant from "../../../domain/entity/Restaurant";
import RedisCacheProvider from "../../../infra/provider/RedisCacheProvider";
import RestaurantRepository from "../../repository/RestaurantRepository";

class UpdateRestaurant {

    constructor(readonly restaurantRepository: RestaurantRepository) {}

    async execute({id, name}: Input): Promise<Restaurant> {
        id = Number(id);
        await this.validate(id, name);
        const restaurant = await this.restaurantRepository.update(id, name);
        const redisCache = new RedisCacheProvider();
        redisCache.invalidate('restaurants');
        return restaurant;
    }

    private async validate(id: number, name: string) {
        if (!name || typeof name != 'string'){
			throw new Error('Invalid name input');
		}
		if (name.length < 3) {
			throw new Error('Restaurant name too small');
		}
        const restaurant = await this.restaurantRepository.findOne(id);
        if (!restaurant){
            throw new Error('Restaurant does not exists');
        }
    }

}

type Input = {
    id: number,
    name: string
};

export default UpdateRestaurant;