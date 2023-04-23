import Restaurant from '../../domain/entity/Restaurant';

interface RestaurantRepository {
	save(name: string): Promise<Restaurant>;
	find(id: number): Promise<Restaurant | null>;
}

export default RestaurantRepository;
