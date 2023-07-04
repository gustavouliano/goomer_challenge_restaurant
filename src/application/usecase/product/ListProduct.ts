import Product from "../../../domain/entity/Product";
import InterfaceProductRepository from "../../repository/InterfaceProductRepository";

class ListProduct {

    constructor(readonly repository: InterfaceProductRepository) {}

    async execute(): Promise<Product[]> {
        const products = await this.repository.findAll();
        return products || [];
    }
}

export default ListProduct;