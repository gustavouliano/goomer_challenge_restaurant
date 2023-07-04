import Restaurant from '../../../domain/entity/Restaurant';
import AppError from '../../../infra/errors/AppError';
import InterfaceRestaurantRepository from '../../repository/InterfaceRestaurantRepository';

class CreateRestaurant {

	constructor(readonly repository: InterfaceRestaurantRepository) {}

	async execute({ name, address, image }: Input): Promise<Restaurant> {
		this.validate({ name });
		const restaurant = await this.repository.create({ name, address, image });
		return restaurant;
	}

	private validate({ name }: Input){
		if (!name || typeof name != 'string'){
			throw new AppError('Invalid name input', 401);
		}
		if (name.length < 3) {
			throw new AppError('Restaurant name too small', 401);
		}
	}
}

type Input = {
	name: string;
	address?: string;
	image?: string;
};

export default CreateRestaurant;