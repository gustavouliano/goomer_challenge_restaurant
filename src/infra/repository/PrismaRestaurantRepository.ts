import { PrismaClient } from '@prisma/client';
import RestaurantRepository from '../../application/repository/RestaurantRepository';
import Restaurant from '../../domain/entity/Restaurant';

class PrismaRestaurantRepository implements RestaurantRepository {
	constructor(private readonly prisma = new PrismaClient()) {}

	async save(name: string): Promise<Restaurant> {
		const restaurant = await this.prisma.restaurant.create({
			data: {
				name,
			},
		});
		return restaurant;
	}

	async find(id: number): Promise<Restaurant | null> {
		const restaurant: unknown = await this.prisma.$queryRaw`SELECT * from Restaurant WHERE id = ${id};`;
		if (!restaurant) {
			return null;
		}
		return restaurant as Restaurant;
	}
}

export default PrismaRestaurantRepository;
