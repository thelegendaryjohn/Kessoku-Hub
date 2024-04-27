import { Router } from "express";
import { render } from "../lib/render.js";
// TODO: This should import from the database instead
let items = [
	{
		id: 1, // Should be a unique identifier, randomly generated. Take _id from the database
		name: "Bocchi's Face T-Shirt",
		description: "A T-shirt with Bocchi's face on it.",
		price: 20.0,
		stock: 10,
	},
];
//
const router = Router();

router.get("/", (req, res) => {
	render(req, res, "store/storePage", {
		items: items,
	});
});

export default router;
