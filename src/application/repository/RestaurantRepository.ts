import Restaurant from '../../domain/entity/Restaurant';

interface RestaurantRepository {
	save(name: string): Promise<Restaurant>;
	update(id: number, name: string): Promise<Restaurant>;
	delete(id: number): Promise<void>;
	findOne(id: number): Promise<Restaurant | null>;
	findAll(): Promise<Restaurant[]>;
}

export default RestaurantRepository;
