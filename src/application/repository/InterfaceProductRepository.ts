import Product from "../../domain/entity/Product";

interface InterfaceProductRepository {
	create(data: dataCreate): Promise<Product>;
	findAll(): Promise<Product[] | null>;
}

type dataCreate = {
    name: string;
    price: number;
    restaurantId: string;
}
export default InterfaceProductRepository;