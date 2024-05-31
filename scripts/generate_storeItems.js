import { startDatabase } from "../lib/db.js";
import { Item } from "../models/storeItems.js";

const Items = [
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

// Connect to the database
startDatabase();

// Drop the existing Items
Item.collection.drop().then(async () => {
	console.log("Items dropped.");
	// Generate the Items
	Item.create(Items).then(() => {
		console.log("Items creation finished.");
		process.exit();
	});
});
