import Restaurant from '../../../domain/entity/Restaurant';
import RedisCacheProvider from '../../../infra/provider/RedisCacheProvider';
import RestaurantRepository from '../../repository/RestaurantRepository';

class CreateRestaurant {

	constructor(readonly restaurantRepository: RestaurantRepository) {}

	async execute({ name }: Input): Promise<Restaurant> {
		this.validate({ name });
		const restaurant = await this.restaurantRepository.save(name);
		const redisCache = new RedisCacheProvider();
		redisCache.invalidate('restaurants');
		return restaurant;
	}

	private validate({ name }: Input){
		if (!name || typeof name != 'string'){
			throw new Error('Invalid name input');
		}
		if (name.length < 3) {
			throw new Error('Restaurant name too small');
		}
	}
}

type Input = {
	name: string;
};

export default CreateRestaurant;