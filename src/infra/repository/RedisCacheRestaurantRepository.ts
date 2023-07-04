import { randomUUID } from "crypto";
import Restaurant from "../../domain/entity/Restaurant";
import RedisCacheRepository from "./RedisCacheRepository";
import InterfaceRestaurantRepository from "../../application/repository/InterfaceRestaurantRepository";

class RedisCacheRestaurantRepository<T extends Restaurant> extends RedisCacheRepository<T> implements InterfaceRestaurantRepository {

    private readonly key = 'restaurants';

    async create(data: dataSave): Promise<T> {
        const newRestaurant = new Restaurant(randomUUID(), data.name, data.address, data.image);
        let restaurants = await this.redisCache.recover<Restaurant[]>(this.key);
        if (restaurants){
            restaurants.push(newRestaurant);
        }
        else{
            restaurants = [newRestaurant];
        }
        await this.redisCache.save(this.key, restaurants);
        return newRestaurant as T;
    }

    async update(id: string, data: dataUpdate): Promise<T | null > {
        const restaurant = await this.findOne({ id });
        if (!restaurant){
            return null;
        }
        restaurant.name = data.name ?? restaurant.name;
        restaurant.address = data.address ?? restaurant.address;
        let restaurants = await this.findAll();
        if (!restaurants){
            return null;
        }
        restaurants = restaurants.filter(restaurant => restaurant.id !== id);
        restaurants.push(restaurant);
        this.redisCache.save(this.key, restaurants);
        return restaurant;
    }

    async delete(id: string): Promise<void> {
        let restaurants = await this.findAll();
        if (!restaurants){
            return;
        }
        restaurants = restaurants.filter(restaurant => restaurant.id != id);
        await this.redisCache.save('restaurants', restaurants);
    }

    async findOne(data: dataFindOne): Promise<T | null> {
        const restaurants = await this.redisCache.recover<Restaurant[]>(this.key);
        if (!restaurants){
            return null;
        }
        const restaurant = restaurants.find(restaurant => restaurant.id == data.id);
        if (restaurant){
            return restaurant as T;
        }
        return null;
    }

    async findAll(): Promise<T[] | null> {
        const restaurants = await this.redisCache.recover<Restaurant[]>(this.key);
        if (restaurants){
            return restaurants as T[];
        }
        return null;
    }
}

type dataSave = {
    name: string;
    address?: string;
    image?: string;
}

type dataUpdate = {
    name?: string;
    address?: string;
}

type dataFindOne = {
    id: string;
}

export default RedisCacheRestaurantRepository;