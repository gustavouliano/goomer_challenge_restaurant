import { Request, Response } from "express";
import RedisCacheRepository from "../../infra/repository/RedisCacheRepository";
import Restaurant from "../../domain/entity/Restaurant";
import CreateRestaurant from "../usecase/restaurant/CreateRestaurant";
import FindRestaurant from "../usecase/restaurant/FindRestaurant";
import AppError from "../../infra/errors/AppError";
import ListRestaurant from "../usecase/restaurant/ListRestaurant";
import UpdateRestaurant from "../usecase/restaurant/UpdateRestaurant";
import DeleteRestaurant from "../usecase/restaurant/DeleteRestaurant";
import RedisCacheProvider from "../../infra/provider/RedisCacheProvider";
import RedisCacheRestaurantRepository from "../../infra/repository/RedisCacheRestaurantRepository";

class RestaurantController {
    
    public async create(req: Request, res: Response): Promise<Response> {
        const repository = new RedisCacheRestaurantRepository<Restaurant>(new RedisCacheProvider());
        const createRestaraunt = new CreateRestaurant(repository);
        const restaurant = await createRestaraunt.execute({
            name: req.body.name,
            address: req.body.address,
            image: req.file?.filename
        });
        return res.status(201).json(restaurant);
    }

    public async findRestaurant(req: Request, res: Response): Promise<Response> {
        const repository = new RedisCacheRestaurantRepository<Restaurant>(new RedisCacheProvider());
        const findRestaurant = new FindRestaurant(repository);
        const restaurant = await findRestaurant.execute(req.params.id);
        if (!restaurant){
            throw new AppError('Restaurant does not exists', 401);
        }
        return res.status(200).json(restaurant);
    }

    public async listRestaurant(req: Request, res: Response): Promise<Response> {
        const repository = new RedisCacheRestaurantRepository<Restaurant>(new RedisCacheProvider());
        const listRestaurant = new ListRestaurant(repository);
        const restaurants = await listRestaurant.execute();
        return res.status(200).json(restaurants);
    }

    public async updateRestaurant(req: Request, res: Response): Promise<Response> {
        const repository = new RedisCacheRestaurantRepository<Restaurant>(new RedisCacheProvider());
        const updateRestaurant = new UpdateRestaurant(repository);
        const restaurant = await updateRestaurant.execute({
            id: req.params.id,
            name: req.body.name
        })
        return res.status(200).json(restaurant);
    }

    public async deleteRestaurant(req: Request, res: Response): Promise<Response> {
        const repository = new RedisCacheRestaurantRepository<Restaurant>(new RedisCacheProvider());
        const deleteRestaurant = new DeleteRestaurant(repository);
        await deleteRestaurant.execute(req.params.id);
        return res.status(204).json();
    }
    
}

export default RestaurantController;