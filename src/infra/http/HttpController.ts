import CreateRestaurant from '../../application/usecase/restaurant/CreateRestaurant';
import PrismaRestaurantRepository from '../repository/PrismaRestaurantRepository';
import HttpServer from './HttpServer';

class HttpController {
	constructor(readonly httpServer: HttpServer) {
		httpServer.on('post', '/restaurant', async (params: any, body: any) => {
			const restaurantRepository = new PrismaRestaurantRepository();
			const createRestaurant = new CreateRestaurant(restaurantRepository);
			return await createRestaurant.execute(body);
		});
		httpServer.error((err: Error) => {
			return {
				message: err.message
			}
		})
		httpServer.listen(Number(process.env.PORT));
	}
}

export default HttpController;
