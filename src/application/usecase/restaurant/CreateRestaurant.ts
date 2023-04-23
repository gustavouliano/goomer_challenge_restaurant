import Restaurant from '../../../domain/entity/Restaurant';
import RestaurantRepository from '../../repository/RestaurantRepository';

class CreateRestaurant {
	constructor(private readonly restaurantRepository: RestaurantRepository) {}

	async execute({ name }: Input): Promise<Restaurant> {
		this.validate({ name });
		const restaurant = this.restaurantRepository.save(name);
		return restaurant;
	}

	private validate({ name }: Input){
		if (!name || typeof name != 'string'){
			throw new Error('Invalid input');
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
