import RestaurantRepository from "../../repository/RestaurantRepository";

class DeleteRestaurant {

    constructor(readonly restaurantRepository: RestaurantRepository) {}

    async execute(id: number){
        id = Number(id);
        // await this.validate(id);
        await this.restaurantRepository.delete(id);
        return `Restaurant ${id} deleted successfully`;
    }

    private async validate(id: number){
        // const restaurant = this.restaurantRepository.findOne(id);
    }

}

export default DeleteRestaurant;