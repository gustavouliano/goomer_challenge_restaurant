import Restaurant from "../../../domain/entity/Restaurant";
import RestaurantRepository from "../../repository/RestaurantRepository";

class FindRestaurant {

    constructor(readonly restaurantRepository: RestaurantRepository){}

    async execute(id: number): Promise<Restaurant|null> {
        id = Number(id);
        const restaurant = await this.restaurantRepository.findOne(id);
        if (!restaurant){
            throw new Error('Restaurant does not exists.');
        }
        return restaurant;
    }
}

export default FindRestaurant;