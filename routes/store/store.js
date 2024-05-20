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
	},
	{
		id: 1,
		imageName: "kessoku-tshirt.png ",
		name: "Kessoku Hoodie",
		description: "A hoodie with the Kessoku logo.",
		price: 30.0,
	},
	{
		id: 2, // Should be a unique identifier, randomly generated. Take _id from the database
		imageName: "bocchi-sweater.png",
		name: "Bocchi's Face T-Shirt",
		description: "A T-shirt with Bocchi's face on it.",
		price: 20.0,
	},
	{
		id: 3,
		imageName: "kessoku-tshirt.png ",
		name: "Kessoku Hoodie",
		description: "A hoodie with the Kessoku logo.",
		price: 30.0,
	},
	{
		id: 4, // Should be a unique identifier, randomly generated. Take _id from the database
		imageName: "bocchi-sweater.png",
		name: "Bocchi's Face T-Shirt",
		description: "A T-shirt with Bocchi's face on it.",
		price: 20.0,
	},
	{
		id: 5,
		imageName: "kessoku-tshirt.png ",
		name: "Kessoku Hoodie",
		description: "A hoodie with the Kessoku logo.",
		price: 30.0,
	},
	{
		id: 6, // Should be a unique identifier, randomly generated. Take _id from the database
		imageName: "bocchi-sweater.png",
		name: "Bocchi's Face T-Shirt",
		description: "A T-shirt with Bocchi's face on it.",
		price: 20.0,
	},
	{
		id: 7,
		imageName: "kessoku-tshirt.png ",
		name: "Kessoku Hoodie",
		description: "A hoodie with the Kessoku logo.",
		price: 30.0,
	},
];
//
const router = Router();

router.get("/store", (req, res) => {
	render(req, res, "store/storePage", {
		items: items,
	});
});

// add item to cart
router.get("/store/add/:id", (req, res) => {
	// Validate the id
	if (!req.params.id) {
		return res.status(400).send("Invalid item id");
	}

	// Create a cart if it doesn't exist
	if (!req.session.cart) {
		req.session.cart = {};
	}

	// Check if the item is in the cart
	if (Object.keys(req.session.cart).includes(req.params.id)) {
		// Increment the quantity of the item
		req.session.cart[req.params.id]++;
	} else {
		// Add the item to the cart
		req.session.cart[req.params.id] = 1;
	}

	res.redirect("/store");
});

// remove item from cart
router.get("/store/remove/:id", (req, res) => {
	// Validate the id
	if (!req.params.id) {
		return res.status(400).send("Invalid item id");
	}

	// Check if the item is in the cart
	if (req.session.cart.includes(req.params.id)) {
		// Decrement the quantity of the item
		req.session.cart[req.params.id]--;
		if (req.session.cart[req.params.id] <= 0) {
			delete req.session.cart[req.params.id];
		}
	}

	res.redirect("/store/cart");
});

router.get("/store/cart", (req, res) => {
	render(req, res, "store/cartPage", {
		items: items,
		cart: req.session.cart,
	});
});

export default router;
