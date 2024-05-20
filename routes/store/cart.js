import { Router } from "express";
import { render } from "../../lib/render.js";
// TODO: This should import from the database instead
let items = [
	{
		id: 0, // Should be a unique identifier, randomly generated. Take _id from the database
		imageName: "bocchi-sweater.png",
		name: "Bocchi's Face T-Shirt",
		description: "A T-shirt with Bocchi's face on it.",
		price: 20.0,
		size: "S",
		quantity: "1",
		stock: 10,
	},
	{
		id: 1,
		imageName: "kessoku-tshirt.png ",
		name: "Kessoku Hoodie",
		description: "A hoodie with the Kessoku logo.",
		price: 30.0,
		size: "M",
		quantity: "1",
		stock: 5,
	},
	{
		id: 2, // Should be a unique identifier, randomly generated. Take _id from the database
		imageName: "bocchi-sweater.png",
		name: "Bocchi's Face T-Shirt",
		description: "A T-shirt with Bocchi's face on it.",
		price: 20.0,
		size: "L",
		quantity: "1",
		stock: 10,
	},
	{
		id: 3,
		imageName: "kessoku-tshirt.png ",
		name: "Kessoku Hoodie",
		description: "A hoodie with the Kessoku logo.",
		price: 30.0,
		size: "M",
		quantity: "1",
		stock: 5,
	},
	{
		id: 4, // Should be a unique identifier, randomly generated. Take _id from the database
		imageName: "bocchi-sweater.png",
		name: "Bocchi's Face T-Shirt",
		description: "A T-shirt with Bocchi's face on it.",
		price: 20.0,
		size: "M",
		quantity: "1",
		stock: 10,
	},
];
//
const router = Router();

router.get("/cart", (req, res) => {
	render(req, res, "store/cartPage", {
		items: items,
	});
});

export default router;
