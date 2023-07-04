import Restaurant from "../../domain/entity/Restaurant";

interface InterfaceRestaurantRepository {
	create(data: dataCreate): Promise<Restaurant>;
	update(id: string, data: dataUpdate): Promise<Restaurant|null>;
	delete(id: string): Promise<void>;
	findOne(data: dataFindOne): Promise<Restaurant | null>;
	findAll(): Promise<Restaurant[] | null>;
}

type dataCreate = {
	name: string;
	address?: string;
	image?: string;
};
type dataUpdate = {
	name?: string;
	address?: string;
};
type dataFindOne = {
	id: string;
};

export default InterfaceRestaurantRepository;