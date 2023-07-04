class Product {
    id: string;
    name: string;
    price: number;
    restaurantId: string;

    constructor(id: string, name: string, price: number, restaurantId: string){
        this.id = id;
        this.name = name;
        this.price = price;
        this.restaurantId = restaurantId;
    }

}

export default Product;