import { Router } from "express";
import { render } from "../../lib/render.js";
// TODO: This should import from the database instead
let items = [
	{
		id: 1, // Should be a unique identifier, randomly generated. Take _id from the database
		imageName: "kessoku-tshirt.png",
		name: "Bocchi's Face T-Shirt",
		description: "A T-shirt with Bocchi's face on it.",
		price: 20.0,
		stock: 10,
	},
	{
		id: 2,
		imageName: "bocchi-sweater.png",
		name: "Kessoku Hoodie",
		description: "A hoodie with the Kessoku logo.",
		price: 30.0,
		stock: 5,
	},
];
//
const router = Router();

router.get("/store", (req, res) => {
	render(req, res, "store/storePage", {
		items: items,
	});
});

export default router;
