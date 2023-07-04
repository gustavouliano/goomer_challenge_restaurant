class Restaurant {
	id: number | string;
	name: string;
	address?: string;
	image?: string;

	constructor(id: number|string, name: string, address?: string, image?: string) {
		this.id = id;
		this.name = name;
		this.address = address;
		this.image = image;
	}
}

export default Restaurant;