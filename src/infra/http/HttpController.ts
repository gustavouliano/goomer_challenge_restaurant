import CreateRestaurant from '../../application/usecase/restaurant/CreateRestaurant';
import DeleteRestaurant from '../../application/usecase/restaurant/DeleteRestaurant';
import FindRestaurant from '../../application/usecase/restaurant/FindRestaurant';
import ListRestaurant from '../../application/usecase/restaurant/ListRestaurant';
import UpdateRestaurant from '../../application/usecase/restaurant/UpdateRestaurant';
import PrismaRestaurantRepository from '../repository/PrismaRestaurantRepository';
import HttpServer from './HttpServer';

class HttpController {
	
	constructor(readonly httpServer: HttpServer) {
		const restaurantRepository = new PrismaRestaurantRepository();

		httpServer.on('post', '/restaurant', async (params: any, body: any) => {
			const createRestaurant = new CreateRestaurant(restaurantRepository);
			return await createRestaurant.execute(body);
		});

		httpServer.on('get', '/restaurant', async () => {
			const listRestaurant = new ListRestaurant(restaurantRepository);
			const restaurants = await listRestaurant.execute();
			return restaurants;
		});
		
		httpServer.on('get', '/restaurant/:id', async (params: any, body: any) => {
			const findRestaurant = new FindRestaurant(restaurantRepository);
			const id = params.id;
			return await findRestaurant.execute(id);
		});

		httpServer.on('put', '/restaurant/:id', async (params: any, body: any) => {
			const updateRestaurant = new UpdateRestaurant(restaurantRepository);
			const data = {
				id: params.id,
				name: body.name
			};
			return await updateRestaurant.execute(data);
		});

		httpServer.on('delete', '/restaurant/:id', async (params: any, body: any) => {
			const deleteRestaurant = new DeleteRestaurant(restaurantRepository);
			return await deleteRestaurant.execute(params.id);
		});

		httpServer.error((err: Error) => {
			return {
				message: err.message
			}
		});
		httpServer.listen(Number(process.env.PORT));
	}
}

export default HttpController;
