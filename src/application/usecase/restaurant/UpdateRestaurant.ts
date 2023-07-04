import Restaurant from "../../../domain/entity/Restaurant";
import InterfaceRestaurantRepository from "../../repository/InterfaceRestaurantRepository";

class UpdateRestaurant {

    constructor(readonly repository: InterfaceRestaurantRepository) {}

    async execute({id, name}: Input): Promise<Restaurant> {
        await this.validate(id, name);
        const restaurant = await this.repository.update(id, { name });
        return restaurant!;
    }
    
    private async validate(id: string, name: string) {
        if (!name || typeof name != 'string'){
			throw new Error('Invalid name input');
		}
		if (name.length < 3) {
			throw new Error('Restaurant name too small');
		}
        const restaurant = await this.repository.findOne({ id });
        if (!restaurant){
            throw new Error('Restaurant does not exists');
        }
    }

}

type Input = {
    id: string,
    name: string,
};

export default UpdateRestaurant;