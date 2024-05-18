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

// add store page view
router.get("/store", (req, res) => {
	render(req, res, "store/storePage", {
		items: items,
	});
});

// add item to cart
router.get("/store/add/:id", (req, res) => {
	// Find the item with the specified id
	const item = items.find((item) => item.id == req.params.id);

	// Create a cookie to store selected items
	const cartCookie = req.cookies.cart || "[]";
	let cartItems = JSON.parse(decodeURIComponent(cartCookie));

	// Check if the item is in the cart
	const checkedItemIndex = cartItems.findIndex(
		(item) => item.id == req.params.id
	);

	// If the item is not in the cart, add it with a quantity of 1
	if (checkedItemIndex === -1) {
		cartItems.push({ item: item, quantity: 1 });
	} else {
		// If the item is already in the cart, increment its quantity
		cartItems[checkedItemIndex].quantity += 1;
	}

	// update the cooke string
	const updatedCartString = JSON.stringify(cartItems);

	// set the cookie expire date
	res.cookie("cart", updatedCartString, {
		expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
		path: "/",
	});
});

// router.get("store/cart", (req, res) => {
// 	render(req, res, "store/cartPage", {
// 		items: items,
// 	});
// });

export default router;
