import InterfaceRestaurantRepository from "../../repository/InterfaceRestaurantRepository";

class DeleteRestaurant {

    constructor(readonly repository: InterfaceRestaurantRepository) {}

    async execute(id: string){
        await this.validate(id);
        await this.repository.delete(id);
    }

    private async validate(id: string){
        const restaurant = await this.repository.findOne({ id });
        if (!restaurant){
            throw new Error('Restaurant does not exists');
        }
    }

}

export default DeleteRestaurant;