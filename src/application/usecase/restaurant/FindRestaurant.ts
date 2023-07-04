import Restaurant from "../../../domain/entity/Restaurant";
import InterfaceRestaurantRepository from "../../repository/InterfaceRestaurantRepository";

class FindRestaurant {

    constructor(readonly repository: InterfaceRestaurantRepository){}

    async execute(id: string): Promise<Restaurant|null> {
        const restaurant = await this.repository.findOne({ id });
        return restaurant;
    }   
}

export default FindRestaurant;