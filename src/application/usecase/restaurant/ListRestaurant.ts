import Restaurant from "../../../domain/entity/Restaurant";
import RedisCacheProvider from "../../../infra/provider/RedisCacheProvider";
import RestaurantRepository from "../../repository/RestaurantRepository";


class ListRestaurant {

    constructor(readonly restaurantRepository: RestaurantRepository){}

    async execute(): Promise<Restaurant[]> {
        const redisCache = new RedisCacheProvider();
        let restaurants = await redisCache.recover<Restaurant[]>('restaurants');
        if (restaurants){
            return restaurants;
        }
        restaurants = await this.restaurantRepository.findAll();
        await redisCache.save('restaurants', restaurants);
        return restaurants;
    }
}

export default ListRestaurant;