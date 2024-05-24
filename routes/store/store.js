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
		cart: req.session.cart ? req.session.cart : {},
		displayPopup: false,
	});
});

// add item to cart
router.post("/store/add/:id", (req, res) => {
	// Validate the id
	if (!req.params.id) {
		return res.status(400).json("Invalid item id");
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
	let total = 0;
	for (const key in req.session.cart) {
		total += req.session.cart[key];
	}
	return res.status(200).json(total);
});

// remove item from cart
router.post("/store/remove/:id", (req, res) => {
	// Validate the id
	if (!req.params.id) {
		return res.status(400).json("Invalid item id");
	}

	// Check if the item is in the cart
	if (Object.keys(req.session.cart).includes(req.params.id)) {
		// Decrement the quantity of the item
		req.session.cart[req.params.id]--;
		if (req.session.cart[req.params.id] <= 0) {
			delete req.session.cart[req.params.id];
		}
	}

	return res.status(200).json("Item removed from cart");
});

// remove all item from cart
router.get("/store/remove/all", (req, res) => {
	// empty the cart session
	req.session.cart = {};
	req.session.save((err) => {
		if (err) {
			console.error(err);
			return res.status(500).json("Failed to save session");
		}
		render(req, res, "store/storePage", {
			items: items,
			cart: req.session.cart ? req.session.cart : {},
			displayPopup: true,
		});
	});
});

router.get("/store/cart", (req, res) => {
	console.log(req.session.cart);
	render(req, res, "store/cartPage", {
		items: items,
		cart: req.session.cart,
	});
});

export default router;
