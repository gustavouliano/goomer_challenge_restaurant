import Restaurant from "../../../domain/entity/Restaurant";
import InterfaceRestaurantRepository from "../../repository/InterfaceRestaurantRepository";

class ListRestaurant {

    constructor(readonly repository: InterfaceRestaurantRepository) {}

    async execute(): Promise<Restaurant[]> {
        const restaurants = await this.repository.findAll();
        return restaurants || [];
    }
}

export default ListRestaurant;