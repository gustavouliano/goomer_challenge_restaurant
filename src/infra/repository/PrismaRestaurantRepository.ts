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

	async update(id: number, name: string): Promise<Restaurant> {
		const updatedRestaurant = await this.prisma.restaurant.update({
			where: {
				id
			},
			data: {
				name
			}
		})
		return updatedRestaurant;
	};
	
	async delete(id: number): Promise<void> {
		await this.prisma.restaurant.delete({
			where: {
				id
			},
		});
	}

	async findOne(id: number): Promise<Restaurant | null> {
		const restaurant = await this.prisma.restaurant.findUnique({
			where: { id: id }
		});
		return restaurant as Restaurant;
	}

	async findAll(): Promise<Restaurant[]> {
		const restaurants = await this.prisma.restaurant.findMany({
			orderBy: {
				id: 'asc'
			}
		});
		return restaurants;
	}
}

export default PrismaRestaurantRepository;
